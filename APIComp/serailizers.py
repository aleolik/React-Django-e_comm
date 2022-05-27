
from dataclasses import field
from re import T
from weakref import ref
from xmlrpc.client import ResponseError
from rest_framework import serializers
from .models import Post,Category,SizeCategory,NewUser
from rest_framework_simplejwt.tokens import RefreshToken,TokenError
class PostSerializer(serializers.ModelSerializer):
     photo = serializers.ImageField(max_length=None, use_url=True, allow_null=False, required=True)
     class Meta:
        model = Post
        fields = ['name','photo','body','price','item_count','id','category','size_category']

class CategorySerializer(serializers.ModelSerializer):
   class Meta:
      model = Category
      fields = '__all__'
class SizeCategorySeializers(serializers.ModelSerializer):
   class Meta:
      model = SizeCategory
      fields = '__all__'

class RegistrtationSerializer(serializers.ModelSerializer):
   class Meta:
      model = NewUser
      fields = ['email','user_name','password',]
      extra_kwargs = {'password' : {'write_only':True}}
   def create(self,validated_data):
       password = validated_data.pop('password',None)
       instance = self.Meta.model(**validated_data)
       if password is not None:
          instance.set_password(password)
       instance.activation_link = f'Activation_link/{instance.user_name}'
       instance.save()
       return instance
class Postsbycategories(serializers.Serializer):
   class Meta:
      model = Post
      fields = ['category']

class ChangeUserSerializer(serializers.ModelSerializer):
   class Meta:
      model = NewUser
      fields = ['activation_link','email','user_name','password']

class GetUsersSerializer(serializers.ModelSerializer):
   class Meta:
      model = NewUser
      fields = ['id','user_name','email','is_active','is_superuser','is_staff']



class LogoutSerializer(serializers.Serializer):
   refresh = serializers.CharField()


   def validate(self, attrs):
       self.token = attrs['refresh_token']

       return attrs
   def save(self, **kwargs):
      try:
          RefreshToken(self.token).blacklist()
      except:
          self.fail('bad token')
