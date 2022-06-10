
from django.contrib import admin

from .models import Order

@admin.register(Order)
class Categories(admin.ModelAdmin):
    list_display = ['id','user','price','status']