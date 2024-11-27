// InformacionPaciente.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, User, Edit, Trash2, Calendar, Mail, Phone, CreditCard } from 'lucide-react';
import { deletePaciente, updatePaciente } from '../utils/pacientesService';
import { verifyToken } from '../utils/authService';
import { processRut } from '../utils/rutUtils';

const userRole = localStorage.getItem('userRole');

export default function InformacionPaciente({ selectedPatient, onPatientDeleted, onPatientUpdated }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false); // Control de carga en "Eliminar"
  const [isSaving, setIsSaving] = useState(false); // Control de carga en "Guardar Cambios"
  const [editForm, setEditForm] = useState({ ...selectedPatient });
  const [errorMessage, setErrorMessage] = useState(''); // Mensaje de error

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

  // Actualiza el formulario de edición cuando el paciente seleccionado cambia
  useEffect(() => {
    setEditForm({ ...selectedPatient });
  }, [selectedPatient]);

  const handleDelete = async () => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar a ${selectedPatient.nombre} ${selectedPatient.apellido}?`)) {
      setIsDeleting(true); // Activa la rueda de carga

      try {
        const isValid = await verifyToken(); // Verifica el token antes de proceder
        if (!isValid) {
          window.alert('Su sesión ha expirado. Por favor, inicie sesión nuevamente.');
          window.location.href = '/iniciar-sesion'; // Redirige al inicio de sesión
          return; // Detiene la ejecución
        }

        const success = await deletePaciente(selectedPatient.rut);
        if (success) {
          onPatientDeleted(selectedPatient.rut);
          window.alert('Paciente eliminado exitosamente.');
        } else {
          alert('No se pudo eliminar el paciente.');
        }
      } catch (error) {
        console.error('Error al eliminar paciente:', error);
        alert('Hubo un problema al eliminar el paciente.');
      } finally {
        setIsDeleting(false); // Desactiva la rueda de carga
      }
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMessage(''); // Limpia mensajes de error anteriores

    try {
      const isValid = await verifyToken();
      if (!isValid) {
        window.alert('Su sesión ha expirado. Por favor, inicie sesión nuevamente.');
        window.location.href = '/iniciar-sesion';
        return;
      }

      // Validar el RUT completo antes de enviar
      try {
        const formattedRut = processRut(editForm.rut); // Valida y formatea el RUT
        setEditForm((prev) => ({ ...prev, rut: formattedRut })); // Actualiza el estado con el RUT formateado
      } catch (error) {
        setErrorMessage(error.message); // Muestra el error si el RUT no es válido
        setIsSaving(false);
        return; // Detiene el flujo si el RUT no es válido
      }

      // Enviar los datos al backend para actualizar
      const updatedPatient = await updatePaciente(selectedPatient.rut, editForm);
      if (updatedPatient) {
        setIsEditing(false);
        window.alert('Paciente actualizado exitosamente.');
        onPatientUpdated();
      } else {
        setErrorMessage('No se pudo actualizar el paciente.');
      }
    } catch (error) {
      console.error('Error al actualizar paciente:', error);
      setErrorMessage('Hubo un problema al actualizar el paciente.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'rut') {
      // Permitir solo números, K/k y un guión
      const allowedCharacters = /^[0-9Kk-]*$/;
      if (allowedCharacters.test(value)) {
        // Limitar a un solo guión y asegurarse de que esté antes del último carácter
        const rutParts = value.split('-');
        if (rutParts.length <= 2) {
          let formattedRut = value.toUpperCase();

          // Insertar guión automáticamente si el usuario ingresa el penúltimo dígito
          if (rutParts.length === 1 && formattedRut.length > 1) {
            const lastChar = formattedRut.slice(-1);
            const body = formattedRut.slice(0, -1);
            formattedRut = `${body}-${lastChar}`;
          }

          setEditForm((prev) => ({
            ...prev,
            [name]: formattedRut,
          }));
        }
      }
    } else {
      // Manejo de otros campos, como fecha de nacimiento
      setEditForm((prev) => ({
        ...prev,
        [name]: value,
        edad: name === 'fecha_nacimiento' ? calculateAge(value) : prev.edad, // Calcula edad automáticamente
      }));
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Información del Paciente</h2>
      {selectedPatient ? (
        <div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-lg font-medium">
              {selectedPatient.nombre} {selectedPatient.apellido}
            </p>
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
              {errorMessage && (
                <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {errorMessage}
                </div>
              )}
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
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rut">
                  RUT sin puntos, con guión y dígito verificador
                </label>
                <input
                  type="text"
                  name="rut"
                  value={editForm.rut}
                  onChange={handleChange}
                  maxLength={12} // Limita la longitud para evitar exceso de caracteres
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                  placeholder="12345678-5" // Ejemplo de formato
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  disabled={isSaving} // Desactiva el botón mientras se guarda
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
                    'Guardar Cambios'
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  disabled={isSaving} // Desactiva el botón mientras se guarda
                >
                  Cancelar
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-2">
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
                disabled={isDeleting} // Desactiva el botón mientras carga
                className={`flex items-center px-4 py-2 rounded-md text-white ${
                  isDeleting ? 'bg-gray-500' : 'bg-red-500 hover:bg-red-600'
                }`}
              >
                {isDeleting ? (
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
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
                  <Trash2 size={16} className="mr-2" />
                )}
                {isDeleting ? 'Eliminando...' : 'Eliminar'}
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
