from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

# Crea el router y registra las vistas
router = DefaultRouter()
router.register(r'pacientes', PacienteViewSet)
router.register(r'docentes', DocenteViewSet, basename='docentes')  # Registro de DocenteViewSet
router.register(r'estudiantes', EstudianteViewSet, basename='estudiantes')  # Registro de EstudianteViewSet
router.register(r'fichas-clinicas', FichaClinicaViewSet)  # Registro de FichaClinicaViewSet

# Define las URLs de la aplicación api
urlpatterns = [
    path('', include(router.urls)),
    path('auth/login/', CustomTokenObtainPairView.as_view(), name='token_de_login'),
    path('menu-options/', get_menu_options, name='get_menu_options'),
    path('current-user/', get_current_user, name='get_current_user'),
    path('dashboard/total_fichas', total_fichas, name='total_fichas'),
    path('dashboard/total_pacientes', total_pacientes, name='total_pacientes'),
    path('dashboard/total_docentes', total_docentes, name='total_docentes'),
    path('dashboard/total_estudiantes', total_estudiantes, name='total_estudiantes'),
    path('pacientes/search/', list_pacientes, name='list_pacientes'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify')
]
