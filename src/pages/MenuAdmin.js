import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import AdminCardGrid from '../components/AdminCardGrid'

export default function MenuAdmin() {
  const navigate = useNavigate()

  const handleLogout = () => {
    // Aquí iría la lógica de cierre de sesión
    console.log('Cerrando sesión...')
    navigate('/')
  }

  const headerProps = {
    logoSrc: "/images/FacsyoLogo.png",
    logoAlt: "UDP Logo",
    menuItems: [
      { text: "Inicio", link: "/" },
      { text: "Cerrar Sesión", onClick: handleLogout }
    ]
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header {...headerProps} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Panel de Administración</h1>
        <AdminCardGrid />
      </main>
    </div>
  )
}