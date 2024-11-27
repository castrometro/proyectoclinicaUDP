#models.py
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from datetime import date, timedelta



class Paciente(models.Model):
    rut = models.CharField(max_length=12, primary_key=True, verbose_name="RUT")
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    prevision = models.CharField(max_length=100)
    correo = models.EmailField()
    numero_telefono = models.CharField(max_length=20)
    fecha_nacimiento = models.DateField()
    domicilio = models.CharField(max_length=200)

    @property
    def edad(self):
        today = date.today()
        return today.year - self.fecha_nacimiento.year - (
            (today.month, today.day) < (self.fecha_nacimiento.month, self.fecha_nacimiento.day)
        )

    def __str__(self):
        return f"{self.nombre} {self.apellido} ({self.rut})"


class DocenteUser(User):
    class Meta:
        proxy = True
        verbose_name = "Docente"
        verbose_name_plural = "Docentes"

class EstudianteUser(User):
    class Meta:
        proxy = True
        verbose_name = "Estudiante"
        verbose_name_plural = "Estudiantes"

class FichaClinica(models.Model):
    id_paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE, related_name="fichas")
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_modificacion = models.DateTimeField(auto_now=True)
    creado_por = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name="fichas_creadas")
    modificado_por = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name="fichas_modificadas")
    motivo_consulta = models.TextField()
    anamnesis = models.TextField()
    examen_fisico = models.TextField()
    diagnostico = models.TextField()
    intervenciones = models.TextField()
    factores = models.TextField()
    rau_necesidades = models.TextField()
    instrumentos_aplicados = models.TextField()

    def __str__(self):
        return f"Ficha Clínica de {self.id_paciente} - {self.fecha_creacion.strftime('%Y-%m-%d')}"

    class Meta:
        verbose_name = "Ficha Clínica"
        verbose_name_plural = "Fichas Clínicas"
        ordering = ['-fecha_creacion']