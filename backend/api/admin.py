from django.contrib import admin

# Register your models here.

from .models import Paciente, FichaClinica

admin.site.register(Paciente)
admin.site.register(FichaClinica)

