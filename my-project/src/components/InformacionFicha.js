// InformacionFicha.js
import React, { useState, useEffect } from 'react';
import { getFichaById } from '../utils/fichasService';

export default function InformacionFicha({ fichaId, onClose }) {
  const [ficha, setFicha] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Verificar que haya un ID válido antes de proceder
    if (!fichaId) {
      setError("ID de ficha inválido.");
      setIsLoading(false);
      return;
    }

    // Función para cargar la ficha por ID
    const fetchFicha = async () => {
      setIsLoading(true); // Activar carga al inicio de la llamada
      try {
        const data = await getFichaById(fichaId);
        if (data) {
          setFicha(data); // Establecer los datos de la ficha si están disponibles
          setError(null); // Restablecer cualquier error anterior
        } else {
          setError("No se pudo cargar la ficha.");
        }
      } catch (err) {
        setError("Error al cargar la ficha.");
      } finally {
        setIsLoading(false); // Asegurarse de que la carga se detenga
      }
    };

    fetchFicha();
  }, [fichaId]);

  if (isLoading) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <p className="text-center text-gray-500">Cargando ficha...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <p className="text-center text-red-500">{error}</p>
        <button
          onClick={onClose}
          className="text-blue-500 hover:text-blue-700 mt-4"
        >
          Cerrar
        </button>
      </div>
    );
  }

  if (!ficha) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <p className="text-center text-gray-500">No se encontró la ficha.</p>
        <button
          onClick={onClose}
          className="text-blue-500 hover:text-blue-700 mt-4"
        >
          Cerrar
        </button>
      </div>
    );
  }

  // Función para formatear fecha y hora
  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();
    return { date: formattedDate, time: formattedTime };
  };

  const created = formatDateTime(ficha.fecha_creacion);
  const modified = formatDateTime(ficha.fecha_modificacion);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Detalles de la Atención</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          Cerrar
        </button>
      </div>
      <div className="space-y-6">
        {/* Categoría Valoración */}
        <h3 className="text-lg font-semibold mt-4">Categoría Valoración</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-semibold">Factores</label>
            <p className="border rounded-md p-2 bg-gray-100">{ficha.factores || "Sin información"}</p>
          </div>
          <div>
            <label className="font-semibold">Anamnesis</label>
            <p className="border rounded-md p-2 bg-gray-100">{ficha.anamnesis || "Sin información"}</p>
          </div>
          <div>
            <label className="font-semibold">Motivo Consulta</label>
            <p className="border rounded-md p-2 bg-gray-100">{ficha.motivo_consulta || "Sin información"}</p>
          </div>
          <div>
            <label className="font-semibold">RAU Necesidades</label>
            <p className="border rounded-md p-2 bg-gray-100">{ficha.rau_necesidades || "Sin información"}</p>
          </div>
          <div>
            <label className="font-semibold">Examen Físico</label>
            <p className="border rounded-md p-2 bg-gray-100">{ficha.examen_fisico || "Sin información"}</p>
          </div>
          <div>
            <label className="font-semibold">Instrumentos Aplicados</label>
            <p className="border rounded-md p-2 bg-gray-100">{ficha.instrumentos_aplicados || "Sin información"}</p>
          </div>
        </div>

        {/* Categoría Diagnóstico */}
        <h3 className="text-lg font-semibold mt-4">Categoría Diagnóstico</h3>
        <div>
          <label className="font-semibold">Diagnóstico</label>
          <p className="border rounded-md p-2 bg-gray-100">{ficha.diagnostico || "Sin información"}</p>
        </div>

        {/* Categoría Intervenciones */}
        <h3 className="text-lg font-semibold mt-4">Categoría Intervenciones</h3>
        <div>
          <label className="font-semibold">Intervenciones</label>
          <p className="border rounded-md p-2 bg-gray-100">{ficha.intervenciones || "Sin información"}</p>
        </div>

        {/* Información adicional */}
        <div className="mt-6">
          <p><strong>Creado por:</strong> {ficha.creado_por_username || "Desconocido"}</p>
          <p><strong>Fecha:</strong> {created.date}</p>
          <p><strong>Hora:</strong> {created.time}</p>

          <p className="mt-4"><strong>Modificado por:</strong> {ficha.modificado_por_username || "Desconocido"}</p>
          <p><strong>Fecha:</strong> {modified.date}</p>
          <p><strong>Hora:</strong> {modified.time}</p>
        </div>
      </div>
    </div>
  );
}
