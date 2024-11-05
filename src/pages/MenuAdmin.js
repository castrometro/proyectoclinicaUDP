import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { ChevronRight } from 'lucide-react'

const AdminCard = ({ title, link }) => (
  <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between">
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    <a 
      href={link} 
      className="text-blue-600 hover:text-blue-800 flex items-center justify-end"
    >
      acceso
      <ChevronRight className="ml-1 h-5 w-5" />
    </a>
  </div>
)

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
      { text: "INICIO", link: "/" },
    ],
    circleButton: {
      text: "CERRAR SESIÓN",
      onClick: handleLogout
    }
  }

  const adminCards = [
    { title: "Gestión de Pacientes", link: "/gestion-pacientes" },
    { title: "Gestión de Docentes", link: "/gestion-docentes" },
    { title: "Gestión de Estudiantes", link: "/gestion-estudiantes" },
    { title: "Gestión de Administrador", link: "/gestion-administrador" },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Header {...headerProps} />
      <main className="flex-grow">
        <div className="relative">
          <img
            src="/images/PanelAdmin.png"
            alt="Panel de Administración"
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 flex items-center h-96">
            <h1 className="font-arizona font-bold text-4xl mb-4 md:mb-0 md:w-1/3 ml-40">
              Panel de<br />administracion
            </h1>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {adminCards.map((card, index) => (
              <AdminCard key={index} {...card} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
