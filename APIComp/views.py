
from django.http import JsonResponse
from rest_framework import authentication
from urllib import response
from rest_framework_simplejwt.tokens import RefreshToken,AccessToken
from django.middleware import csrf
from django.contrib.auth import authenticate
from rest_framework import generics
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



#PRODUCT OPERATIONS
class ListOfPosts(generics.ListCreateAPIView):
    '''Создание нового поста или получение всех существующих постов'''
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    
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
            return Response(data)
        else:
            return Response('Error :  Token is not valid or expired!',status=status.HTTP_403_FORBIDDEN)


    except:
        return Response('Error :  Token is not valid or expired!',status=status.HTTP_403_FORBIDDEN)



class GetTokenData(APIView):
    '''Класс который использует функцию get_data_from_access'''
    def post(self,request):
        token = request.data['access_token']
        data = get_data_from_access(token)
        return Response(data).data


# MACHINE CATEGORIES
class GetCreateCategory(generics.ListCreateAPIView):
    '''Создаёт новую или получает все категории,отвечающие за принадлежность товара'''
    queryset = Category.objects.all()
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


                reg_serializer.save()  # создаёт акк


                '''Временно отключил рассылку'''
                # html_message = '<div style={"text-align":"center"}><a href="http://localhost:3000/login" onclick="Activate_user(user_name)">Confirm Your regestration by following the link below...</a></div>'
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
        if not user.check_password(password):
            return Response('Login or passowrd are uncorrect!',status=status.HTTP_400_BAD_REQUEST)
        if user.is_activated_acc:
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
                return Response({'Succes' : 'token was blacklisted'})
            return Response({'Error' : "Token is wrong or blacklisted already"})
        except Exception as e:
            return Response({'Error' : e})


class  Get_posts_by_categories(ListAPIView):
    '''Получает посты по критериям'''
    permission_classes = [AllowAny,]
    serializer_class = Postsbycategories

    def get_queryset(self,request):
        category = request.data['category']

        posts = Post.objects.filter(category=category)

        return posts


class GetUsers(ListAPIView):
    '''Получает всех юзеров,записанных в БД'''
    serializer_class = GetUsersSerializer
    queryset = NewUser.objects.all()




# filter posts by name
class FilterPost(APIView):
    serializer_class = PostSerializer

    filter_backends = (DjangoFilterBackend)
    def post(self,request):
        name_search  = request.data['name_search']
        if name_search:
            posts = Post.objects.filter(name__contains=name_search).values()
            return Response(posts)
        return Response('Нет категории,соотвествующих вашему запросу')

# filter posts by user
class FilterPostsByUser(APIView):
    '''Posts that 1 user bought'''
    serializer_class = PostSerializer

    filter_backends = (DjangoFilterBackend)
    def post(self,request):
        user  = request.data['user']
        if user:
            posts = Post.objects.filter(user=user).values()
            return Response({'posts':posts})
        return Response('Нет категории,соотвествующих вашему запросу')
