from django.urls import path, include
from .views.create_view import CreateUser
from .serializers.create_user_serializer import CreateUserSerializer

urlpatterns = [
    # path('create/', hello_world, name='create'),
    path('create/', CreateUser.as_view(), name='create'),
    # path('myprofile/', views.MyProfileListView.as_view(), name='myprofile'),
    # path('', include(router.urls)),

]