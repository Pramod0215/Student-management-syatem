from rest_framework import serializers
from .models import Student


class StudentReadSerializers(serializers.ModelSerializer):
    skills_list=serializers.ListField(source='skills_comm_split')

    class Meta:
        model = Student
        fields = ('id','firstName','lastName','skills', 'skills_list')

class StudentSerializers(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ('firstName','lastName','skills')