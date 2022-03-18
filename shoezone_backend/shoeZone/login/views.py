import json
from json import JSONEncoder
from django.shortcuts import render
from rest_framework import viewsets

from .serializers import UserSerializer
from .models import User
from django.http import HttpResponse

from django.forms.models import model_to_dict


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('firstName')
    serializer_class = UserSerializer

def validate(request):
    if request.method == 'POST':
        body = json.loads(request.body)
        username= body['user']
        password = body['pass']
        try:
            user = User.objects.get(email=username)
        except:
            return HttpResponse(json.dumps({"isValid":False, "err":"User not Found"}), content_type="application/json")
        if(user.password==password):
            return HttpResponse(json.dumps({"isValid":True,"user":serialize(user)}), content_type="application/json")
    return HttpResponse(json.dumps({"isValid":False, "err":"Incorrect Request"}), content_type="application/json")



def serialize(user):
    return {
        "id":user.id,
        "name":user.firstName,
        "address":user.address
    }