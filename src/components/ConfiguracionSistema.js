import React from 'react'

export default function ConfiguracionSistema() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Configuración del Sistema</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="siteName" className="block text-sm font-medium text-gray-700">
            Nombre del Sitio
          </label>
          <input
            type="text"
            id="siteName"
            name="siteName"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            defaultValue="Salud Odontología UDP"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="adminEmail" className="block text-sm font-medium text-gray-700">
            Email del Administrador
          </label>
          <input
            type="email"
            id="adminEmail"
            name="adminEmail"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            defaultValue="admin@udp.cl"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="language" className="block text-sm font-medium text-gray-700">
            Idioma del Sistema
          </label>
          <select
            id="language"
            name="language"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="es">Español</option>
            <option value="en">English</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="maintenanceMode" className="flex items-center">
            <input
              type="checkbox"
              id="maintenanceMode"
              name="maintenanceMode"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">Activar Modo de Mantenimiento</span>
          </label>
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Guardar Configuración
          </button>
        </div>
      </form>
    </div>
  )
}