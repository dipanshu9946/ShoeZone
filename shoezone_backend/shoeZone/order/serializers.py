# serializers.py
from rest_framework import serializers

from login.serializers import UserSerializer
from product.serializers import ProductSerializer
from login.models import User
from product.models import Product


from .models import Order, OrderedProduct


class OrderedProductSerializer(serializers.HyperlinkedModelSerializer):

    product = ProductSerializer(many=False, required=True)
    class Meta:
        model = OrderedProduct
        fields = ('product', 'quantity' )


class OrderSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    user = UserSerializer(many=False, required=True)
    # products = ProductSerializer(required=True, many=True)
    products = OrderedProductSerializer(source='orderedproduct_set', many=True)

    class Meta:
        model = Order
        fields = ('id','price', 'image','status','address','user','products')