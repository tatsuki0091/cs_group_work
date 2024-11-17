from django.urls import path, include
from .views.create_view import CreateEvent

urlpatterns = [
    # path('create/', hello_world, name='create'),
    path('create/', CreateEvent.as_view(), name='create'),
]
