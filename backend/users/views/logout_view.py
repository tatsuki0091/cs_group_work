from rest_framework import generics


class Logout(generics.GenericAPIView):
    print('logout')
