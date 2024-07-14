from django.urls import path, include
from .views.create_view import CreateUser
from .views.login_view import LoginUser


urlpatterns = [
    # path('create/', hello_world, name='create'),
    path('create/', CreateUser.as_view(), name='create'),
    path('login/', LoginUser.as_view(), name='login'),
    # path('', include(router.urls)),

]
