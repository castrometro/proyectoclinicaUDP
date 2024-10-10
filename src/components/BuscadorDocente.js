import React, { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { getDocentes } from '../utils/docentesService'

export default function BuscadorDocente({ onSelectTeacher }) {
  const [docentes, setDocentes] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredDocentes, setFilteredDocentes] = useState([])

  useEffect(() => {
    setDocentes(getDocentes())
  }, [])

  useEffect(() => {
    const filtered = docentes.filter(docente => 
      docente.rut.toLowerCase().includes(searchTerm.toLowerCase()) ||
      docente.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredDocentes(filtered)
  }, [searchTerm, docentes])

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleSelect = (docente) => {
    setSearchTerm('')
    setFilteredDocentes([])
    onSelectTeacher(docente)
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
      {filteredDocentes.length > 0 && searchTerm && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {filteredDocentes.map((docente) => (
            <li
              key={docente.id}
              onClick={() => handleSelect(docente)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {docente.rut} - {docente.nombre}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}