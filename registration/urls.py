from django.urls import path
from .views import login_view, logout_view, dashboard

urlpatterns = [
    path("", login_view, name="login"),
    path("dashboard/", dashboard, name="dashboard"),
    path("logout/", logout_view, name="logout"),
]