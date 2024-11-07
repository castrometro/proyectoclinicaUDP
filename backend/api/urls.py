from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ApiTest, PacienteViewSet, FichaClinicaViewSet

# Crea el router y registra las vistas
router = DefaultRouter()
router.register(r'pacientes', PacienteViewSet)
router.register(r'fichas_clinicas', FichaClinicaViewSet)

# Define las URLs de la aplicación api
urlpatterns = [
    path('', include(router.urls)),
    path('test/', ApiTest.as_view({'get': 'list'})),
    path('listapacientes/', ApiTest.as_view({'get': 'listapacientes'})),
]

