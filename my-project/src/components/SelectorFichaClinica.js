// SelectorFichaClinica.js
import React, { useState, useEffect } from 'react';
import { getFichasClinicas } from '../utils/fichasService';

export default function SelectorFichaClinica({ rut , onSelectFichaId }) {
  const [fichas, setFichas] = useState([]);
  const [selectedFichaId, setSelectedFichaId] = useState(null);

  useEffect(() => {
    const fetchFichas = async () => {
      setFichas([]); // Limpiar fichas antes de cargar nuevas
      setSelectedFichaId(null); // Limpiar selección al cambiar el rut

      if (rut) {
        const data = await getFichasClinicas(rut); // Obtener fichas usando el rut
        setFichas(data);
        console.log('data:',data);
      }
    };

    fetchFichas();
  }, [rut]);

  const handleSelect = (fichaId) => {
    setSelectedFichaId(fichaId);
    onSelectFichaId(fichaId); // Pasa solo el ID seleccionado al componente padre
  };

  return (
    <div className="relative">
      <select
        className="border border-gray-300 rounded-md p-2 w-full mb-4"
        value={selectedFichaId || ''}
        onChange={(e) => handleSelect(e.target.value)}
      >
        <option value="">Seleccione una ficha</option>
        {fichas.length > 0 ? (
          fichas.map((ficha) => (
            <option key={ficha.id} value={ficha.id}>
              {`${new Date(ficha.fecha_creacion).toLocaleDateString()} - ${new Date(ficha.fecha_creacion).toLocaleTimeString()} - ${ficha.creado_por_username}`}
            </option>
          ))
        ) : (
          <option disabled>No hay fichas disponibles</option>
        )}
      </select>
    </div>
  );
}
