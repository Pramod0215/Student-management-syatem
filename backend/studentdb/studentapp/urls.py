from django.urls import path,include

from .views import StudentList, StudentCreateList,StudentUpdateList, StudentDeleteList

from django.urls import path, include

urlpatterns = [
    path('list/',StudentList.as_view(),name ='student'),
    path('list/create/',StudentCreateList.as_view(),name ='student_create'),
    path('list/update/<int:pk>/',StudentUpdateList.as_view(),name ='student_update'),
    path('list/delete/<int:pk>/',StudentDeleteList.as_view(),name ='student_delete'),
]

