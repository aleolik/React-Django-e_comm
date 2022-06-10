
from django.conf import settings
from rest_framework_simplejwt.views import (
    TokenRefreshView)
from django.contrib import admin
from django.urls import path,include


# Have custom Login,that gives tokens.


urlpatterns = [
    path('admin/', admin.site.urls),
    path('',include('APIComp.urls')),
    path('',include('PayPal.urls')),
    path('token/refresh/',TokenRefreshView.as_view()) # new access and ref tokens
]


