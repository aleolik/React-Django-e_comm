


from django.http import JsonResponse
from requests import request
from rest_framework import authentication
from urllib import response
from rest_framework_simplejwt.tokens import RefreshToken,AccessToken
from django.middleware import csrf
from django.contrib.auth import authenticate
from rest_framework import generics
from urllib3 import Retry
from .models import NewUser, Post,Category,SizeCategory, User
from .serailizers import PostSerializer,CategorySerializer,SizeCategorySeializers,Postsbycategories,GetUsersSerializer,LogoutSerializer,ChangeUserSerializer
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.views import APIView
from .serailizers import RegistrtationSerializer
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from rest_framework.generics import ListAPIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.mail import send_mail
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework as filters

from django.db.models import Q

from rest_framework.pagination import PageNumberPagination

#Paginators

class PostsPagination(PageNumberPagination):
    page_size = 25
    page_size_query_param = 'page_size'
    max_page_size = 25
#PRODUCT OPERATIONS
class ListOfPosts(generics.ListCreateAPIView):
    '''Создание нового поста или получение всех существующих постов'''
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    pagination_class = PostsPagination
    def post(self,request):
        name = request.data['name']
        if name:
            try:
                post = Post.objects.filter(name=name).values()
                return Response(post)
            except:
                return Response('Post not Found',status=status.HTTP_400_BAD_REQUEST)
        return Response('Empty data',status=status.HTTP_400_BAD_REQUEST)

class PutDeleteGetPosts(generics.RetrieveUpdateDestroyAPIView):
    '''GET PUT and Delete http-методы к посту'''
    queryset = Post.objects.all()
    serializer_class = PostSerializer


# token data by access(works)
def get_data_from_access(token):
    '''Принимает access_token и выдаёт по нему дату пользователя,которму принадлежит данный токен,если токен активен'''
    try:
        token = AccessToken(token)
        user_id = token['user_id']
        user = NewUser.objects.filter(id=user_id).first()
        if user:
            data = {}
            user_name = user.user_name
            email = user.email

            #user permissions
            # is_staff = user.is_staff
            # is_admin = user.is_admin
            data = {'email':email,'user_name':user_name}
            return Response(data,status=status.HTTP_200_OK)
        else:
            return Response('Error :  Token is not valid or expired!',status=status.HTTP_400_BAD_REQUEST)


    except:
        return Response('Error :  Token is not valid or expired!',status=status.HTTP_400_BAD_REQUEST)



class GetTokenData(APIView):
    '''Класс который использует функцию get_data_from_access'''
    def post(self,request):
        token = request.data['access_token']
        data = get_data_from_access(token)
        return data


# MACHINE CATEGORIES
class GetCreateCategory(generics.ListCreateAPIView):
    '''Создаёт новую или получает все категории,отвечающие за принадлежность товара'''
    queryset = Category.objects.order_by("-popularity")[:10]
    serializer_class = CategorySerializer
class DeleteUpdateCategory(generics.RetrieveUpdateDestroyAPIView):
    '''Удаляет или изменяет существующие категории,отвечающие за принадлженость поста'''
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


# SIZE CATEGORIES 
class GetSizeCategory(generics.ListCreateAPIView):
    '''Получает все варианты размеров поста'''
    queryset = SizeCategory.objects.all()
    serializer_class = SizeCategorySeializers
class UpdateDeleteSizeCategory(generics.RetrieveUpdateDestroyAPIView):
    '''Изменяет или удаляет категории,отвечающие за размер айтема'''
    queryset = SizeCategory.objects.all()
    serializer_class = SizeCategorySeializers



def get_tokens_for_user(user):
    '''Получает токены для пользователя(с доки)'''
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

def Activate_user(user_name):
    '''Функция,которая активирует нового,созданного юзера'''
    print(user_name)

