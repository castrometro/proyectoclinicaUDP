import React from 'react'
import { Plus } from 'lucide-react'

export default function CrearEstudianteButton({ onClick }) {
  return (
    <button 
      className="bg-aqua hover:bg-blue-600 text-white text-lg font-worksans font-normal py-2 px-4 rounded flex items-center font"
      onClick={onClick}
    >
      <Plus size={20} className="mr-2" />
      Crear Estudiante
    </button>
  )
}