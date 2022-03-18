from django.db import models
from login.models import User
from product.models import Product

class Order(models.Model):
    price = models.CharField("price", max_length=10, blank = True, null = True)
    image = models.CharField("Image", max_length=255, blank = True, null = True)
    status = models.CharField(max_length=20, blank = True, null = True)
    address = models.TextField(blank=True, null=True)
    createdAt = models.DateTimeField("Created At", auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    products = models.ManyToManyField(Product, through='OrderedProduct')

    def __str__(self):
        return self.price

        
class OrderedProduct(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    quantity = models.IntegerField()