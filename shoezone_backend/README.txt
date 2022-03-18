login to mysql first using mysql workbench

create db
- create database mydb;

created env 
- python3 -m venv .env

activate env
- C:\Users\HP\Desktop\ecommerce\shoeZone\shoezone_backend>cd .env

- C:\Users\HP\Desktop\ecommerce\shoeZone\shoezone_backend\.env>cd Scripts

- C:\Users\HP\Desktop\ecommerce\shoeZone\shoezone_backend\.env\Scripts>activate.bat

install django and mysl client(Or pip install -r requirements.txt)
- pip install django
- pip install mysqlclient

create new project
- django-admin startproject djangoCrudExample

add below setting in settings.py
-
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql', 
        'NAME': 'mydb',
        'USER': 'root',
        'PASSWORD': '<YOUR_DB_PASSWORD>',
        'HOST': 'localhost',   
        'PORT': '3306',
    }    
}	



migrate some important tables needed by django in mysql
- cd shoeZone
- python manage.py migrate



create superuser(this is the admin username passord. We can see admin UI on localhost:8000/admin)
- python manage.py createsuperuser
	(uname=root and password=password)

Create a app(app is like a section in django)
- python manage.py startapp crudapp

add in INSTALLED_APPS in settings.py

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'widget_tweaks',
    'crudapp'
]


class Contact(models.Model):
    firstName = models.CharField("First name", max_length=255, blank = True, null = True)
    lastName = models.CharField("Last name", max_length=255, blank = True, null = True)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank = True, null = True)
    address = models.TextField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    createdAt = models.DateTimeField("Created At", auto_now_add=True)

    def __str__(self):
        return self.firstName






Create table in db using above model
- python manage.py makemigrations
- python manage.py migrate





Install djangorestframework (also added in requirement.txt)
- pip install djangorestframework
- pip install -r requirements.txt


Add rest_framework in INSTALLED_APP in settings.py
- INSTALLED_APPS = [
    # All your installed apps stay the same
    ...
    'rest_framework',
   ]



added serializer in login app. Seriallizer will convert user into JSON
-
# serializers.py
from rest_framework import serializers

from .models import Hero

class HeroSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Hero
        fields = ('name', 'alias')





add viewset (i.e.e it will fetch data from DB and pass it to our seriallizer )
--
# views.py
from rest_framework import viewsets

from .serializers import HeroSerializer
from .models import Hero


class HeroViewSet(viewsets.ModelViewSet):
    queryset = Hero.objects.all().order_by('name')
    serializer_class = HeroSerializer



add urls in url.py
--
# mysite/urls.py

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('myapi.urls')),
 ]


# myapi/urls.py

from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'heroes', views.HeroViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]



























https://www.techiediaries.com/django/django-3-tutorial-and-crud-example-with-mysql-and-bootstrap/
refer above