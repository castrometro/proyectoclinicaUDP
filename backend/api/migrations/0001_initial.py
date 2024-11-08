# Generated by Django 5.1.3 on 2024-11-07 04:53

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Paciente",
            fields=[
                (
                    "rut",
                    models.CharField(
                        max_length=12,
                        primary_key=True,
                        serialize=False,
                        verbose_name="RUT",
                    ),
                ),
                ("nombre", models.CharField(max_length=100)),
                ("apellido", models.CharField(max_length=100)),
                ("prevision", models.CharField(max_length=100)),
                ("correo", models.EmailField(max_length=254)),
                ("numero_telefono", models.CharField(max_length=20)),
                ("fecha_nacimiento", models.DateField()),
                ("domicilio", models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name="FichaClinica",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("fecha_creacion", models.DateTimeField(auto_now_add=True)),
                ("creado_por", models.CharField(max_length=100)),
                ("fecha_modificacion", models.DateTimeField(auto_now=True)),
                ("modificado_por", models.CharField(max_length=100)),
                ("factores", models.TextField()),
                ("anamnesis", models.TextField()),
                ("motivo_consulta", models.TextField()),
                ("rau_necesidades", models.TextField()),
                ("examen_fisico", models.TextField()),
                ("instrumentos_aplicados", models.TextField()),
                ("diagnostico", models.TextField()),
                ("intervenciones", models.TextField()),
                (
                    "paciente",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="fichas_clinicas",
                        to="api.paciente",
                    ),
                ),
            ],
        ),
    ]
