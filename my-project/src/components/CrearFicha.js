// CrearFicha.js
import React, { useState } from 'react';
import { saveFichaClinica } from '../utils/fichasService';

export default function CrearFicha({ rut, onClose }) {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFichaData({ ...fichaData, [name]: value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await saveFichaClinica(fichaData);
        // Verificar que la respuesta fue de creación exitosa
      alert("Ficha creada exitosamente");
      onClose(); // Cierra el formulario después de crear la ficha
      window.location.reload(); // Recargar la página para mostrar la nueva ficha
    }catch (error) {
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      if (error.response.status === 401) {
        alert("No tienes autorización para crear una ficha. Por favor, inicia sesión.");
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
  }
};


  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Nueva Ficha</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">Cerrar</button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Categoría Valoración */}
        <h3 className="text-lg font-semibold mt-4">Categoría Valoración</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-semibold">Factores</label>
            <textarea name="factores" value={fichaData.factores} onChange={handleChange} className="border rounded-md p-2 w-full" placeholder="Factores"></textarea>
          </div>
          <div>
            <label className="font-semibold">Anamnesis</label>
            <textarea name="anamnesis" value={fichaData.anamnesis} onChange={handleChange} className="border rounded-md p-2 w-full" placeholder="Anamnesis"></textarea>
          </div>
          <div>
            <label className="font-semibold">Motivo Consulta</label>
            <textarea name="motivo_consulta" value={fichaData.motivo_consulta} onChange={handleChange} className="border rounded-md p-2 w-full" placeholder="Motivo Consulta"></textarea>
          </div>
          <div>
            <label className="font-semibold">RAU Necesidades</label>
            <textarea name="rau_necesidades" value={fichaData.rau_necesidades} onChange={handleChange} className="border rounded-md p-2 w-full" placeholder="RAU Necesidades"></textarea>
          </div>
          <div>
            <label className="font-semibold">Examen Físico</label>
            <textarea name="examen_fisico" value={fichaData.examen_fisico} onChange={handleChange} className="border rounded-md p-2 w-full" placeholder="Examen Físico"></textarea>
          </div>
          <div>
            <label className="font-semibold">Instrumentos Aplicados</label>
            <textarea name="instrumentos_aplicados" value={fichaData.instrumentos_aplicados} onChange={handleChange} className="border rounded-md p-2 w-full" placeholder="Instrumentos Aplicados"></textarea>
          </div>
        </div>

        {/* Categoría Diagnóstico */}
        <h3 className="text-lg font-semibold mt-4">Categoría Diagnóstico</h3>
        <div>
          <label className="font-semibold">Diagnóstico</label>
          <textarea name="diagnostico" value={fichaData.diagnostico} onChange={handleChange} className="border rounded-md p-2 w-full" placeholder="Diagnóstico"></textarea>
        </div>

        {/* Categoría Intervenciones */}
        <h3 className="text-lg font-semibold mt-4">Categoría Intervenciones</h3>
        <div>
          <label className="font-semibold">Intervenciones</label>
          <textarea name="intervenciones" value={fichaData.intervenciones} onChange={handleChange} className="border rounded-md p-2 w-full" placeholder="Intervenciones"></textarea>
        </div>
        

        {/* Botones de acción */}
        <div className="flex justify-end space-x-4 mt-6">
          <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700">Cancelar</button>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">Guardar Ficha</button>
        </div>
      </form>
    </div>
  );
}
