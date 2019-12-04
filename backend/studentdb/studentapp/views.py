from django.shortcuts import render
from .models import *
from rest_framework import viewsets
from .serializer import *
from rest_framework.generics import ListAPIView, CreateAPIView,UpdateAPIView


class StudentList(ListAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentReadSerializers


class StudentCreateList(CreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializers

# class StudentUpdateList(UpdateAPIView):
#     queryset = Student.objects.all()
#     serializer_class = StudentSerializers

