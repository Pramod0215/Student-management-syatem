

from django.db import models

# Create your models here.

class Student(models.Model):
    firstName = models.CharField(max_length=200, null=False)
    lastName = models.CharField(max_length=200, null=False)
    skills = models.CharField(max_length=200,null=False)

    def __str__(self):
        return self.firstName

    def skills_comm_split(self):
        return list(str(self.skills).split(','))


