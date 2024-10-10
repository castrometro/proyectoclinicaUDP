import React, { useState } from 'react'
import { Search, Edit, Trash2 } from 'lucide-react'

export default function GestionUsuarios() {
  const [users, setUsers] = useState([
    { id: 1, name: 'Juan Pérez', email: 'juan@udp.cl', role: 'Administrador' },
    { id: 2, name: 'María González', email: 'maria@udp.cl', role: 'Docente' },
    { id: 3, name: 'Carlos Rodríguez', email: 'carlos@udp.cl', role: 'Estudiante' },
  ])

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Gestión de Usuarios</h2>
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar usuarios..."
            className="w-full px-4 py-2 border rounded-md pr-10"
          />
          <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
        </div>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Nombre
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Rol
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button className="text-blue-600 hover:text-blue-800 mr-2">
                  <Edit size={18} />
                </button>
                <button className="text-red-600 hover:text-red-800">
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}