from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from rest_framework.response import Response

from rest_framework import viewsets
from .models import Paciente, FichaClinica
from .serializers import PacienteSerializer, FichaClinicaSerializer

class ApiTest(viewsets.ViewSet):
    def list(self, request):
        return Response({"message": "Hello, world!"})
    
    def listapacientes(self, request):
        return Response({"message": "david, esquizofrenico"})
    

class PacienteViewSet(viewsets.ModelViewSet):
    queryset = Paciente.objects.all()
    serializer_class = PacienteSerializer

class FichaClinicaViewSet(viewsets.ModelViewSet):
    queryset = FichaClinica.objects.all()
    serializer_class = FichaClinicaSerializer
