import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import AdministradorDashboard from '../components/AdministradorDashboard'
import GestionUsuarios from '../components/GestionUsuarios'
import ConfiguracionSistema from '../components/ConfiguracionSistema'
import ReportesEstadisticas from '../components/ReportesEstadisticas'

export default function GestionAdministrador() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const headerProps = {
    logoSrc: "/images/FacsyoLogo.png",
    logoAlt: "UDP Logo",
    menuItems: [
      { text: "Inicio", link: "/" },
      { text: "Panel Admin", link: "/admin-menu" },
      { text: "Cerrar Sesión", link: "/logout" }
    ]
  }

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdministradorDashboard />
      case 'usuarios':
        return <GestionUsuarios />
      case 'configuracion':
        return <ConfiguracionSistema />
      case 'reportes':
        return <ReportesEstadisticas />
      default:
        return <AdministradorDashboard />
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header {...headerProps} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Panel de Administración</h1>
        
        <div className="flex mb-6">
          <button
            className={`px-4 py-2 mr-2 rounded-t-lg ${activeTab === 'dashboard' ? 'bg-white text-blue-600' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button
            className={`px-4 py-2 mr-2 rounded-t-lg ${activeTab === 'usuarios' ? 'bg-white text-blue-600' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('usuarios')}
          >
            Gestión de Usuarios
          </button>
          <button
            className={`px-4 py-2 mr-2 rounded-t-lg ${activeTab === 'configuracion' ? 'bg-white text-blue-600' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('configuracion')}
          >
            Configuración del Sistema
          </button>
          <button
            className={`px-4 py-2 rounded-t-lg ${activeTab === 'reportes' ? 'bg-white text-blue-600' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('reportes')}
          >
            Reportes y Estadísticas
          </button>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          {renderActiveComponent()}
        </div>
      </main>
    </div>
  )
}