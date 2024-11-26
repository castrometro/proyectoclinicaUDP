# views.py
from django.shortcuts import render
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User, Group
from .models import Paciente, FichaClinica, DocenteUser, EstudianteUser
from .serializers import PacienteSerializer, UserSerializer, FichaClinicaSerializer
from .permissions import *
from django.db.models import Q
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.db import transaction


class CustomTokenObtainPairView(TokenObtainPairView):
    permission_classes = [permissions.AllowAny]
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        user = request.user

        # Verifica que el usuario esté autenticado
        if user.is_authenticated:
            # Devuelve el primer grupo del usuario como rol
            response.data['role'] = user.groups.first().name if user.groups.exists() else 'No role'
        else:
            response.data['role'] = 'No role'
        
        return response
    
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        
        # Obtener el usuario
        user = self.user
        
        # Agregar el rol del usuario al token si el usuario está en un grupo
        data['role'] = user.groups.first().name if user.groups.exists() else 'No role'
        return data

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class PacienteViewSet(viewsets.ModelViewSet):
    queryset = Paciente.objects.all()
    serializer_class = PacienteSerializer
    permission_classes = [IsAuthenticated, PermisosPacientes]  # Requiere autenticación
    


class FichaClinicaViewSet(viewsets.ModelViewSet):
    queryset = FichaClinica.objects.all()
    serializer_class = FichaClinicaSerializer
    permission_classes = [IsAuthenticated, IsAdminOrDocenteOrReadOnly]

    def perform_create(self, serializer):
        # Asigna el usuario que crea la ficha clínica
        serializer.save(creado_por=self.request.user, modificado_por=self.request.user)

    def perform_update(self, serializer):
        # Actualiza el usuario que modifica la ficha clínica
        serializer.save(modificado_por=self.request.user)
    def get_queryset(self):
        queryset = FichaClinica.objects.all()
        id_paciente = self.request.query_params.get('id_paciente', None)
        
        if id_paciente is not None:
            queryset = queryset.filter(id_paciente__rut=id_paciente)
            
        return queryset




@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
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

@api_view(['GET'])
def get_current_user(request):
    user = request.user
    serializer = UserSerializer(user)
    return Response(serializer.data)

class DocenteViewSet(viewsets.ModelViewSet):
    queryset = User.objects.filter(groups__name='Docente')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        if self.request.user.groups.filter(name="Administrador").exists():
            return [permissions.IsAuthenticated()]
        return [permissions.IsAdminUser()]

    def perform_create(self, serializer):
        user = serializer.save()
        group = Group.objects.get(name='Docente')
        user.groups.add(group)

class EstudianteViewSet(viewsets.ModelViewSet):
    queryset = User.objects.filter(groups__name='Estudiante')  # Filtra usuarios en el grupo 'Estudiantes'
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        # Si el usuario pertenece al grupo 'Administrador', permite cualquier acción autenticada
        user_auth = ["Administrador", "Docente"]
        if self.request.user.groups.filter(name__in=user_auth).exists():
            return [permissions.IsAuthenticated()]
        # De lo contrario, restringe a permisos de administrador
        return [permissions.IsAdminUser()]

    def perform_create(self, serializer):
        # Guarda el usuario y lo agrega al grupo 'Estudiantes'
        user = serializer.save()
        group = Group.objects.get(name='Estudiante')  # Obtiene el grupo 'Estudiante'
        user.groups.add(group)


@api_view(['GET'])
def list_pacientes(request):
    search = request.GET.get('search', '')
    if search:
        pacientes = Paciente.objects.filter(
            Q(rut__icontains=search) |
            Q(nombre__icontains=search) |
            Q(apellido__icontains=search)
        )
    else:
        pacientes = Paciente.objects.all()
    serializer = PacienteSerializer(pacientes, many=True)
    return Response(serializer.data)




@api_view(['GET'])
@permission_classes([IsAdmin])
def total_pacientes(request):
    count = Paciente.objects.count()
    return Response({"total": count})

@api_view(['GET'])
@permission_classes([IsAdmin])
def total_docentes(request):
    count = DocenteUser.objects.count()
    return Response({"total": count})

@api_view(['GET'])
@permission_classes([IsAdmin])
def total_estudiantes(request):
    count = EstudianteUser.objects.count()
    return Response({"total": count})

@api_view(['GET'])
@permission_classes([IsAdmin])
def total_fichas(request):
    count = FichaClinica.objects.count()
    return Response({"total": count})





@api_view(['PUT'])
def update_paciente(request, rut):
    try:
        paciente = Paciente.objects.get(rut=rut)
    except Paciente.DoesNotExist:
        return Response({'error': 'Paciente no encontrado.'}, status=404)

    serializer = PacienteSerializer(paciente, data=request.data)
    if serializer.is_valid():
        new_rut = serializer.validated_data.get('rut')
        
        try:
            with transaction.atomic():
                # Actualiza las fichas relacionadas si es necesario
                FichaClinica.objects.filter(paciente=paciente).update(paciente=new_rut)
                serializer.save()
            return Response(serializer.data, status=200)
        except Exception as e:
            return Response({'error': f'Error al actualizar: {str(e)}'}, status=400)

    return Response(serializer.errors, status=400)

