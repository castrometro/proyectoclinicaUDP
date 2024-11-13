#permissions.py
from rest_framework.permissions import BasePermission


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
