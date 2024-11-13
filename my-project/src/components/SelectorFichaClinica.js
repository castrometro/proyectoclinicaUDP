// SelectorFichaClinica.js
import React, { useState } from 'react';

export default function SelectorFichaClinica({ fichas, onSelectFichaId }) {
  const [selectedFichaId, setSelectedFichaId] = useState('');

  const handleSelect = (e) => {
    const fichaId = e.target.value;
    setSelectedFichaId(fichaId);
    onSelectFichaId(fichaId); // Solo pasa el ID
  };

  return (
    <div className="relative">
      <select
        className="border border-gray-300 rounded-md p-2 w-full mb-4"
        value={selectedFichaId}
        onChange={handleSelect}
      >
        <option value="">Seleccione una ficha</option>
        {fichas.map((ficha) => (
          <option key={ficha.id} value={ficha.id}>
            {new Date(ficha.fecha_creacion).toLocaleDateString()} - {ficha.creado_por_username || "Desconocido"}
          </option>
        ))}
      </select>
    </div>
  );
}

