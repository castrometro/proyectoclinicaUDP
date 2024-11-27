// CrearFicha.js
import React, { useState } from 'react';
import { saveFichaClinica } from '../utils/fichasService';
import { verifyToken } from '../utils/authService'; // Asegúrate de tener esta función
import { useNavigate } from 'react-router-dom';

export default function CrearFicha({ rut, onClose, onCreateFicha }) {
  const [fichaData, setFichaData] = useState({
    id_paciente: rut,
    factores: '',
    anamnesis: '',
    motivo_consulta: '',
    rau_necesidades: '',
    examen_fisico: '',
    instrumentos_aplicados: '',
    diagnostico: '',
    intervenciones: ''
  });

  const [isSaving, setIsSaving] = useState(false); // Control de carga
  const [errorMessage, setErrorMessage] = useState(''); // Mensaje de error general
  const [fieldErrors, setFieldErrors] = useState({}); // Errores por campo

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFichaData({ ...fichaData, [name]: value });

    // Limpiar el error del campo si está siendo editado
    if (fieldErrors[name]) {
      setFieldErrors(prevErrors => {
        const { [name]: removed, ...rest } = prevErrors;
        return rest;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMessage('');
    setFieldErrors({});

    // Definir los campos requeridos
    const requiredFields = [
      "factores",
      "anamnesis",
      "motivo_consulta",
      "rau_necesidades",
      "examen_fisico",
      "instrumentos_aplicados",
      "diagnostico",
      "intervenciones",
    ];

    // Verificar que todos los campos requeridos estén llenos
    const emptyFields = requiredFields.filter(
      (field) => !fichaData[field] || fichaData[field].trim() === ""
    );

    if (emptyFields.length > 0) {
      const newFieldErrors = {};
      emptyFields.forEach((field) => {
        newFieldErrors[field] = "Este campo es obligatorio.";
      });
      setFieldErrors(newFieldErrors);
      setErrorMessage(
        `Por favor, complete todos los campos requeridos: ${emptyFields
          .map((field) => field.replace('_', ' ').toUpperCase())
          .join(", ")}.`
      );
      setIsSaving(false);
      return;
    }

    try {
      // Verifica el token antes de proceder
      const isValid = await verifyToken();
      if (!isValid) {
        window.alert('Su sesión ha expirado. Por favor, inicie sesión nuevamente.');
        navigate('/iniciar-sesion');
        return;
      }

      const response = await saveFichaClinica(fichaData);

      // Asumiendo que la API devuelve la ficha creada en response.data
      if (response.success) {
        alert("Ficha creada exitosamente.");
        onCreateFicha(response.data); // Agrega la nueva ficha al estado del padre
        onClose(); // Cierra el formulario después de crear la ficha
      } else {
        setErrorMessage(response.message || "Error desconocido al crear la ficha.");
      }
    } catch (error) {
      if (error.response) {
        // El servidor respondió con un código de estado fuera del rango 2xx
        if (error.response.status === 401) {
          alert("No tienes autorización para crear una ficha. Por favor, inicia sesión.");
          navigate('/iniciar-sesion');
        } else if (error.response.status === 400) {
          alert("Datos inválidos. Por favor revisa la información e intenta de nuevo.");
        } else {
          alert(`Error al crear ficha: ${error.response.data.detail || "Error desconocido"}`);
        }
      } else if (error.request) {
        // No se recibió respuesta del servidor
        console.error("No se recibió respuesta del servidor:", error.request);
        alert("No se pudo conectar al servidor. Por favor, intenta más tarde.");
      } else {
        // Ocurrió un error al configurar la solicitud
        console.error("Error al configurar la solicitud:", error.message);
        alert("Hubo un problema al enviar la solicitud. Por favor, intenta de nuevo.");
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Nueva Ficha</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          Cerrar
        </button>
      </div>
      
      {errorMessage && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Categoría Valoración */}
        <h3 className="text-lg font-semibold mt-4">Categoría Valoración</h3>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Factores", name: "factores" },
            { label: "Anamnesis", name: "anamnesis" },
            { label: "Motivo Consulta", name: "motivo_consulta" },
            { label: "RAU Necesidades", name: "rau_necesidades" },
            { label: "Examen Físico", name: "examen_fisico" },
            { label: "Instrumentos Aplicados", name: "instrumentos_aplicados" },
          ].map((field, index) => (
            <div key={index}>
              <label className="font-semibold block mb-1" htmlFor={field.name}>
                {field.label}
              </label>
              <textarea
                id={field.name}
                name={field.name}
                value={fichaData[field.name]}
                onChange={handleChange}
                className={`border rounded-md p-2 w-full ${
                  fieldErrors[field.name] ? 'border-red-500 bg-red-50' : 'bg-gray-100'
                } resize-none`}
                placeholder={field.label}
                rows={3}
              ></textarea>
              {fieldErrors[field.name] && (
                <p className="text-red-500 text-sm mt-1">{fieldErrors[field.name]}</p>
              )}
            </div>
          ))}
        </div>

        {/* Categoría Diagnóstico */}
        <h3 className="text-lg font-semibold mt-4">Categoría Diagnóstico</h3>
        <div>
          <label className="font-semibold block mb-1" htmlFor="diagnostico">
            Diagnóstico
          </label>
          <textarea
            id="diagnostico"
            name="diagnostico"
            value={fichaData.diagnostico}
            onChange={handleChange}
            className={`border rounded-md p-2 w-full ${
              fieldErrors["diagnostico"] ? 'border-red-500 bg-red-50' : 'bg-gray-100'
            } resize-none`}
            placeholder="Diagnóstico"
            rows={3}
          ></textarea>
          {fieldErrors["diagnostico"] && (
            <p className="text-red-500 text-sm mt-1">{fieldErrors["diagnostico"]}</p>
          )}
        </div>

        {/* Categoría Intervenciones */}
        <h3 className="text-lg font-semibold mt-4">Categoría Intervenciones</h3>
        <div>
          <label className="font-semibold block mb-1" htmlFor="intervenciones">
            Intervenciones
          </label>
          <textarea
            id="intervenciones"
            name="intervenciones"
            value={fichaData.intervenciones}
            onChange={handleChange}
            className={`border rounded-md p-2 w-full ${
              fieldErrors["intervenciones"] ? 'border-red-500 bg-red-50' : 'bg-gray-100'
            } resize-none`}
            placeholder="Intervenciones"
            rows={3}
          ></textarea>
          {fieldErrors["intervenciones"] && (
            <p className="text-red-500 text-sm mt-1">{fieldErrors["intervenciones"]}</p>
          )}
        </div>
        
        {/* Botones de acción */}
        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700"
            disabled={isSaving}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 ${
              isSaving ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isSaving}
          >
            {isSaving ? 'Guardando...' : 'Guardar Ficha'}
          </button>
        </div>
      </form>
    </div>
  );
}
