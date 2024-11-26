import React, { useState } from 'react';
import { User, Edit,Mail, } from 'lucide-react';
import { deleteDocente, updateDocente } from '../utils/docentesService'; // Asegúrate de implementar estos servicios
import { verifyToken } from '../utils/authService';


export default function InformacionDocente({ selectedDocente, onDocenteDeleted, onDocenteUpdated }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDocente, setEditedDocente] = useState({ ...selectedDocente });
  const [isDeleting, setIsDeleting] = useState(false); // Estado para eliminación
  const [isSaving, setIsSaving] = useState(false); // Estado para guardar


  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedDocente((prev) => ({
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
        window.location.href = '/iniciar-sesion'; // Redirige
        return;
      }
  
      const { password, ...dataSinContraseña } = editedDocente; // Excluye la contraseña
      const updatedDocente = await updateDocente(editedDocente.id, dataSinContraseña);
      alert('Docente actualizado correctamente.');
      setIsEditing(false);
      onDocenteUpdated(updatedDocente);
    } catch (error) {
      console.error('Error al actualizar docente:', error);
      alert('Error al actualizar el docente.');
    } finally {
      setIsSaving(false); // Desactiva la rueda de carga
    }
  };
  
  
  

  const handleDelete = async () => {
    if (window.confirm(`¿Está seguro de eliminar al docente ${selectedDocente.first_name} ${selectedDocente.last_name}?`)) {
      setIsDeleting(true); // Activa la rueda de carga
      try {
        const isValid = await verifyToken(); // Verifica el token
        if (!isValid) {
          window.alert('Su sesión ha expirado. Por favor, inicie sesión nuevamente.');
          window.location.href = '/iniciar-sesion'; // Redirige
          return;
        }
  
        await deleteDocente(selectedDocente.id);
        alert('Docente eliminado correctamente.');
        onDocenteDeleted();
      } catch (error) {
        console.error('Error al eliminar docente:', error);
        alert('Error al eliminar el docente.');
      } finally {
        setIsDeleting(false); // Desactiva la rueda de carga
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

        {/* Teléfono */}
        {/* <p className="flex items-center">
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
        </p> */}

        {/* Fecha de incorporación */}
        {/* <p className="flex items-center">
          <Calendar size={16} className="mr-2 text-gray-500" />
          <span className="font-semibold mr-2">Fecha de incorporación:</span>
          {selectedDocente.fecha_incorporacion}
        </p> */}
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
              {isSaving ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
              ) : (
                'Guardar cambios'
              )}
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
              {isDeleting ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
              ) : (
                'Eliminar'
              )}
            </button>

          </div>
        )}
      </div>
    </div>
  );
}

