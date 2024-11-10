from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ApiTest, PacienteViewSet, FichaClinicaViewSet, CustomTokenObtainPairView, get_menu_options, DocenteViewSet

# Crea el router y registra las vistas
router = DefaultRouter()
router.register(r'pacientes', PacienteViewSet)
router.register(r'fichas_clinicas', FichaClinicaViewSet)
router.register(r'docentes', DocenteViewSet)
# viewset es un set de vistas, en este caso es el conjunto CRUD.

# Define las URLs de la aplicación api
urlpatterns = [
    path('', include(router.urls)),
    # path('test/', ApiTest.as_view({'get': 'list'}), name='david poto'),
    # path('listapacientes/', ApiTest.as_view({'get': 'listapacientes'})),
    path('auth/login/', CustomTokenObtainPairView.as_view(), name='token de login'),
    path('menu-options/', get_menu_options, name='get_menu_options'),
    #as view es solo una vista de algo mas particular.
    
]
#Apuntes
# Router: Simplificar creacion de rutas para pacientes. Con una linea puedo hacer el crud para
# lo asignado. Router.register -> CRUD
# Urlpatterns: son lineas de rutas más especifias, "personalizadas".
# formato: path('ruta', vista, name='nombre'). Donde name implica asignarle un ID a la ruta.
# Hay mas funciones para el 3er argumento.
#
#
#
#
#
#
#
#
#
#