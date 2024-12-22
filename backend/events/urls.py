from django.urls import path, include
from .views.create_view import CreateEvent
from .views.fetch_view import FetchEvent

urlpatterns = [
    # path('create/', hello_world, name='create'),
    path('create/', CreateEvent.as_view(), name='create'),
    path('fetch/', FetchEvent.as_view(), name='fetch'),
]
