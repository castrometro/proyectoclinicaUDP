# Generated by Django 5.1.3 on 2024-11-10 15:08

import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0003_atencion"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="atencion",
            options={"verbose_name": "Atencion", "verbose_name_plural": "Atenciones"},
        ),
        migrations.AlterModelOptions(
            name="fichaclinica",
            options={
                "verbose_name": "Ficha Clinica",
                "verbose_name_plural": "Fichas Clinicas",
            },
        ),
        migrations.RemoveField(
            model_name="atencion",
            name="diagnostico",
        ),
        migrations.RemoveField(
            model_name="atencion",
            name="fecha",
        ),
        migrations.RemoveField(
            model_name="atencion",
            name="intervenciones",
        ),
        migrations.RemoveField(
            model_name="atencion",
            name="ultima_edicion",
        ),
        migrations.RemoveField(
            model_name="atencion",
            name="usuario_edicion",
        ),
        migrations.RemoveField(
            model_name="atencion",
            name="valoracion",
        ),
        migrations.RemoveField(
            model_name="fichaclinica",
            name="creado_por",
        ),
        migrations.RemoveField(
            model_name="fichaclinica",
            name="modificado_por",
        ),
        migrations.AddField(
            model_name="atencion",
            name="fecha_atencion",
            field=models.DateField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name="atencion",
            name="hora_atencion",
            field=models.TimeField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name="fichaclinica",
            name="atencion",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="ficha_clinica",
                to="api.atencion",
            ),
        ),
        migrations.AddField(
            model_name="fichaclinica",
            name="hora_creacion",
            field=models.TimeField(
                auto_now_add=True, default=django.utils.timezone.now
            ),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="fichaclinica",
            name="hora_modificacion",
            field=models.TimeField(auto_now=True),
        ),
        migrations.AddField(
            model_name="fichaclinica",
            name="imagenes",
            field=models.ImageField(
                blank=True, null=True, upload_to="fichas_imagenes/"
            ),
        ),
        migrations.AddField(
            model_name="fichaclinica",
            name="profesionales_que_modificaron",
            field=models.ManyToManyField(
                blank=True,
                related_name="profesionales_modificadores",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AddField(
            model_name="fichaclinica",
            name="usuario_creacion",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="fichas_creadas",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AddField(
            model_name="fichaclinica",
            name="usuario_modificacion",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="fichas_modificadas",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AlterField(
            model_name="fichaclinica",
            name="fecha_modificacion",
            field=models.DateField(auto_now=True),
        ),
        migrations.CreateModel(
            name="HistorialModificacionFichaClinica",
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
                ("fecha_modificacion", models.DateField(auto_now_add=True)),
                ("hora_modificacion", models.TimeField(auto_now_add=True)),
                (
                    "accion",
                    models.CharField(
                        choices=[
                            ("creacion", "Creación"),
                            ("modificacion", "Modificación"),
                        ],
                        max_length=12,
                    ),
                ),
                (
                    "ficha_clinica",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="historial_modificaciones",
                        to="api.fichaclinica",
                    ),
                ),
                (
                    "usuario",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
            options={
                "verbose_name": "Historial de Modificacion de Ficha Clinica",
                "verbose_name_plural": "Historiales de Modificaciones de Fichas Clinicas",
            },
        ),
    ]