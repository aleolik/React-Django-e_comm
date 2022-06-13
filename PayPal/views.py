




from unicodedata import name
from rest_framework.response import Response

from rest_framework.views import APIView

from rest_framework import status

from APIComp.serailizers import PostSerializer

from APIComp.models import NewUser

from APIComp.models import Post


from .serialziers import OrderSerializer

from .models import Order

class MakeOrder(APIView):
    def post(self,request):
        try:
            post_names = request.data['post_names'] # array
                
            user_name = request.data['user_name'] # string
                
            price = request.data['price'] # int

            user = NewUser.objects.get(user_name=user_name)

            posts = Post.objects.filter(name__in=[post_name for post_name in post_names])
            if user and posts and price:
                instance = Order.objects.create(user=user,price=price)
                instance.post.add(*posts)
                if instance:
                    instance.save()
                    return Response('Order was created sucessfully...')
                return Response('Wrong data,please try again!',status=status.HTTP_400_BAD_REQUEST)
            return Response('Wrong data,please try again!',status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response('Wrong data,please try again!',status=status.HTTP_400_BAD_REQUEST)


class GetOrderInProgress(APIView):
    def get(self,request):
        try:
            user_name = request.query_params['user_name']
            user_id = NewUser.objects.get(user_name=user_name)
            orders = Order.objects.filter(user=user_id,status='PROC')
            posts = Post.objects.filter(name__in=[name for order in orders for name in order.post.all()])
            posts = PostSerializer(posts,many=True,context={'request':request}).data
            orders = OrderSerializer(orders,many=True,context={'request':request}).data
            return Response({'orders':orders,'posts':posts})
        except:
            return Response('Wrong data,please try again!',status=status.HTTP_400_BAD_REQUEST)

class GetPostsById(APIView):
    def post(self,request):
        try:
            post_ids = request.data['posts_ids'] # массив
            posts = Post.objects.filter(id__in=[post_id for post_id in post_ids])
            posts = PostSerializer(posts,many=True,context={'request':request}).data
            if posts:
                return Response(posts)
            return Response('Wrong data,please try again!',status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response('Wrong data,please try again!',status=status.HTTP_400_BAD_REQUEST)