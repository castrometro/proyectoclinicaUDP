# serializers.py
from rest_framework import serializers
from .models import Paciente, FichaClinica

class PacienteSerializer(serializers.ModelSerializer):
    edad = serializers.ReadOnlyField()  # Campo de solo lectura calculado automáticamente

    class Meta:
        model = Paciente
        fields = '__all__'  # Incluir todos los campos del modelo Paciente

class FichaClinicaSerializer(serializers.ModelSerializer):
    class Meta:
        model = FichaClinica
        fields = '__all__'  # Incluir todos los campos del modelo FichaClinica
