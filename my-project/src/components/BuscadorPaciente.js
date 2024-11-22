import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { searchPacientes } from '../utils/pacientesService'; // Asegúrate de que esta función existe
import { verifyToken } from '../utils/authService'; // Importa la función de verificación
import { useNavigate } from 'react-router-dom';

export default function BuscadorPaciente({ onSelectPatient }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPacientes, setFilteredPacientes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearchClick = async () => {
    if (!searchTerm.trim()) return;

    setIsLoading(true);
    try {
      // Verifica el token antes de enviar la solicitud
      const isValid = await verifyToken(navigate);
      if (!isValid) return; // Si el token es inválido, no continúa

      const results = await searchPacientes(searchTerm);
      setFilteredPacientes(results);
    } catch (error) {
      console.error('Error buscando pacientes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (paciente) => {
    setSearchTerm(`${paciente.rut}`);
    setFilteredPacientes([]);
    onSelectPatient(paciente);
  };

  return (
    <div className="relative">
      <div className="flex items-center border border-gray-300 rounded-md">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por RUT, Nombre o Apellido"
          className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearchClick}
          className="flex items-center justify-center mr-3 text-gray-400 focus:outline-none"
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-500"></div>
          ) : (
            <Search size={20} />
          )}
        </button>
      </div>
      {filteredPacientes.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {filteredPacientes.map((paciente) => (
            <li
              key={paciente.rut}
              onClick={() => handleSelect(paciente)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {paciente.rut} - {paciente.nombre} {paciente.apellido}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
