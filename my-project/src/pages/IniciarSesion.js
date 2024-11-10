// IniciarSesion.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Login from '../components/Login';

export default function IniciarSesion() {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/admin-menu'); // Redirige al menú de administración si el login es exitoso
  };

  const headerProps = {
    logoSrc: "/images/FacsyoLogo.png",
    logoAlt: "UDP Logo",
    menuItems: [],
    circleButton: {
      text: "Volver a Inicio",
      link: "/"
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header {...headerProps} />
      <main className="flex-grow relative">
        <img src="/images/FacsyoGris.png" alt="Facultad de Salud y Odontología UDP" className="w-full h-full object-cover filter grayscale" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <img src="/images/FacsyoLogo.png" alt="UDP Logo" className="h-12 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-center mb-6">Iniciar sesión</h2>
            <Login onSuccess={handleSuccess} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
