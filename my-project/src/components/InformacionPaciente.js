import React from 'react'
import { Link } from 'react-router-dom'
import { ExternalLink, Mail, Phone, User, CreditCard, Calendar } from 'lucide-react'

export default function InformacionPaciente({ selectedPatient }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Información del Paciente</h2>
      {selectedPatient ? (
        <div>
          <div className="flex justify-between items-center mb-4">
          
            <p className="text-lg font-medium"> {selectedPatient.nombre} {selectedPatient.apellido} </p>
            <Link 
              to={`/ficha-paciente/${selectedPatient.rut}`}
              className="text-blue-500 hover:text-blue-600 flex items-center"
            >
              Ver ficha completa
              <ExternalLink size={16} className="ml-1" />
            </Link>
          </div>
          <div className="space-y-2">
            <p className="flex items-center">
              <User size={16} className="mr-2 text-gray-500" />
              <span className="font-semibold mr-2">RUT:</span> {selectedPatient.rut}
            </p>
            <p className="flex items-center">
              <Calendar size={16} className="mr-2 text-gray-500" />
              <span className="font-semibold mr-2">Edad:</span> {selectedPatient.edad} años
            </p>
            <p className="flex items-center">
              <Mail size={16} className="mr-2 text-gray-500" />
              <span className="font-semibold mr-2">Correo:</span> {selectedPatient.correo}
            </p>
            <p className="flex items-center">
              <Phone size={16} className="mr-2 text-gray-500" />
              <span className="font-semibold mr-2">Teléfono:</span> {selectedPatient.numero_telefono}
            </p>
            <p className="flex items-center">
              <CreditCard size={16} className="mr-2 text-gray-500" />
              <span className="font-semibold mr-2">Previsión:</span> {selectedPatient.prevision}
            </p>
          </div>
          {/* Comentado: Sección de agenda
          <div className="mt-4">
            <h3 className="text-md font-semibold mb-2">Próxima cita:</h3>
            <div className="flex items-center">
              <Calendar size={20} className="mr-2 text-blue-500" />
              <span>{selectedPatient.hora}</span>
            </div>
          </div>
          */}
        </div>
      ) : (
        <p>Seleccione un paciente para ver su información.</p>
      )}
    </div>
  )
}