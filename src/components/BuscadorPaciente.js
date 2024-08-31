import React, { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { getPacientes } from '../utils/pacientesService'

export default function BuscadorPaciente({ onSelectPatient }) {
  const [pacientes, setPacientes] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredPacientes, setFilteredPacientes] = useState([])

  useEffect(() => {
    setPacientes(getPacientes())
  }, [])

  useEffect(() => {
    const filtered = pacientes.filter(paciente => 
      paciente.rut.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredPacientes(filtered)
  }, [searchTerm, pacientes])

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
          placeholder="Buscar por RUT"
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
              {paciente.rut} - {paciente.nombre}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}