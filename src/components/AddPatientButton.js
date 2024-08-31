import React from 'react'
import { PlusCircle } from 'lucide-react'

export default function AddPatientButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center"
    >
      <PlusCircle size={20} className="mr-2" />
      Agregar Paciente
    </button>
  )
}