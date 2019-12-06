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

class StudentDeleteList(DestroyAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializers

    def delete(self, request, id):
        details = self.get_object(id)
        print(details)
        details.delete()
#         return Response(status=status.HTTP_200_OK)
    # class StudentUpdateList(UpdateAPIView):
#     queryset = Student.objects.all()
#     serializer_class = StudentSerializers

# @ api_view(['DELETE'])
# def api_student_details_delete(request,id):
#     try:
#         student = Student.objects.get(id=id)
#     except Student.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)
#     if request.method == 'DELETE':
#         serializer = StudentSerializers(student, data=request.data)
#         data = {}
#         if serializer.is_valid():
#             student.delete()
#             data['success'] = 'delete successful'
#             return Response(status=status.HTTP_200_OK)
#         else:
#             data['failure'] = 'delete failed!'
#             return Response(status.HTTP_400_BAD_REQUEST)
#     return Response(status.HTTP_405_METHOD_NOT_ALLOWED)

