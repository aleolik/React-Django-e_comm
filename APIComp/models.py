





from datetime import datetime
from django.db import models
from django.utils import timezone
from django.conf import settings

from django.contrib.auth.models import AbstractBaseUser,BaseUserManager,PermissionsMixin

from django.db.models.signals import post_save
import pytz
User = settings.AUTH_USER_MODEL
now = timezone.now()

class SizeCategory(models.Model):
    '''Модель,отвечающая за размер машины'''
    size = models.CharField(max_length=250)

class Category(models.Model):
    '''Модель,отвечающая за принадлежность машины к определённой категорий(производитель,год,вид и т.д)'''
    title = models.CharField(max_length=250)

    
class Post(models.Model):
    '''Модель,отвечающая за характеристики машины'''
    name =  models.CharField(max_length=400,unique=True
    ) #name of the post
    photo = models.ImageField(upload_to="core/core/SITE-REACT/site-app/photos/%Y/%m/%d")
    body = models.TextField()
    price = models.PositiveIntegerField(default=0)
    user = models.ForeignKey(User,verbose_name='кто создал пост',on_delete=models.PROTECT)
    item_count = models.PositiveSmallIntegerField(default=0)
    slug = models.SlugField(null=True)
    time_updated = models.DateTimeField(auto_now=True,null=True)
    time_created = models.DateTimeField(auto_now_add=True,null=True)
    def __str__(self):
        return self.body[:50]
    class Meta:
        ordering = ['-time_created']
    category = models.ForeignKey(Category,on_delete=models.PROTECT,null=True)
    size_category = models.ForeignKey(SizeCategory,on_delete=models.PROTECT,null=True)




# Users 

class CustomAccountManager(BaseUserManager):

    def create_superuser(self,email,user_name,password,**other_fields):
        if not email or not password or not user_name:
            raise ValueError('Incorrect.Please,try again!')
        other_fields.setdefault('is_staff',True)
        other_fields.setdefault('is_superuser',True)
        other_fields.setdefault('is_active',True)
        other_fields.setdefault('is_activated_acc',True)
        return self.create_user(email,user_name,password,**other_fields)
    def create_user(self,email,user_name,password,**other_fields):
        if not email or not password or not user_name:
            raise ValueError('Incorrect.Please,try again!')
        email = self.normalize_email(email)
        user = self.model(email=email,user_name=user_name,**other_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
class NewUser(AbstractBaseUser,PermissionsMixin):
    '''Модель,отвечающая за создание кастомного юзера'''
    email = models.EmailField('email',unique=True)
    user_name = models.CharField(max_length=150,unique=True)
    start_date = models.DateTimeField(default=timezone.now)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_activated_acc =models.BooleanField(default=False) # верификация по почте
    balance = models.PositiveBigIntegerField(default=0) # баланс юзера
    num_goods = models.PositiveIntegerField(default=0) # кол-во вещей в корзине
    objects = CustomAccountManager()
    
    #Add image field later 


    USERNAME_FIELD  = 'user_name' # password and this by default

    REQUIRED_FIELDS = ['email']

    def __str__(self):
        return self.user_name


