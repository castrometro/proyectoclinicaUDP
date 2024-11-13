from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

# Crea el router y registra las vistas
router = DefaultRouter()
router.register(r'pacientes', PacienteViewSet)
router.register(r'fichasclinicas', FichaClinicaViewSet)  # Cambiado a fichasclinicas para manejar atenciones y fichas clínicas
router.register(r'docentes', DocenteViewSet)

# Define las URLs de la aplicación api
urlpatterns = [
    path('', include(router.urls)),
    path('auth/login/', CustomTokenObtainPairView.as_view(), name='token_de_login'),
    path('menu-options/', get_menu_options, name='get_menu_options'),
    path('current-user/', get_current_user, name='get_current_user'),

]
