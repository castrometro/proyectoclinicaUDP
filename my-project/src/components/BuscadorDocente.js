import React from 'react';

export default function BuscadorDocente({ docentes, onSelectTeacher }) {
  return (
    <div className="bg-white border border-gray-300 rounded-md shadow-lg p-4 max-h-80 overflow-auto">
      <h2 className="text-lg font-semibold mb-4">Lista de Docentes</h2>
      <ul>
        {docentes.map((docente) => (
          <li
            key={docente.id}
            onClick={() => onSelectTeacher(docente)}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{docente.first_name} {docente.last_name}</p>
              <p className="text-sm text-gray-600">{docente.email}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
