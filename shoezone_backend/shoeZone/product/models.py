from django.db import models

class Product(models.Model):
    name = models.CharField("Name", max_length=255, blank = False, null = False)
    image = models.CharField("Image URL", max_length=255, blank = True, null = True)
    price = models.CharField(max_length=20, blank = False, null = False)
    createdAt = models.DateTimeField("Created At", auto_now_add=True)

    def __str__(self):
        return self.firstName
