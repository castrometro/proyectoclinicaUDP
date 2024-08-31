import React from 'react'
import Header from '../components/Header'
import GrayRectangle from '../components/GrayRectangle'
import LoginComponent from '../components/Login'

export default function IniciarSesion() {
  const headerProps = {
    logoSrc: "/images/FacsyoLogo.png",
    logoAlt: "UDP Logo",
    menuItems: [
      { text: "Volver al Inicio", link: "/" },
    ]
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header {...headerProps} />
      <main className="flex-grow flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <GrayRectangle className="w-full max-w-md">
          <LoginComponent />
        </GrayRectangle>
      </main>
    </div>
  )
}