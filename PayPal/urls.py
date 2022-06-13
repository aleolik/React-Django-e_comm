from django.conf import settings
from django.conf.urls.static import static
from django.urls import include, path

from .views import *
urlpatterns = [
    #Create new Paypal Order
    path('create_new_order/',MakeOrder.as_view(),name='make-order'),
    path('get-orders-in-processing/',GetOrderInProgress.as_view(),name='get-orders'),
    path('get-posts-by-id/',GetPostsById.as_view(),name='get-posts-by-id')
]   

