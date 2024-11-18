import React, { useState } from 'react';
import { User, Edit, Trash2, Mail } from 'lucide-react';
import { deleteEstudiante, updateEstudiante } from '../utils/estudiantesService'; // Servicios específicos para estudiantes

export default function InformacionEstudiante({ selectedStudent, onStudentDeleted, onStudentUpdated }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedStudent, setEditedStudent] = useState({ ...selectedStudent });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedStudent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    const { password, ...dataSinContraseña } = editedStudent; // Excluye password del payload
    try {
      console.log(dataSinContraseña); // Antes de enviarlo al backend

      const updatedStudent = await updateEstudiante(editedStudent.id, dataSinContraseña);
      alert("Estudiante actualizado correctamente.");
      setIsEditing(false);
      onStudentUpdated(updatedStudent);
    } catch (error) {
      console.error("Error al actualizar estudiante:", error);
      alert("Error al actualizar el estudiante.");
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`¿Está seguro de eliminar al estudiante ${selectedStudent.first_name} ${selectedStudent.last_name}?`)) {
      try {
        await deleteEstudiante(selectedStudent.id);
        alert("Estudiante eliminado correctamente.");
        onStudentDeleted();
      } catch (error) {
        console.error("Error al eliminar estudiante:", error);
        alert("Error al eliminar el estudiante.");
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
            >
              Guardar cambios
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
              className="flex items-center bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              <Trash2 size={16} className="mr-2" /> Eliminar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
