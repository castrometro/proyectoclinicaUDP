from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import viewsets
from .models import Paciente, FichaClinica, DocenteUser
from .serializers import PacienteSerializer, FichaClinicaSerializer, UserSerializer
from django.contrib.auth.models import User
# views.py
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

from rest_framework import viewsets, permissions
from django.contrib.auth.models import User, Group
from rest_framework.response import Response
from rest_framework.decorators import action
from .serializers import UserSerializer

class CustomTokenObtainPairView(TokenObtainPairView):
    permission_classes = [AllowAny]
    #ver si hay permisos para acceder a la vista.


class ApiTest(viewsets.ViewSet):
    def list(self, request):
        return Response({"message": "Hello, world!"})
    
    def listapacientes(self, request):
        return Response({"message": "david, esquizofrenico"})
    

class PacienteViewSet(viewsets.ModelViewSet):
    queryset = Paciente.objects.all()
    serializer_class = PacienteSerializer

    # def list(self, request):
    #     # pacientes = Paciente.objects.filter(rut = 1234555 ).count()
    #     # pacientes = Paciente.objects.values('rut').all()
    #     pacientes = Paciente.objects.all()
    #     serializer= PacienteSerializer(pacientes, many=True)
    #     return Response({"message": pacientes})

    
    #metodos:
    #list(http get)-> obtener todos http://127.0.0.1:8000/api/pacientes/
    #create(http post) -> crear http://127.0.0.1:8000/api/pacientes/
    #retrieve(http get) -> obtener uno en particular http://127.0.0.1:8000/api/pacientes/1234555/
    #update(put) -> actualizar
    #destroy(delete) -> eliminar http://127.0.0.1:8000/api/pacientes/1234555/

class FichaClinicaViewSet(viewsets.ModelViewSet):
    queryset = FichaClinica.objects.all()
    serializer_class = FichaClinicaSerializer



from rest_framework.decorators import api_view, permission_classes
from .permissions import IsAdmin, IsDocente, IsEstudiante

@api_view(['POST', 'GET', 'PUT', 'DELETE'])
@permission_classes([IsAdmin])
def manage_all_users(request):
    # CRUD completo sobre todos los usuarios (para el grupo Administrador)
    
    ...

@api_view(['POST', 'GET', 'PUT', 'DELETE'])
@permission_classes([IsDocente])
def manage_students_and_patients(request):
    # CRUD sobre estudiantes, pacientes y fichas (para el grupo Docente)
    ...

@api_view(['GET', 'PUT'])
@permission_classes([IsEstudiante])
def view_patients_and_update_ficha(request):
    # Permiso de lectura para pacientes y actualización para fichas (para el grupo Estudiante)
    ...


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_menu_options(request):
    user = request.user
    menu_options = []

    if user.groups.filter(name="Administrador").exists():
        menu_options = ["Gestión de Pacientes", "Gestión de Docentes", "Gestión de Estudiantes", "Gestión de Administrador"]
    elif user.groups.filter(name="Docente").exists():
        menu_options = ["Gestión de Pacientes", "Gestión de Estudiantes"]
    elif user.groups.filter(name="Estudiante").exists():
        menu_options = ["Gestión de Pacientes"]

    return Response({"menu_options": menu_options})



class DocenteViewSet(viewsets.ModelViewSet):
    queryset = User.objects.filter(groups__name='Docentes')
    serializer_class = UserSerializer
    
    # Permitir solo a Administradores acceder a esta vista
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        if self.request.user.groups.filter(name="Administrador").exists():
            return [permissions.IsAuthenticated()]
        return [permissions.IsAdminUser()]

    def perform_create(self, serializer):
        # Al crear un usuario docente, asignarlo al grupo Docentes
        user = serializer.save()
        group = Group.objects.get(name='Docentes')
        user.groups.add(group)