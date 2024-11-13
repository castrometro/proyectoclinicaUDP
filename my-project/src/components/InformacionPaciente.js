import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink,User, Edit, Trash2,Calendar,Mail,Phone,CreditCard } from 'lucide-react';
import { deletePaciente, updatePaciente } from '../utils/pacientesService';

const userRole = localStorage.getItem('userRole');

export default function InformacionPaciente({ selectedPatient, onPatientDeleted, onPatientUpdated }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ ...selectedPatient });

  // Actualiza la edad automáticamente al cambiar la fecha de nacimiento
  const calculateAge = (fecha_nacimiento) => {
    if (fecha_nacimiento) {
      const today = new Date();
      const birthDate = new Date(fecha_nacimiento);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    }
    return '';
  };

  const handleDelete = async () => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar a ${selectedPatient.nombre}?`)) {
      const success = await deletePaciente(selectedPatient.rut);
      if (success) {
        onPatientDeleted(selectedPatient.rut);
        window.alert('Paciente eliminado exitosamente.');
      } else {
        alert('No se pudo eliminar el paciente.');
      }
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const updatedPatient = await updatePaciente(selectedPatient.rut, editForm);
    if (updatedPatient) {
      setIsEditing(false);
      window.alert('Paciente actualizado exitosamente.');
      onPatientUpdated();
    } else {
      alert('No se pudo actualizar el paciente.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
      edad: name === 'fecha_nacimiento' ? calculateAge(value) : prev.edad,
    }));
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Información del Paciente</h2>
      {selectedPatient ? (
        <div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-lg font-medium">{selectedPatient.nombre} {selectedPatient.apellido}</p>
            <Link 
              to={`/ficha-paciente/${selectedPatient.rut}`}
              className="text-blue-500 hover:text-blue-600 flex items-center"
            >
              Ver ficha completa
              <ExternalLink size={16} className="ml-1" />
            </Link>
          </div>

          {isEditing ? (
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                  Nombre
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={editForm.nombre}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellido">
                  Apellido
                </label>
                <input
                  type="text"
                  name="apellido"
                  value={editForm.apellido}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rut">
                  RUT u otro documento
                </label>
                <input
                  type="text"
                  name="rut"
                  value={editForm.rut}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fecha_nacimiento">
                  Fecha de Nacimiento
                </label>
                <input
                  type="date"
                  name="fecha_nacimiento"
                  value={editForm.fecha_nacimiento}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="edad">
                  Edad
                </label>
                <input
                  type="text"
                  name="edad"
                  value={editForm.edad}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  readOnly
                />
              </div>
              {/* Continuar con el resto de los campos como en CrearPaciente */}
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Guardar Cambios
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Cancelar
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-2">
              {/* Muestra la información del paciente cuando no está en modo de edición */}
              <p className="flex items-center">
                <User size={16} className="mr-2 text-gray-500" />
                <span className="font-semibold mr-2">RUT:</span> {selectedPatient.rut}
              </p>
              <p className="flex items-center"> 
                <Calendar size={16} className="mr-2 text-gray-500" />
                <span className="font-semibold mr-2">Edad:</span> {selectedPatient.edad} años
              </p>
              <p className="flex items-center">
                <Mail size={16} className="mr-2 text-gray-500" />
                <span className="font-semibold mr-2">Correo:</span> {selectedPatient.correo}
              </p>
              <p className="flex items-center">
                <Phone size={16} className="mr-2 text-gray-500" />
                <span className="font-semibold mr-2">Teléfono:</span> {selectedPatient.numero_telefono}
              </p>
              <p className="flex items-center">
                <CreditCard size={16} className="mr-2 text-gray-500" />
                <span className="font-semibold mr-2">Previsión:</span> {selectedPatient.prevision}
              </p>
            </div>
          )}

          {(userRole === 'Administrador' || userRole === 'Docente') && !isEditing && (
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
      ) : (
        <p>Seleccione un paciente para ver su información.</p>
      )}
    </div>
  );
}
