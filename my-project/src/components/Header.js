import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Header({ menuItems, logoSrc, logoAlt, circleButton }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm py-4 flex items-center">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src={logoSrc} alt={logoAlt} className="h-8 sm:h-10" />
          </div>
          <div className="flex items-center space-x-4 sm:space-x-6">
            <nav className="hidden md:block">
              <ul className="flex space-x-4 lg:space-x-6">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    {item.onClick ? (
                      <button 
                        onClick={item.onClick} 
                        className="font-worksans font-medium text-xs lg:text-sm uppercase hover:text-blue-600 transition duration-300"
                      >
                        {item.text}
                      </button>
                    ) : (
                      <Link 
                        to={item.link} 
                        className="font-worksans font-medium text-xs lg:text-sm uppercase hover:text-blue-600 transition duration-300"
                      >
                        {item.text}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
            {circleButton && (
              circleButton.onClick ? (
                <button
                  onClick={circleButton.onClick} 
                  className="hidden md:block font-worksans font-medium text-xs lg:text-sm uppercase border border-black rounded-full px-3 py-1 hover:bg-black hover:text-white transition duration-300"
                >
                  {circleButton.text}
                </button>
              ) : (
                <Link
                  to={circleButton.link} 
                  className="hidden md:block font-worksans font-medium text-xs lg:text-sm uppercase border border-black rounded-full px-3 py-1 hover:bg-black hover:text-white transition duration-300"
                >
                  {circleButton.text}
                </Link>
              )
            )}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <nav className="mt-4 md:hidden">
            <ul className="flex flex-col space-y-2">
              {menuItems.map((item, index) => (
                <li key={index}>
                  {item.onClick ? (
                    <button 
                      onClick={() => {
                        item.onClick();
                        setIsMenuOpen(false);
                      }} 
                      className="font-worksans font-medium text-xs uppercase hover:text-blue-600 transition duration-300"
                    >
                      {item.text}
                    </button>
                  ) : (
                    <Link 
                      to={item.link} 
                      className="font-worksans font-medium text-xs uppercase hover:text-blue-600 transition duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.text}
                    </Link>
                  )}
                </li>
              ))}
              {circleButton && (
                <li>
                  {circleButton.onClick ? (
                    <button 
                      onClick={() => {
                        circleButton.onClick();
                        setIsMenuOpen(false);
                      }} 
                      className="font-worksans font-medium text-xs uppercase hover:text-blue-600 transition duration-300"
                    >
                      {circleButton.text}
                    </button>
                  ) : (
                    <Link 
                      to={circleButton.link} 
                      className="font-worksans font-medium text-xs uppercase hover:text-blue-600 transition duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {circleButton.text}
                    </Link>
                  )}
                </li>
              )}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
