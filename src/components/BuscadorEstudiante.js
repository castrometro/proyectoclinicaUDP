import React, { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { getEstudiantes } from '../utils/estudiantesService'

export default function BuscadorEstudiante({ onSelectStudent }) {
  const [estudiantes, setEstudiantes] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredEstudiantes, setFilteredEstudiantes] = useState([])

  useEffect(() => {
    setEstudiantes(getEstudiantes())
  }, [])

  useEffect(() => {
    const filtered = estudiantes.filter(estudiante => 
      estudiante.rut.toLowerCase().includes(searchTerm.toLowerCase()) ||
      estudiante.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredEstudiantes(filtered)
  }, [searchTerm, estudiantes])

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleSelect = (estudiante) => {
    setSearchTerm('')
    setFilteredEstudiantes([])
    onSelectStudent(estudiante)
  }

  return (
    <div className="relative">
      <div className="flex items-center border border-gray-300 rounded-md">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Buscar por RUT o nombre"
          className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search size={20} className="mr-3 text-gray-400" />
      </div>
      {filteredEstudiantes.length > 0 && searchTerm && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {filteredEstudiantes.map((estudiante) => (
            <li
              key={estudiante.id}
              onClick={() => handleSelect(estudiante)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {estudiante.rut} - {estudiante.nombre}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}