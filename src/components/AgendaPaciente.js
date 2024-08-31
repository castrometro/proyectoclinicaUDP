import React from 'react'
import { Link } from 'react-router-dom'
import { Calendar, ExternalLink } from 'lucide-react'

export default function AgendaPaciente({ selectedPatient }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Agenda del Paciente</h2>
      {selectedPatient ? (
        <div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-lg font-medium">{selectedPatient.nombre}</p>
            <Link 
              to={`/ficha-paciente/${selectedPatient.rut}`}
              className="text-blue-500 hover:text-blue-600 flex items-center"
            >
            Ver ficha completa
            <ExternalLink size={16} className="ml-1" />
            </Link>
          </div>
          <p>RUT: {selectedPatient.rut}</p>
          <p>Edad: {selectedPatient.edad}</p>
          <div className="mt-4">
            <h3 className="text-md font-semibold mb-2">Próxima cita:</h3>
            <div className="flex items-center">
              <Calendar size={20} className="mr-2 text-blue-500" />
              <span>{selectedPatient.hora}</span>
            </div>
          </div>
        </div>
      ) : (
        <p>Seleccione un paciente para ver su agenda.</p>
      )}
    </div>
  )
}