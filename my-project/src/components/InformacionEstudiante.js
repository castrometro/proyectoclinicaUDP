import React, { useState } from 'react';
import { User, Edit, Trash2, Mail } from 'lucide-react';
import { deleteEstudiante, updateEstudiante } from '../utils/estudiantesService'; // Servicios específicos para estudiantes
import { verifyToken } from '../utils/authService'; // Verificación de token

export default function InformacionEstudiante({ selectedStudent, onStudentDeleted, onStudentUpdated }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedStudent, setEditedStudent] = useState({ ...selectedStudent });
  const [isSaving, setIsSaving] = useState(false); // Estado para guardar cambios
  const [isDeleting, setIsDeleting] = useState(false); // Estado para eliminar estudiante

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedStudent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    setIsSaving(true); // Activa la rueda de carga
    try {
      const isValid = await verifyToken(); // Verifica el token
      if (!isValid) {
        window.alert('Su sesión ha expirado. Por favor, inicie sesión nuevamente.');
        window.location.href = '/iniciar-sesion';
        return;
      }

      const { password, ...dataSinContraseña } = editedStudent; // Excluye password del payload
      const updatedStudent = await updateEstudiante(editedStudent.id, dataSinContraseña);
      alert('Estudiante actualizado correctamente.');
      setIsEditing(false);
      onStudentUpdated(updatedStudent);
    } catch (error) {
      console.error('Error al actualizar estudiante:', error);
      alert('Error al actualizar el estudiante.');
    } finally {
      setIsSaving(false); // Desactiva la rueda de carga
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`¿Está seguro de eliminar al estudiante ${selectedStudent.first_name} ${selectedStudent.last_name}?`)) {
      setIsDeleting(true); // Activa la rueda de carga
      try {
        const isValid = await verifyToken(); // Verifica el token
        if (!isValid) {
          window.alert('Su sesión ha expirado. Por favor, inicie sesión nuevamente.');
          window.location.href = '/iniciar-sesion';
          return;
        }

        await deleteEstudiante(selectedStudent.id);
        alert('Estudiante eliminado correctamente.');
        onStudentDeleted();
      } catch (error) {
        console.error('Error al eliminar estudiante:', error);
        alert('Error al eliminar el estudiante.');
      } finally {
        setIsDeleting(false); // Desactiva la rueda de carga
      }
    }
  };

  if (!selectedStudent) {
    return <p>Seleccione un estudiante para ver su información.</p>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Información del Estudiante</h2>
      <div className="space-y-2">
        {/* Nombre y correo */}
        <p className="flex items-center">
          <User size={16} className="mr-2 text-gray-500" />
          <span className="font-semibold mr-2">Nombre:</span>
          {isEditing ? (
            <input
              type="text"
              name="first_name"
              value={editedStudent.first_name}
              onChange={handleEditChange}
              className="border border-gray-300 rounded-md p-1"
            />
          ) : (
            selectedStudent.first_name
          )}
        </p>

        <p className="flex items-center">
          <User size={16} className="mr-2 text-gray-500" />
          <span className="font-semibold mr-2">Apellido:</span>
          {isEditing ? (
            <input
              type="text"
              name="last_name"
              value={editedStudent.last_name}
              onChange={handleEditChange}
              className="border border-gray-300 rounded-md p-1"
            />
          ) : (
            selectedStudent.last_name
          )}
        </p>

        <p className="flex items-center">
          <Mail size={16} className="mr-2 text-gray-500" />
          <span className="font-semibold mr-2">Correo:</span>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={editedStudent.email}
              onChange={handleEditChange}
              className="border border-gray-300 rounded-md p-1"
            />
          ) : (
            selectedStudent.email
          )}
        </p>

        <p className="flex items-center">
          <User size={16} className="mr-2 text-gray-500" />
          <span className="font-semibold mr-2">Usuario:</span>
          {isEditing ? (
            <input
              type="text"
              name="username"
              value={editedStudent.username}
              onChange={handleEditChange}
              className="border border-gray-300 rounded-md p-1"
            />
          ) : (
            selectedStudent.username
          )}
        </p>
      </div>

      {/* Botones de acción */}
      <div className="mt-4 space-x-4">
        {isEditing ? (
          <>
            <button
              onClick={handleSaveChanges}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              disabled={isSaving} // Desactiva el botón mientras guarda
            >
              {isSaving ? 'Guardando...' : 'Guardar cambios'}
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
            >
              Cancelar
            </button>
          </>
        ) : (
          <div className="flex space-x-4 mt-4">
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              <Edit size={16} className="mr-2" /> Editar
            </button>
            <button
              onClick={handleDelete}
              className={`flex items-center px-4 py-2 rounded-md text-white ${
                isDeleting ? 'bg-gray-500' : 'bg-red-500 hover:bg-red-600'
              }`}
              disabled={isDeleting} // Desactiva el botón mientras elimina
            >
              {isDeleting ? 'Eliminando...' : (
                <>
                  <Trash2 size={16} className="mr-2" /> Eliminar
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
