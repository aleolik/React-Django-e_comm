from django.conf import settings
from django.conf.urls.static import static
from django.urls import include, path

from .views import *
urlpatterns = [
    #Create new Paypal Order
    path('create_new_order/',MakeOrder.as_view(),name='make-order')
]   

