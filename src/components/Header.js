import React from 'react'
import { Link } from 'react-router-dom'

export default function Header({ menuItems, logoSrc, logoAlt }) {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <img src={logoSrc} alt={logoAlt} className="h-12" />
        <nav>
          <ul className="flex space-x-4">
            {menuItems.map((item, index) => (
              <li key={index}>
                {item.onClick ? (
                  <button 
                    onClick={item.onClick} 
                    className="hover:text-blue-300"
                  >
                    {item.text}
                  </button>
                ) : (
                  <Link 
                    to={item.link} 
                    className="hover:text-blue-300"
                  >
                    {item.text}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}