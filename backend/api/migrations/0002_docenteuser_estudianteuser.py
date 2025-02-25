# Generated by Django 5.1.3 on 2024-11-09 12:55

import django.contrib.auth.models
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0001_initial"),
        ("auth", "0012_alter_user_first_name_max_length"),
    ]

    operations = [
        migrations.CreateModel(
            name="DocenteUser",
            fields=[],
            options={
                "verbose_name": "Docente",
                "verbose_name_plural": "Docentes",
                "proxy": True,
                "indexes": [],
                "constraints": [],
            },
            bases=("auth.user",),
            managers=[
                ("objects", django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name="EstudianteUser",
            fields=[],
            options={
                "verbose_name": "Estudiante",
                "verbose_name_plural": "Estudiantes",
                "proxy": True,
                "indexes": [],
                "constraints": [],
            },
            bases=("auth.user",),
            managers=[
                ("objects", django.contrib.auth.models.UserManager()),
            ],
        ),
    ]
