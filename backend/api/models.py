from django.db import models
from django.utils import timezone
from datetime import date

class Paciente(models.Model):
    # Campos del modelo Paciente
    rut = models.CharField(max_length=12, primary_key=True, verbose_name="RUT")
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    prevision = models.CharField(max_length=100)
    correo = models.EmailField()
    numero_telefono = models.CharField(max_length=20)
    fecha_nacimiento = models.DateField()
    domicilio = models.CharField(max_length=200)

    # Calcula la edad automáticamente en función de la fecha de nacimiento
    @property
    def edad(self):
        today = date.today()
        return today.year - self.fecha_nacimiento.year - (
            (today.month, today.day) < (self.fecha_nacimiento.month, self.fecha_nacimiento.day)
        )

    def __str__(self):
        return f"{self.nombre} {self.apellido} ({self.rut})"

class FichaClinica(models.Model):
    # Relación con el modelo Paciente usando ForeignKey
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE, related_name="fichas_clinicas")
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    creado_por = models.CharField(max_length=100)
    fecha_modificacion = models.DateTimeField(auto_now=True)
    modificado_por = models.CharField(max_length=100)
    factores = models.TextField()
    anamnesis = models.TextField()
    motivo_consulta = models.TextField()
    rau_necesidades = models.TextField()
    examen_fisico = models.TextField()
    instrumentos_aplicados = models.TextField()
    diagnostico = models.TextField()
    intervenciones = models.TextField()

    def __str__(self):
        return f"Ficha de {self.paciente} - {self.fecha_creacion.strftime('%Y-%m-%d %H:%M:%S')}"


