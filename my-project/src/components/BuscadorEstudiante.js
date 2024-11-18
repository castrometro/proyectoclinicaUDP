import React from 'react';

export default function BuscadorEstudiante({ estudiantes, onSelectStudent }) {
  return (
    <div className="bg-white border border-gray-300 rounded-md shadow-lg p-4 max-h-80 overflow-auto">
      <h2 className="text-lg font-semibold mb-4">Lista de Estudiantes</h2>
      <ul>
        {estudiantes.map((estudiante) => (
          <li
            key={estudiante.id}
            onClick={() => onSelectStudent(estudiante)}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{estudiante.first_name} {estudiante.last_name}</p>
              <p className="text-sm text-gray-600">{estudiante.email}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
