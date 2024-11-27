// InformacionFicha.js
import React, { useState, useEffect } from 'react';
import { getFichaById, deleteFichaById, updateFichaById } from '../utils/fichasService';
import { verifyToken } from '../utils/authService'; // Agrega la función de verificación de token

export default function InformacionFicha({ fichaId, onClose, onDelete, onUpdate }) {
  const [ficha, setFicha] = useState(null);
  const [editableFicha, setEditableFicha] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({}); // Nuevo estado para errores de campo
  const userRole = localStorage.getItem('userRole');

  useEffect(() => {
    const fetchFicha = async () => {
      setIsLoading(true);
      setError(null);
  
      try {
        // Verifica el token antes de hacer la solicitud
        const isValid = await verifyToken();
        if (!isValid) {
          window.alert('Su sesión ha expirado. Por favor, inicie sesión nuevamente.');
          window.location.href = '/iniciar-sesion';
          return;
        }
  
        // Realiza la solicitud para obtener la ficha
        const data = await getFichaById(fichaId);
        setFicha(data);
        setEditableFicha(data); // Copia para edición
      } catch (err) {
        console.error('Error al cargar la ficha:', err);
        setError('No se pudo cargar la ficha.');
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchFicha();
  }, [fichaId]); // Se ejecuta cada vez que cambia el fichaId

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setError(null);
    setFieldErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableFicha(prevState => ({
      ...prevState,
      [name]: value,
    }));
    
    // Limpiar el error del campo si está siendo editado
    if (fieldErrors[name]) {
      setFieldErrors(prevErrors => {
        const { [name]: removed, ...rest } = prevErrors;
        return rest;
      });
    }
  };

  const handleSave = async () => {
    setIsProcessing(true);
    setError(null);

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
      (field) => !editableFicha[field] || editableFicha[field].trim() === ""
    );

    if (emptyFields.length > 0) {
      const newFieldErrors = {};
      emptyFields.forEach((field) => {
        newFieldErrors[field] = "Este campo es obligatorio.";
      });
      setFieldErrors(newFieldErrors);
      setError(
        `Por favor, complete todos los campos requeridos: ${emptyFields
          .map((field) => field.replace('_', ' ').toUpperCase())
          .join(", ")}.`
      );
      setIsProcessing(false);
      return;
    } else {
      setFieldErrors({});
    }

    try {
      const isValid = await verifyToken();
      if (!isValid) {
        window.alert('Su sesión ha expirado. Por favor, inicie sesión nuevamente.');
        window.location.href = '/iniciar-sesion';
        return;
      }

      await updateFichaById(fichaId, editableFicha);
      setFicha(editableFicha);
      setIsEditing(false);
      alert('Ficha actualizada correctamente.');
      onUpdate();
    } catch (err) {
      console.error('Error al actualizar la ficha:', err);
      setError('No se pudo guardar la ficha. Inténtelo nuevamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('¿Estás seguro de eliminar esta ficha?')) return;

    setIsProcessing(true);
    setError(null);

    try {
      const isValid = await verifyToken();
      if (!isValid) {
        window.alert('Su sesión ha expirado. Por favor, inicie sesión nuevamente.');
        window.location.href = '/iniciar-sesion';
        return;
      }

      await deleteFichaById(fichaId);
      alert('Ficha eliminada correctamente.');
      onDelete();
    } catch (err) {
      console.error('Error al eliminar la ficha:', err);
      setError('No se pudo eliminar la ficha. Inténtelo nuevamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDiscard = () => {
    setEditableFicha(ficha);
    setIsEditing(false);
    setError(null);
    setFieldErrors({});
  };

  const formatDateTime = (dateTime) => {
    if (!dateTime) return { date: "Desconocido", time: "" };
    const date = new Date(dateTime);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString(),
    };
  };

  const created = ficha ? formatDateTime(ficha.fecha_creacion) : { date: "Desconocido", time: "" };
  const modified = ficha ? formatDateTime(ficha.fecha_modificacion) : { date: "Desconocido", time: "" };

  if (isLoading) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 mb-8 flex items-center justify-center">
        <div className="loader"></div> {/* Aquí puedes usar un spinner o cualquier indicador visual */}
        <p className="text-center text-gray-500 ml-2">Cargando ficha...</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Detalles de la Atención</h2>
        <button
          onClick={onClose}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4">
          Cerrar
        </button>
      </div>

      {error && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="space-y-6">
        <div className="mb-6">
          <p><strong>Creado por:</strong> {ficha?.creado_por_username || "Desconocido"}</p>
          <p><strong>Fecha:</strong> {created.date}</p>
          <p><strong>Hora:</strong> {created.time}</p>

          <p className="mt-4"><strong>Modificado por:</strong> {ficha?.modificado_por_username || "Desconocido"}</p>
          <p><strong>Fecha:</strong> {modified.date}</p>
          <p><strong>Hora:</strong> {modified.time}</p>
        </div>

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
            <div key={index} className="col-span-1">
              <label className="font-semibold block mb-1">{field.label}</label>
              <textarea
                name={field.name}
                value={editableFicha ? editableFicha[field.name] : ""}
                onChange={handleInputChange}
                readOnly={!isEditing}
                className={`w-full border rounded-md p-2 ${
                  fieldErrors[field.name] ? 'border-red-500 bg-red-50' : 'bg-gray-100'
                } ${isEditing ? 'bg-white' : ''} resize-none`}
                rows={3} // Ajusta para que las cajas se expandan verticalmente si el contenido crece
              />
              {fieldErrors[field.name] && (
                <p className="text-red-500 text-sm mt-1">{fieldErrors[field.name]}</p>
              )}
            </div>
          ))}
        </div>

        {/* Categoría Diagnóstico */}
        <h3 className="text-lg font-semibold mt-4">Categoría Diagnóstico</h3>
        <div className="w-full">
          <label className="font-semibold block mb-1">Diagnóstico</label>
          <textarea
            name="diagnostico"
            value={editableFicha ? editableFicha.diagnostico : ""}
            onChange={handleInputChange}
            readOnly={!isEditing}
            className={`w-full border rounded-md p-2 ${
              fieldErrors["diagnostico"] ? 'border-red-500 bg-red-50' : 'bg-gray-100'
            } ${isEditing ? 'bg-white' : ''} resize-none`}
            rows={3}
          />
          {fieldErrors["diagnostico"] && (
            <p className="text-red-500 text-sm mt-1">{fieldErrors["diagnostico"]}</p>
          )}
        </div>

        {/* Categoría Intervenciones */}
        <h3 className="text-lg font-semibold mt-4">Categoría Intervenciones</h3>
        <div className="w-full">
          <label className="font-semibold block mb-1">Intervenciones</label>
          <textarea
            name="intervenciones"
            value={editableFicha ? editableFicha.intervenciones : ""}
            onChange={handleInputChange}
            readOnly={!isEditing}
            className={`w-full border rounded-md p-2 ${
              fieldErrors["intervenciones"] ? 'border-red-500 bg-red-50' : 'bg-gray-100'
            } ${isEditing ? 'bg-white' : ''} resize-none`}
            rows={3}
          />
          {fieldErrors["intervenciones"] && (
            <p className="text-red-500 text-sm mt-1">{fieldErrors["intervenciones"]}</p>
          )}
        </div>

        {(userRole === 'Administrador' || userRole === 'Docente') && (
          <div className="flex justify-between mt-6">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  disabled={isProcessing}
                  className={`bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 ${
                    isProcessing ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isProcessing ? 'Guardando...' : 'Guardar'}
                </button>
                <button
                  onClick={handleDiscard}
                  disabled={isProcessing}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                >
                  Descartar
                </button>
              </>
            ) : (
              <button
                onClick={handleEditToggle}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Editar
              </button>
            )}
            <button
              onClick={handleDelete}
              disabled={isProcessing}
              className={`bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 ${
                isProcessing ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isProcessing ? 'Eliminando...' : 'Eliminar'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
