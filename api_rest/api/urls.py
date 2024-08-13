from django.urls import path, include
from rest_framework import routers
from api import views

routerUser = routers.DefaultRouter()
routerUser.register(r'User', views.UserViewSet)


urlpatterns = [
    path('', include(routerUser.urls)),
]