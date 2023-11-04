from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),  # 'mainpage/' URL에 index view 연결
    path('noticeboard/', views.noticeboard, name='noticeboard'),
    path('signin/', views.signin, name='signin'),
    path('signup/', views.signup, name='signup'),
    path('developer/', views.developer, name='developer'),

]