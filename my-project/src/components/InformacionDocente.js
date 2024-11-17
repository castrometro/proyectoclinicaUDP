import React, { useState } from 'react';
import { Mail, Phone, User, Calendar } from 'lucide-react';
import { deleteDocente, updateDocente } from '../utils/docentesService'; // Asegúrate de implementar estos servicios

export default function InformacionDocente({ selectedDocente, onDocenteDeleted, onDocenteUpdated }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDocente, setEditedDocente] = useState({ ...selectedDocente });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedDocente((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const updatedDocente = await updateDocente(editedDocente.id, editedDocente);
      alert("Docente actualizado correctamente.");
      setIsEditing(false);
      onDocenteUpdated(updatedDocente);
    } catch (error) {
      console.error("Error al actualizar docente:", error);
      alert("Error al actualizar el docente.");
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`¿Está seguro de eliminar al docente ${selectedDocente.nombre} ${selectedDocente.apellido}?`)) {
      try {
        await deleteDocente(selectedDocente.id);
        alert("Docente eliminado correctamente.");
        onDocenteDeleted();
      } catch (error) {
        console.error("Error al eliminar docente:", error);
        alert("Error al eliminar el docente.");
      }
    }
  };

  if (!selectedDocente) {
    return <p>Seleccione un docente para ver su información.</p>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Información del Docente</h2>
      <div className="space-y-2">
        {/* Nombre y correo */}
        <p className="flex items-center">
          <User size={16} className="mr-2 text-gray-500" />
          <span className="font-semibold mr-2">Nombre:</span>
          {isEditing ? (
            <input
              type="text"
              name="nombre"
              value={editedDocente.nombre}
              onChange={handleEditChange}
              className="border border-gray-300 rounded-md p-1"
            />
          ) : (
            selectedDocente.nombre
          )}
        </p>

        <p className="flex items-center">
          <Mail size={16} className="mr-2 text-gray-500" />
          <span className="font-semibold mr-2">Correo:</span>
          {isEditing ? (
            <input
              type="email"
              name="correo"
              value={editedDocente.correo}
              onChange={handleEditChange}
              className="border border-gray-300 rounded-md p-1"
            />
          ) : (
            selectedDocente.correo
          )}
        </p>

        {/* Teléfono */}
        <p className="flex items-center">
          <Phone size={16} className="mr-2 text-gray-500" />
          <span className="font-semibold mr-2">Teléfono:</span>
          {isEditing ? (
            <input
              type="text"
              name="telefono"
              value={editedDocente.telefono}
              onChange={handleEditChange}
              className="border border-gray-300 rounded-md p-1"
            />
          ) : (
            selectedDocente.telefono
          )}
        </p>

        {/* Fecha de incorporación */}
        <p className="flex items-center">
          <Calendar size={16} className="mr-2 text-gray-500" />
          <span className="font-semibold mr-2">Fecha de incorporación:</span>
          {selectedDocente.fecha_incorporacion}
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
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-500 text-white px-4 py-2 rounded-md"
            >
              Editar
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Eliminar
            </button>
          </>
        )}
      </div>
    </div>
  );
}