class CreateCustomUser(APIView):
    '''Создаёт Аккаунт'''
    permission_classes = [AllowAny,]
    def post(self,request):
        reg_serializer = RegistrtationSerializer(data=request.data)


        if reg_serializer.is_valid():

            user = NewUser.objects.filter(email=request.data['email']).first() # returns None if doese'nt found
            if user is None:
                user_name = request.data['user_name']

                email = request.data['email']

                reg_serializer.activation_link = f'Activation_link/{user_name}'
                reg_serializer.save()  # создаёт акк


                '''Временно отключил рассылку'''
                html_message = f'<div><a href="{"http://localhost:3000/"+reg_serializer.activation_link}">Confirm Your regestration by following the link below...</a></div>'
                # send_mail( # отправляет html_message,для верификций почты
                # subject=f'Activate your account,{user_name}',
                # message=None,
                # from_email=settings.EMAIL_HOST,
                # recipient_list=[str(email)],
                # fail_silently=False,  
                # auth_user=settings.EMAIL_HOST_USER,
                # auth_password=settings.EMAIL_HOST_PASSWORD,
                # html_message=html_message,
                # )
                return Response('Account was cretated Succefully',status=status.HTTP_201_CREATED) # возращает Response
        else:
            user_email = NewUser.objects.filter(email=request.data['email']).first() # doese'nt work since is_valid check that emaill is unique
            user_username = NewUser.objects.filter(user_name=request.data['user_name']).first() # doese'nt work since is_valid check that emaill is unique
            if user_email is not None:
                return Response('Account with this email adress aldready exists',status=status.HTTP_400_BAD_REQUEST)
            if user_username:
                return Response('Username is locked already',status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response('Please fill all the fields!',status=status.HTTP_400_BAD_REQUEST)


class ChangeUserData(APIView):
    serilizer_class = ChangeUserSerializer

    def post(self,request):
        pass

class Login(APIView):
    '''Вход'''
    permission_classes = [AllowAny,]
    def post(self,request):
        user_name = request.data['user_name']
        password = request.data['password']
        user = NewUser.objects.filter(user_name=user_name).first()
        if user is None:
            return Response('Login or passowrd are uncorrect!',status=status.HTTP_400_BAD_REQUEST)
        elif not user.check_password(password):
            return Response('Login or passowrd are uncorrect!',status=status.HTTP_400_BAD_REQUEST)
        elif user.is_activated_acc:
            data = get_tokens_for_user(user)  
            response = Response() 
            response.set_cookie(
                key = settings.SIMPLE_JWT['AUTH_COOKIE'], 
                value = data["access"],
                expires = settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
                secure = settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                httponly = settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
                samesite = settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE'],
            )
            csrf.get_token(request)
            response.data = data
            response.data['is_staff'] = user.is_staff
            response.data['is_superuser'] = user.is_superuser
            # response.data['products'] = user.products.all().values()
            
            return response
        else:
            return Response('Error : This account is not activated',status=status.HTTP_400_BAD_REQUEST)


class Logout(APIView):
    '''Выход'''
    permission_classes = [AllowAny,]

    serializer_class = LogoutSerializer

    def post(self,request):
        try:
            refresh_token = request.data['refresh_token']
            if refresh_token != None:
                refresh_token = RefreshToken(refresh_token)
                refresh_token.blacklist()
                return Response({'Succes' : 'token was blacklisted'},status=status.HTTP_200_OK)
            return Response({'Error' : "Token is wrong or blacklisted already"},status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(str(e))


class Get_posts_by_category(APIView):
    def post(self,request):
        category = request.data['category']
        if category:
            category_posts = Post.objects.filter(category_id=category)
            if category_posts:
                posts = PostSerializer(category_posts,many=True,context={'request':request}).data
                return Response(posts,status=status.HTTP_200_OK)
            return Response('No posts to category',status=status.HTTP_204_NO_CONTENT)
        return Response('Category is not found',status=status.HTTP_204_NO_CONTENT)
    

class GetUsers(ListAPIView):
    '''Получает всех юзеров,записанных в БД'''
    serializer_class = GetUsersSerializer
    queryset = NewUser.objects.all()







class ActivateUser(APIView):
    '''Подтверждает почту юзера'''
    def put(self,request):
        user_name = request.data['user_name']
        
        if user_name:
            user = NewUser.objects.filter(user_name=user_name).first()
            if user:
                user.is_activated_acc = True
                user.save()
                return Response("Succes : You're account has been activated.",status=status.HTTP_200_OK)
            return Response('User with this username does not exist',status=status.HTTP_400_BAD_REQUEST)
        return Response('Error,please inpit username',status=status.HTTP_400_BAD_REQUEST)




class SearchPosts(APIView):
    '''Gets data from search bar to filter posts elements'''
    def post(self,request):
        search = request.data['search'] # не устойчиво к регистру.(можно создавать пост с помощью капиталайз)
        if search:
            searched_posts = Post.objects.filter(
                name__icontains = search
            )
            if searched_posts:
                posts = PostSerializer(searched_posts,many=True,context={'request':request}).data
                return Response(posts)
            return Response(f"Did'nt find anything to input --  {search}",status=status.HTTP_204_NO_CONTENT)
        return Response('Search bar is empty!Please input something',status=status.HTTP_204_NO_CONTENT)


class AddPostToCart(APIView):
    '''Добавляет selected post в корзину'''
    def post(self,request):
        post_name = request.data['post_name']
        user_name = request.data['user_name']
        if post_name and user_name:
            user = NewUser.objects.filter(user_name=user_name).first()
            post = Post.objects.filter(name=post_name).first()
            if user and post:
                user.products.add(post)
                return Response(f'Succes,you have bought it!{user.products}',status=status.HTTP_200_OK)
            return Response('Error user_name or post_name are incorret!',status=status.HTTP_400_BAD_REQUEST)

        return Response('Error,please input something',status=status.HTTP_400_BAD_REQUEST)




class GetUserCart(APIView):
    '''Получает корзину и покупи конкретного юзера(/mygoods page in js)'''
    def post(self,request):
        user_name = request.data['user_name']
        if user_name:
            user = NewUser.objects.filter(user_name=user_name).first()
            if user:
                found_posts = user.products.all()
                if found_posts:
                    posts = PostSerializer(found_posts,many=True,context={'request':request}).data
                    return Response(posts)
            return Response('User with this username does not exist!',status=status.HTTP_400_BAD_REQUEST)
        return Response('please select user!',status=status.HTTP_400_BAD_REQUEST)




class GetPostsByCategoryAndSearch(APIView):
    def post(self,request):
        search = request.data['search']
        cateogry = request.data['category']
        if search and cateogry:
            found_posts = Post.objects.filter(category_id=cateogry,name__icontains = search)
            if found_posts:
                posts = PostSerializer(found_posts,many=True,context={'request':request}).data
                return Response(posts,status=status.HTTP_200_OK)
            return Response('cant found posts to chosen category',status=status.HTTP_204_NO_CONTENT)
            
        return Response('no search or category',status=status.HTTP_204_NO_CONTENT)