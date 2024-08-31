import React from 'react'
import { UserPlus } from 'lucide-react'

export default function CreateButton({ onClick }) {
  return (
    <button 
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
      onClick={onClick}
    >
      <UserPlus size={20} className="mr-2" />
      Crear Nuevo
    </button>
  )
}