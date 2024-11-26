// InformacionFicha.js
import React, { useState, useEffect } from 'react';
import { getFichaById, deleteFichaById, updateFichaById } from '../utils/fichasService';

export default function InformacionFicha({ fichaId, onClose, onDelete, onUpdate }) {
  const [ficha, setFicha] = useState(null);
  const [editableFicha, setEditableFicha] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const userRole = localStorage.getItem('userRole');

  useEffect(() => {
    const fetchFicha = async () => {
      setIsLoading(true);
      try {
        const data = await getFichaById(fichaId);
        setFicha(data);
        setEditableFicha(data); // Copia para edición
        setError(null);
      } catch (err) {
        setError("Error al cargar la ficha.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFicha();
  }, [fichaId]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableFicha(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await updateFichaById(fichaId, editableFicha);
      setFicha(editableFicha);
      setIsEditing(false);
      alert("Ficha actualizada correctamente.");
      onUpdate();
    } catch (err) {
      alert("Error al actualizar la ficha.");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de eliminar esta ficha?")) {
      try {
        await deleteFichaById(fichaId);
        onDelete();
        alert("Ficha eliminada correctamente.");
      } catch (err) {
        alert("Error al eliminar la ficha.");
      }
    }
  };

  const handleDiscard = () => {
    setEditableFicha(ficha);
    setIsEditing(false);
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
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <p className="text-center text-gray-500">Cargando ficha...</p>
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

      {error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
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
                  className={`w-full border rounded-md p-2 bg-gray-100 ${isEditing ? 'bg-white' : ''} resize-none`}
                  rows={3} // Ajusta para que las cajas se expandan verticalmente si el contenido crece
                />
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
              className={`w-full border rounded-md p-2 bg-gray-100 ${isEditing ? 'bg-white' : ''} resize-none`}
              rows={3}
            />
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
              className={`w-full border rounded-md p-2 bg-gray-100 ${isEditing ? 'bg-white' : ''} resize-none`}
              rows={3}
            />
          </div>

          {(userRole === 'Administrador' || userRole === 'Docente') && (
            <div className="flex justify-between mt-6">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700">
                    Guardar
                  </button>
                  <button
                    onClick={handleDiscard}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700">
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
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700">
                Eliminar Ficha
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
