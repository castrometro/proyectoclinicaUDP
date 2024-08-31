import React from 'react'

export default function GrayRectangle({ children, className = '' }) {
  return (
    <div className={`bg-gray-200 rounded-lg shadow-md p-6 ${className}`}>
      {children}
    </div>
  )
}