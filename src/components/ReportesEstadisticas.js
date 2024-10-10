import React from 'react'

const data = [
  { name: 'Ene', estudiantes: 400, docentes: 240, atenciones: 240 },
  { name: 'Feb', estudiantes: 300, docentes: 139, atenciones: 221 },
  { name: 'Mar', estudiantes: 200, docentes: 980, atenciones: 229 },
  { name: 'Abr', estudiantes: 278, docentes: 390, atenciones: 200 },
  { name: 'May', estudiantes: 189, docentes: 480, atenciones: 218 },
  { name: 'Jun', estudiantes: 239, docentes: 380, atenciones: 250 },
]

const maxValue = Math.max(...data.flatMap(item => [item.estudiantes, item.docentes, item.atenciones]))

export default function ReportesEstadisticas() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Reportes y Estadísticas</h2>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Estadísticas Generales</h3>
        <div className="w-full h-64 bg-white p-4 border border-gray-200 rounded-lg">
          <div className="flex h-full items-end">
            {data.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full flex justify-around">
                  <div className="w-4 bg-blue-500" style={{ height: `${(item.estudiantes / maxValue) * 100}%` }}></div>
                  <div className="w-4 bg-green-500" style={{ height: `${(item.docentes / maxValue) * 100}%` }}></div>
                  <div className="w-4 bg-yellow-500" style={{ height: `${(item.atenciones / maxValue) * 100}%` }}></div>
                </div>
                <span className="text-xs mt-1">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-2">
          <div className="flex items-center mr-4">
            <div className="w-4 h-4 bg-blue-500 mr-1"></div>
            <span className="text-sm">Estudiantes</span>
          </div>
          <div className="flex items-center mr-4">
            <div className="w-4 h-4 bg-green-500 mr-1"></div>
            <span className="text-sm">Docentes</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-yellow-500 mr-1"></div>
            <span className="text-sm">Atenciones</span>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">Reportes Disponibles</h3>
        <ul className="list-disc pl-5">
          <li className="mb-2">
            <a href="#" className="text-blue-600 hover:text-blue-800">
              Reporte de Estudiantes Activos
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="text-blue-600 hover:text-blue-800">
              Reporte de Atenciones por Mes
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="text-blue-600 hover:text-blue-800">
              Reporte de Rendimiento de Docentes
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="text-blue-600 hover:text-blue-800">
              Reporte de Uso del Sistema
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}