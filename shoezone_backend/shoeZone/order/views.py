import json
from django.http import HttpResponse
from django.shortcuts import render

from rest_framework import viewsets

from login.models import User
from product.models import Product

from .serializers import OrderSerializer
from .models import Order, OrderedProduct


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


def create(request):
    if request.method == 'POST':
        body = json.loads(request.body)
        print(body)
        user = User.objects.get(pk=body.pop('user'))
        orderedProducts = body.pop('products')
        order = Order(**body, user=user)
        order.save()

        for orderedProduct in orderedProducts:
            print(orderedProduct)
            product = Product.objects.get(pk=orderedProduct['productId'])
            OrderedProduct.objects.create(
                order=order, product=product, quantity=orderedProduct['quantity'])
        return HttpResponse(json.dumps({"msg": "Ordered Placed"}), content_type="application/json")


def cancel(request, id):
    if request.method == 'GET':
        order = Order.objects.get(pk=id)
        order.status = "CANCELLED"
        order.save()
        return HttpResponse(json.dumps({"msg": "Ordered Cancelled"}), content_type="application/json")
