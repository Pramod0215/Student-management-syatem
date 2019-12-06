from django.urls import path,include

from .views import StudentList, StudentCreateList, StudentDeleteList

from django.urls import path, include

urlpatterns = [
    path('list/',StudentList.as_view(),name ='student'),
    path('list/create/',StudentCreateList.as_view(),name ='student_create'),
    # path('list/update/',StudentUpdateList.as_view(),name ='student_update'),
    path('list/delete/<int:id>/',StudentDeleteList.as_view(),name ='student_delete'),
]

