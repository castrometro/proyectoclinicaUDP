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

class FichaClinica(models.Model):
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE, related_name="fichas_clinicas")
    fecha_creacion = models.DateField(auto_now_add=True)  # También representa la fecha de atención
    hora_creacion = models.TimeField()   # También representa la hora de atención
    profesional = models.CharField(max_length=100)        # Profesional que atendió al paciente
    usuario_creacion = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name="fichas_creadas")
    fecha_modificacion = models.DateField(auto_now=True)
    hora_modificacion = models.TimeField()
    usuario_modificacion = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name="fichas_modificadas")
    profesionales_que_modificaron = models.ManyToManyField(User, related_name="profesionales_modificadores", blank=True)
    
    factores = models.TextField()
    anamnesis = models.TextField()
    motivo_consulta = models.TextField()
    rau_necesidades = models.TextField()
    examen_fisico = models.TextField()
    instrumentos_aplicados = models.TextField()
    diagnostico = models.TextField()
    intervenciones = models.TextField()
    imagenes = models.ImageField(upload_to='fichas_imagenes/', blank=True, null=True)

    class Meta:
        verbose_name = "Ficha Clinica"
        verbose_name_plural = "Fichas Clinicas"

    def __str__(self):
        return f"Ficha de {self.paciente} - {self.fecha_creacion} {self.hora_creacion}"

    def save(self, *args, **kwargs):
        # Ajustar la hora de creación si es nueva ficha
        if not self.pk:  # Si la ficha es nueva (no tiene clave primaria aún)
            now = timezone.now() - timedelta(hours=3)  # Resta 3 horas
            self.hora_creacion = now.replace(second=0, microsecond=0).time()  # Hora sin segundos
            
        # Ajustar la hora de modificación en cada guardado
        now = timezone.now() - timedelta(hours=3)  # Resta 3 horas
        self.hora_modificacion = now.replace(second=0, microsecond=0).time()  # Hora sin segundos

        super().save(*args, **kwargs)

class HistorialModificacionFichaClinica(models.Model):
    ficha_clinica = models.ForeignKey(FichaClinica, on_delete=models.CASCADE, related_name="historial_modificaciones")
    usuario = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    fecha_modificacion = models.DateField(auto_now_add=True)
    hora_modificacion = models.TimeField(auto_now_add=True)
    accion = models.CharField(max_length=12, choices=[("creacion", "Creación"), ("modificacion", "Modificación")])

    class Meta:
        verbose_name = "Historial de Modificacion de Ficha Clinica"
        verbose_name_plural = "Historiales de Modificaciones de Fichas Clinicas"

    def __str__(self):
        return f"{self.accion.capitalize()} de {self.ficha_clinica} por {self.usuario} en {self.fecha_modificacion} {self.hora_modificacion}"

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
