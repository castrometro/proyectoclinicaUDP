from django.contrib import admin
from .models import Paciente, FichaClinica, EstudianteUser, DocenteUser, HistorialModificacionFichaClinica

class DocenteUserAdmin(admin.ModelAdmin):
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        return qs.filter(groups__name="Docente")  # Filtra para mostrar solo docentes

class EstudianteUserAdmin(admin.ModelAdmin):
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        return qs.filter(groups__name="Estudiante")  # Filtra para mostrar solo estudiantes

# Configuración para visualizar las fichas clínicas en el panel de administración
class FichaClinicaAdmin(admin.ModelAdmin):
    list_display = ('paciente', 'fecha_creacion', 'hora_creacion', 'usuario_creacion', 'fecha_modificacion', 'hora_modificacion', 'usuario_modificacion')
    list_filter = ('fecha_creacion', 'usuario_creacion', 'usuario_modificacion')
    search_fields = ('paciente__nombre', 'paciente__apellido', 'usuario_creacion__username')

# Configuración para el historial de modificaciones de la ficha clínica
class HistorialModificacionFichaClinicaAdmin(admin.ModelAdmin):
    list_display = ('ficha_clinica', 'usuario', 'fecha_modificacion', 'hora_modificacion', 'accion')
    list_filter = ('accion', 'fecha_modificacion')
    search_fields = ('ficha_clinica__paciente__nombre', 'ficha_clinica__paciente__apellido', 'usuario__username')

# Registro de los modelos en el panel de administración
admin.site.register(DocenteUser, DocenteUserAdmin)
admin.site.register(EstudianteUser, EstudianteUserAdmin)
admin.site.register(Paciente)
admin.site.register(FichaClinica, FichaClinicaAdmin)
admin.site.register(HistorialModificacionFichaClinica, HistorialModificacionFichaClinicaAdmin)
