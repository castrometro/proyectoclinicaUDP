import React, { useState, useEffect } from 'react'
import { Search } from 'lucide-react'

export default function BuscadorPaciente({ pacientes, onSelectPatient }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredPacientes, setFilteredPacientes] = useState([])

  useEffect(() => {
    // Actualiza `filteredPacientes` cada vez que cambian `pacientes` o `searchTerm`
    const filtered = pacientes.filter(paciente =>
      paciente.rut.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paciente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || // Opcional: Buscar también por nombre
      paciente.apellido.toLowerCase().includes(searchTerm.toLowerCase())  // Opcional: Buscar también por apellido
    )
    setFilteredPacientes(filtered)
  }, [searchTerm, pacientes])  // Dependencias: `searchTerm` y `pacientes`

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleSelect = (paciente) => {
    setSearchTerm(paciente.rut)
    setFilteredPacientes([])
    onSelectPatient(paciente)
  }

  return (
    <div className="relative">
      <div className="flex items-center border border-gray-300 rounded-md">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Buscar por RUT, Nombre o Apellido"
          className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search size={20} className="mr-3 text-gray-400" />
      </div>
      {filteredPacientes.length > 0 && searchTerm && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {filteredPacientes.map((paciente) => (
            <li
              key={paciente.id}
              onClick={() => handleSelect(paciente)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {paciente.rut} - {paciente.nombre} {paciente.apellido}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
