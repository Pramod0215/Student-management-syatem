from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import *
from rest_framework import viewsets, status
from .serializer import *
from rest_framework.generics import ListAPIView, CreateAPIView,UpdateAPIView,DestroyAPIView


class StudentList(ListAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentReadSerializers


class StudentCreateList(CreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializers

class StudentUpdateList(UpdateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializers
    lookup_field ='pk'


class StudentDeleteList(DestroyAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializers
    lookup_field ='pk'
