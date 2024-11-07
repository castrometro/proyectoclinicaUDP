import React from 'react'
import { Mail, Phone, User, Calendar, GraduationCap } from 'lucide-react'

export default function InformacionEstudiante({ selectedStudent }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Información del Estudiante</h2>
      {selectedStudent ? (
        <div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-lg font-medium">{selectedStudent.nombre}</p>
          </div>
          <div className="space-y-2">
            <p className="flex items-center">
              <User size={16} className="mr-2 text-gray-500" />
              <span className="font-semibold mr-2">RUT:</span> {selectedStudent.rut}
            </p>
            <p className="flex items-center">
              <Calendar size={16} className="mr-2 text-gray-500" />
              <span className="font-semibold mr-2">Fecha de Nacimiento:</span> {selectedStudent.fechaNacimiento}
            </p>
            <p className="flex items-center">
              <GraduationCap size={16} className="mr-2 text-gray-500" />
              <span className="font-semibold mr-2">Carrera:</span> {selectedStudent.carrera}
            </p>
            <p className="flex items-center">
              <Mail size={16} className="mr-2 text-gray-500" />
              <span className="font-semibold mr-2">Correo:</span> {selectedStudent.correoElectronico}
            </p>
            <p className="flex items-center">
              <Phone size={16} className="mr-2 text-gray-500" />
              <span className="font-semibold mr-2">Teléfono:</span> {selectedStudent.telefono}
            </p>
          </div>
        </div>
      ) : (
        <p>Seleccione un estudiante para ver su información.</p>
      )}
    </div>
  )
}