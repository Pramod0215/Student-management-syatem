from django.contrib import admin

# Register your models here.
from .models import Student

class StudentAdmin(admin.ModelAdmin):
    list_display = ('firstName','lastName','skills',)
admin.site.register(Student,StudentAdmin)
