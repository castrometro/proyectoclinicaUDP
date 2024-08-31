import React from 'react'
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Contacto</h3>
            <p>Av. Ejército 233, Santiago</p>
            <p>Teléfono: +56 2 2676 8000</p>
            <p>Email: admision@udp.cl</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Admisión</a></li>
              <li><a href="#" className="hover:underline">Biblioteca</a></li>
              <li><a href="#" className="hover:underline">Campus Virtual</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Síguenos</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-400"><Facebook /></a>
              <a href="#" className="hover:text-blue-400"><Twitter /></a>
              <a href="#" className="hover:text-blue-400"><Instagram /></a>
              <a href="#" className="hover:text-blue-400"><Youtube /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2023 Universidad Diego Portales. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}