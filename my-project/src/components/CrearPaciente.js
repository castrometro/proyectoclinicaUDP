import React, { useState } from 'react';
import { addPaciente } from '../utils/pacientesService';
import { verifyToken } from '../utils/authService';
import { processRut } from '../utils/rutUtils';

export default function CrearPaciente({ onClose, onCreatePatient }) {
  const [paciente, setPaciente] = useState({
    nombre: '',
    apellido: '',
    rut: '',
    fecha_nacimiento: '',
    domicilio: '',
    numero_telefono: '',
    correo: '',
    prevision: '',
    edad: '',
  });

  const [isSaving, setIsSaving] = useState(false); // Control de carga
  const [errorMessage, setErrorMessage] = useState(''); // Mensaje de error

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
            // Evitar múltiples guiones
            const lastChar = formattedRut.slice(-1);
            const body = formattedRut.slice(0, -1);
            formattedRut = `${body}-${lastChar}`;
          }

          setPaciente((prev) => ({
            ...prev,
            [name]: formattedRut,
          }));
        }
      }
    } else {
      setPaciente((prev) => ({
        ...prev,
        [name]: value,
        edad: name === 'fecha_nacimiento' ? calculateAge(value) : prev.edad,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMessage(''); // Limpia mensajes de error anteriores

    try {
      const isValid = await verifyToken(); // Verifica el token antes de proceder
      if (!isValid) {
        window.alert('Su sesión ha expirado. Por favor, inicie sesión nuevamente.');
        window.location.href = '/iniciar-sesion';
        return;
      }

      // Validar y formatear el RUT
      try {
        const formattedRut = processRut(paciente.rut); // Valida y formatea el RUT
        paciente.rut = formattedRut; // Asigna el RUT formateado al objeto
      } catch (error) {
        setErrorMessage(error.message); // Muestra el error si el RUT no es válido
        setIsSaving(false);
        return;
      }

      const pacienteData = { ...paciente };
      delete pacienteData.edad; // Elimina el campo calculado antes de enviar

      const response = await addPaciente(pacienteData);

      if (response.success) {
        onCreatePatient(response.data);
        window.alert('Paciente creado exitosamente.');
        onClose();
      } else {
        setErrorMessage(response.message); // Muestra el mensaje de error devuelto por la API
      }
    } catch (error) {
      console.error('Error inesperado:', error);
      setErrorMessage('Ocurrió un error inesperado. Inténtelo nuevamente.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h2 className="text-2xl font-arizona font-medium mb-4">Crear Paciente</h2>
        {errorMessage && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-base font-worksans font-semibold  mb-2" htmlFor="nombre">
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              value={paciente.nombre}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-base font-worksans font-semibold  mb-2" htmlFor="apellido">
              Apellido
            </label>
            <input
              type="text"
              name="apellido"
              value={paciente.apellido}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-base font-worksans font-semibold  mb-2" htmlFor="rut">
              RUT sin puntos, con guión y dígito verificador
            </label>
            <input
              type="text"
              name="rut"
              value={paciente.rut}
              onChange={handleChange}
              maxLength={12} // Limita la longitud para evitar exceso de caracteres
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
              placeholder="12345678-5" // Ejemplo de formato
            />
          </div>
          <div className="mb-4">
            <label className="block text-base font-worksans font-semibold  mb-2" htmlFor="fecha_nacimiento">
              Fecha de Nacimiento
            </label>
            <input
              type="date"
              name="fecha_nacimiento"
              value={paciente.fecha_nacimiento}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-base font-worksans font-semibold  mb-2" htmlFor="edad">
              Edad
            </label>
            <input
              type="text"
              name="edad"
              value={paciente.edad}
              readOnly
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
            />
          </div>

          <div className="mb-4">
            <label className="block text-base font-worksans font-semibold  mb-2" htmlFor="domicilio">
              Domicilio
            </label>
            <input
              type="text"
              name="domicilio"
              value={paciente.domicilio}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-base font-worksans font-semibold  mb-2" htmlFor="numero_telefono">
              Teléfono
            </label>
            <input
              type="tel"
              name="numero_telefono"
              value={paciente.numero_telefono}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-base font-worksans font-semibold  mb-2" htmlFor="correo">
              Correo Electrónico
            </label>
            <input
              type="email"
              name="correo"
              value={paciente.correo}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-base font-worksans font-semibold  mb-2 " htmlFor="prevision">
              Previsión
            </label>
            <input
              type="text"
              name="prevision"
              value={paciente.prevision}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-aqua hover:bg-blue-700 text-white font-arizona font-medium mb-4 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={isSaving}
            >
              {isSaving ? 'Guardando...' : 'Crear Paciente'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 hover:bg-red-700 text-white font-arizona font-medium mb-4 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={isSaving}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
