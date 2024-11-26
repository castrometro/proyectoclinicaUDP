import React, { useState } from 'react';
import { User, Edit, Trash2, Mail } from 'lucide-react';
import { deleteDocente, updateDocente } from '../utils/docentesService';
import { verifyToken } from '../utils/authService'; // Importa la función de verificación de token

export default function InformacionDocente({ selectedDocente, onDocenteDeleted, onDocenteUpdated }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Estado para manejar la carga
  const [editedDocente, setEditedDocente] = useState({ ...selectedDocente });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedDocente((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    setIsLoading(true); // Inicia la carga
    if (!(await verifyToken())) {
      setIsLoading(false); // Finaliza la carga si el token es inválido
      return;
    }

    const { password, ...dataSinContraseña } = editedDocente; // Excluye password del payload
    try {
      const updatedDocente = await updateDocente(editedDocente.id, dataSinContraseña);
      alert("Docente actualizado correctamente.");
      setIsEditing(false);
      onDocenteUpdated(updatedDocente);
    } catch (error) {
      console.error("Error al actualizar docente:", error);
      alert("Error al actualizar el docente.");
    } finally {
      setIsLoading(false); // Finaliza la carga
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`¿Está seguro de eliminar al docente ${selectedDocente.first_name} ${selectedDocente.last_name}?`)) {
      setIsLoading(true); // Inicia la carga
      if (!(await verifyToken())) {
        setIsLoading(false); // Finaliza la carga si el token es inválido
        return;
      }

      try {
        await deleteDocente(selectedDocente.id);
        alert("Docente eliminado correctamente.");
        onDocenteDeleted();
      } catch (error) {
        console.error("Error al eliminar docente:", error);
        alert("Error al eliminar el docente.");
      } finally {
        setIsLoading(false); // Finaliza la carga
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
        <p className="flex items-center">
          <User size={16} className="mr-2 text-gray-500" />
          <span className="font-semibold mr-2">Nombre:</span>
          {isEditing ? (
            <input
              type="text"
              name="first_name"
              value={editedDocente.first_name}
              onChange={handleEditChange}
              className="border border-gray-300 rounded-md p-1"
            />
          ) : (
            selectedDocente.first_name
          )}
        </p>
        <p className="flex items-center">
          <User size={16} className="mr-2 text-gray-500" />
          <span className="font-semibold mr-2">Apellido:</span>
          {isEditing ? (
            <input
              type="text"
              name="last_name"
              value={editedDocente.last_name}
              onChange={handleEditChange}
              className="border border-gray-300 rounded-md p-1"
            />
          ) : (
            selectedDocente.last_name
          )}
        </p>
        <p className="flex items-center">
          <Mail size={16} className="mr-2 text-gray-500" />
          <span className="font-semibold mr-2">Correo:</span>
          {isEditing ? (
            <input
              type="email"
              name="correo"
              value={editedDocente.email}
              onChange={handleEditChange}
              className="border border-gray-300 rounded-md p-1"
            />
          ) : (
            selectedDocente.email
          )}
        </p>
        <p className="flex items-center">
          <User size={16} className="mr-2 text-gray-500" />
          <span className="font-semibold mr-2">Usuario:</span>
          {isEditing ? (
            <input
              type="text"
              name="username"
              value={editedDocente.username}
              onChange={handleEditChange}
              className="border border-gray-300 rounded-md p-1"
            />
          ) : (
            selectedDocente.username
          )}
        </p>

        {/* Repetir estructura para otros campos */}
      </div>

      <div className="mt-4 space-x-4">
        {isEditing ? (
          <>
            <button
              onClick={handleSaveChanges}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              disabled={isLoading} // Desactiva el botón mientras carga
            >
              {isLoading ? "Guardando..." : "Guardar cambios"}
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
              disabled={isLoading} // Desactiva el botón mientras carga
            >
              {isLoading ? "Eliminando..." : (
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
