import React from 'react'
import { Plus } from 'lucide-react'

export default function CrearPacienteButton({ onClick }) {
  return (
    <button 
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center"
      onClick={onClick}
    >
      <Plus size={20} className="mr-2" />
      Crear Paciente
    </button>
  )
}