
from django.conf import settings
from django.conf.urls.static import static
from django.urls import include, path


from . import views
urlpatterns = [

    #posts
    path('getlistofposts/',views.ListOfPosts.as_view(),name='listofposts'),

    #post categories
    path('getlistcategories/',views.GetCreateCategory.as_view(),name='listofcateogires'),
    path('changelistofcategories/<int:pk>/',views.DeleteUpdateCategory.as_view(),name='changecategories'),

    #size categories
    path('getsizecategories/',views.GetSizeCategory.as_view(),name='listofcateogires'),
    path('updatesizecategories/<int:pk>/',views.UpdateDeleteSizeCategory.as_view(),name='changecategories'),

    # jwt token
    path('register/',views.CreateCustomUser.as_view(),name='register-user'),
    path('login/',views.Login.as_view(),name='log'),
    path('logout/',views.Logout.as_view(),name='logout'),


    #get posts by categories
    path('posts_by_categories/',views.Get_posts_by_category.as_view(),name='posts_by_categoreis'),

    # Admin Only
    # get list of users
    path('list_of_users/',views.GetUsers.as_view(),name='get_users'),

    # token data 
    path('token/access_data/',views.GetTokenData.as_view(),name='access-data'),


    #changeUserActivationLink
    path('activate/user/',views.ActivateUser.as_view(),name='activate-user'),

    #search_posts
    path('search/posts/',views.SearchPosts.as_view(),name='search-posts'),
    path('posts_by_category_and_search/',views.GetPostsByCategoryAndSearch.as_view(),name='posts_by_category_and_search'),

    #user opertains
    path('add_post_to_cart/',views.AddPostToCart.as_view(),name='add_to_bucket'),
    path('get_user_cart/',views.GetUserCart.as_view(),name='user-cart')
]   


# media
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,document_root = settings.MEDIA_ROOT)



