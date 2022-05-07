from ast import pattern
from calendar import isleap
from curses.ascii import US
from re import search
from django import forms
from django.contrib import admin
from  .models import Post,Category,SizeCategory




@admin.register(Category)
class Categories(admin.ModelAdmin):
    list_display = ['pk','title']
# Register your models here.
@admin.register(Post)
class Posts(admin.ModelAdmin):
    list_display = ['pk','name','body',"slug",'photo']
    search_fields = ['body','name','slug']
    prepopulated_fields = {"slug":("name",)}



@admin.register(SizeCategory)
class SizeCategories(admin.ModelAdmin):
    list_display = ['pk','size']


# custom user model

from django.contrib import admin
from .models import NewUser
from django.contrib.auth.admin import UserAdmin
from django.forms import Textarea,CharField,TextInput
from django import forms
from django.db import models


class UserAdminConfig(UserAdmin):
    model = NewUser
    search_fields = ('email','user_name')
    list_filter = ('email','user_name','is_active','is_staff')
    ordering = ('-start_date',)
    list_display = ('id','email','user_name','is_active','is_staff','start_date','is_activated_acc','is_superuser','activation_link')

    fieldsets = (
        (None,{'fields': ('email','user_name')}),
        ('Permissions',{'fields' :('is_staff','is_active','is_activated_acc')}),
        ('User characteristics',{'fields' :('balance','num_goods')}),
    )
admin.site.register(NewUser,UserAdminConfig)