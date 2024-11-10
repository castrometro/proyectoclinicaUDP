from django.contrib import admin

# Register your models here.

from .models import Paciente, FichaClinica, EstudianteUser, DocenteUser



class DocenteUserAdmin(admin.ModelAdmin):
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        # Solo muestra estudiantes para el grupo Docente
        return qs.filter(groups__name="Estudiante")

class EstudianteUserAdmin(admin.ModelAdmin):
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        return qs.filter(groups__name="Estudiante")

admin.site.register(DocenteUser, DocenteUserAdmin)
admin.site.register(EstudianteUser, EstudianteUserAdmin)
admin.site.register(Paciente)
admin.site.register(FichaClinica)