import React, { useState } from 'react';
import { addEstudiante } from '../utils/estudiantesService'; // Servicio para agregar estudiantes
import { verifyToken } from '../utils/authService'; // Verificación de token

export default function CrearEstudiante({ onClose, onCreateStudent }) {
  const [estudiante, setEstudiante] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState(null); // Estado para manejar errores
  const [isCreating, setIsCreating] = useState(false); // Estado para manejar la carga

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEstudiante((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsCreating(true); // Activa la rueda de carga
    setError(null); // Limpia errores previos

    try {
      const isValid = await verifyToken(); // Verifica el token
      if (!isValid) {
        window.alert('Su sesión ha expirado. Por favor, inicie sesión nuevamente.');
        window.location.href = '/iniciar-sesion';
        return;
      }

      const response = await addEstudiante(estudiante); // Llama a la API para crear el estudiante

      // Validar que la respuesta tiene el formato esperado
      if (response) {
        onCreateStudent(response); // Pasa los datos creados al callback
        window.alert('Estudiante creado exitosamente.');
        onClose(); // Cierra el modal
      } else {
        throw new Error('Respuesta inesperada de la API');
      }
    } catch (err) {
      console.error('Error inesperado:', err);
      setError('Ocurrió un error inesperado. Inténtelo nuevamente.');
    } finally {
      setIsCreating(false); // Desactiva la rueda de carga
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h2 className="text-2xl font-arizona font-medium mb-4">Crear Estudiante</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>} {/* Mensaje de error */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-base font-worksans font-semibold  mb-2 " htmlFor="username">
              Nombre de Usuario
            </label>
            <input
              type="text"
              name="username"
              value={estudiante.username}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-base font-worksans font-semibold  mb-2 " htmlFor="first_name">
              Nombre
            </label>
            <input
              type="text"
              name="first_name"
              value={estudiante.first_name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-base font-worksans font-semibold  mb-2 " htmlFor="last_name">
              Apellido
            </label>
            <input
              type="text"
              name="last_name"
              value={estudiante.last_name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-base font-worksans font-semibold  mb-2 " htmlFor="email">
              Correo Electrónico
            </label>
            <input
              type="email"
              name="email"
              value={estudiante.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-base font-worksans font-semibold  mb-2 " htmlFor="password">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              value={estudiante.password}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-aqua hover:bg-blue-700 text-white font-arizona font-medium mb-4 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={isCreating} // Desactiva el botón mientras se crea
            >
              {isCreating ? 'Creando...' : 'Crear Estudiante'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 hover:bg-red-700 text-white font-arizona font-medium mb-4 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
