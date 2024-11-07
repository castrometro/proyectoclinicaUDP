import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminCard({ title, icon: Icon, link }) {
  return (
    <Link 
      to={link}
      className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer block"
    >
      <div className="flex items-center justify-center mb-4">
        <Icon className="w-12 h-12 text-blue-600" />
      </div>
      <h3 className="text-xl font-semibold text-center text-gray-800">{title}</h3>
    </Link>
  )
}