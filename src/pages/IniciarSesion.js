import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Eye, EyeOff } from 'lucide-react'

export default function IniciarSesion() {
  const [showPassword, setShowPassword] = React.useState(false)

  const headerProps = {
    logoSrc: "/images/FacsyoLogo.png",
    logoAlt: "UDP Logo",
    menuItems: [],
    circleButton: {
      text: "Volver a Inicio",
      link: "/"
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header {...headerProps} />
      <main className="flex-grow relative">
        <img
          src="/images/FacsyoGris.png"
          alt="Facultad de Salud y Odontología UDP"
          className="w-full h-full object-cover filter grayscale"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <img
              src="/images/FacsyoLogo.png"
              alt="UDP Logo"
              className="h-12 mx-auto mb-6"
            />
            <h2 className="text-2xl font-bold text-center mb-6">Iniciar sesión</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre de usuario
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4 relative">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Contraseña
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-8 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    name="remember"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
                    Recordarme
                  </label>
                </div>
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  ¿Olvidó su contraseña?
                </a>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                INICIAR SESIÓN
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}