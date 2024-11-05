import React from 'react'
import { ChevronRight } from 'lucide-react'

export default function Card({ title, text, link }) {
  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start">
          <h2 className="font-arizona font-light text-4xl mb-4 md:mb-0 md:w-1/3">{title}</h2>
          <div className="md:w-2/3">
            <p className="font-worksans font-normal text-base mb-4">{text}</p>
            <a 
              href={link} 
              className="inline-flex items-center font-worksans font-medium text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              ver más información
              <ChevronRight className="ml-1 h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8">
        <hr className="border-t border-gray-300" />
      </div>
    </div>
  )
}