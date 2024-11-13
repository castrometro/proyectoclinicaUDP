from django.contrib import admin
from .models import Paciente, EstudianteUser, DocenteUser, FichaClinica

class DocenteUserAdmin(admin.ModelAdmin):
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        return qs.filter(groups__name="Docente")  # Filtra para mostrar solo docentes

class EstudianteUserAdmin(admin.ModelAdmin):
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        return qs.filter(groups__name="Estudiante")  # Filtra para mostrar solo estudiantes
    
class FichaClinicaAdmin(admin.ModelAdmin):
    # Define los campos que se mostrarán en la lista
    list_display = ('id_paciente', 'fecha_creacion', 'creado_por', 'modificado_por')
    # Define los campos que se pueden buscar
    search_fields = ('id_paciente__nombre', 'id_paciente__apellido', 'motivo_consulta', 'diagnostico')
    # Agrega filtros para facilitar la búsqueda
    list_filter = ('fecha_creacion', 'creado_por', 'modificado_por')
    



# Registro de los modelos en el panel de administración
admin.site.register(DocenteUser, DocenteUserAdmin)
admin.site.register(EstudianteUser, EstudianteUserAdmin)
admin.site.register(Paciente)
admin.site.register(FichaClinica, FichaClinicaAdmin)