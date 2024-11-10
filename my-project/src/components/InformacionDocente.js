import React from 'react';
import { Mail, Phone, User, Briefcase, GraduationCap } from 'lucide-react';

export default function InformacionDocente({ selectedTeacher }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Información del Docente</h2>
      {selectedTeacher ? (
        <div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-lg font-medium">{selectedTeacher.first_name} {selectedTeacher.last_name}</p>
          </div>
          <div className="space-y-2">
            <p className="flex items-center">
              <User size={16} className="mr-2 text-gray-500" />
              <span className="font-semibold mr-2">Correo:</span> {selectedTeacher.email}
            </p>
            <p className="flex items-center">
              <GraduationCap size={16} className="mr-2 text-gray-500" />
              <span className="font-semibold mr-2">Usuario</span> {selectedTeacher.username}
            </p>
            <p className="flex items-center">
              <Mail size={16} className="mr-2 text-gray-500" />
              <span className="font-semibold mr-2">Contraseña Asignada:</span> {selectedTeacher.email}
            </p>
            {/* <p className="flex items-center">
              <Phone size={16} className="mr-2 text-gray-500" />
              <span className="font-semibold mr-2">Teléfono:</span> {selectedTeacher.telefono}
            </p>
            <p className="flex items-center">
              <Briefcase size={16} className="mr-2 text-gray-500" />
              <span className="font-semibold mr-2">Cargo:</span> {selectedTeacher.cargo}
            </p> */}
          </div>
        </div>
      ) : (
        <p>Seleccione un docente para ver su información.</p>
      )}
    </div>
  );
}
