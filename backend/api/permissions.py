#permissions.py
from rest_framework.permissions import BasePermission
from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsAdminOrDocente(BasePermission):
    def has_permission(self, request, view):
        return request.user.groups.filter(name__in=['Administrador', 'Docente']).exists()


class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.groups.filter(name="Administrador").exists()

class IsDocente(BasePermission):
    def has_permission(self, request, view):
        return request.user.groups.filter(name="Docente").exists()

class IsEstudiante(BasePermission):
    def has_permission(self, request, view):
        return request.user.groups.filter(name="Estudiante").exists()

class IsAdminOrDocenteOrReadOnly(BasePermission):
    """
    Permiso que permite a todos los usuarios autenticados ver y crear fichas clínicas.
    Solo los usuarios en los grupos 'Administrador' o 'Docente' pueden editar o eliminar.
    """

    def has_permission(self, request, view):
        # Todos los usuarios autenticados pueden ver y crear (GET y POST)
        if request.method in SAFE_METHODS or request.method == 'POST':
            return request.user.is_authenticated
        # Solo Administrador o Docente pueden editar o eliminar (PUT, PATCH, DELETE)
        return request.user.groups.filter(name__in=['Administrador', 'Docente']).exists()

class PermisosPacientes(BasePermission):
    """
    Permite GET y POST a todos los usuarios autenticados.
    Solo permite PUT y DELETE a los administradores y docentes.
    """
    def has_permission(self, request, view):
        # Permitir acceso de solo lectura (GET) y creación (POST) a todos los usuarios autenticados
        if request.method in SAFE_METHODS or request.method == "POST":
            return request.user.is_authenticated
        # Permitir PUT y DELETE solo a administradores y docentes
        return request.user.groups.filter(name__in=['Administrador', 'Docente']).exists()