from django.urls import path, include
from .views.create_view import CreateUser
from .views.login_view import LoginUser
from .views.update_view import UserUpdate


urlpatterns = [
    # path('create/', hello_world, name='create'),
    path('create/', CreateUser.as_view(), name='create'),
    path('login/', LoginUser.as_view(), name='login'),
    path('update/', UserUpdate.as_view(), name='update'),
    # path('', include(router.urls)),

]
