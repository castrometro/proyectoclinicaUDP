import React from 'react'
import { ArrowRight } from 'lucide-react'

export default function HorizontalCard({ imagen, titulo, texto, color}) {
  return (
    <div className={`bg-white shadow-lg rounded-lg overflow-hidden my-8 ${color}`}>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3">
          <img 
            src={imagen} 
            alt={titulo} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="md:w-2/3 p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{titulo}</h2>
            <p className="text-gray-600 mb-4">
                {texto}
            </p>
          </div>
          <div className="flex justify-end">
            {/* <a 
              href="#" 
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
            >
              Más Información
              <ArrowRight className="ml-2 h-4 w-4" />
            </a> */}
          </div>
        </div>
      </div>
    </div>
  )
}
