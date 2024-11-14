# serializers.py
from rest_framework import serializers
from .models import Paciente, FichaClinica
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            username=validated_data['username'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '')
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class PacienteSerializer(serializers.ModelSerializer):
    edad = serializers.ReadOnlyField()  # Campo de solo lectura calculado automáticamente

    class Meta:
        model = Paciente
        fields = '__all__'  # Incluir todos los campos del modelo Paciente

class FichaClinicaSerializer(serializers.ModelSerializer):
    creado_por_username = serializers.CharField(source='creado_por.username', read_only=True)
    modificado_por_username = serializers.CharField(source='modificado_por.username', read_only=True)

    class Meta:
        model = FichaClinica
        fields = [
            'id', 'id_paciente', 'fecha_creacion', 'fecha_modificacion', 
            'creado_por_username', 'modificado_por_username', 'motivo_consulta', 
            'anamnesis', 'examen_fisico', 'diagnostico', 'intervenciones', 
            'factores', 'rau_necesidades', 'instrumentos_aplicados'
        ]
#serializer -> traductor de objetos a json y viceversa.
#serializers.ModelSerializer -> traduce los objetos a json y viceversa.
#serializers.ReadOnlyField() -> campo de solo lectura.
#serializers -> codifica como van y vienen las cosas.
#serializers. -> traducir,validar,convertir,etc.
