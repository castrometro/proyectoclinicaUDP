import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ChevronRight } from 'lucide-react';
import { getMenuOptions } from '../utils/menuService';
import { verifyToken } from '../utils/authService';

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
);

export default function MenuAdmin() {
  const navigate = useNavigate();
  const [menuOptions, setMenuOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const hasVerified = useRef(false); // Evitar múltiples verificaciones

  const handleLogout = () => {
    console.log('Cerrando sesión...');
    localStorage.removeItem('token');
    navigate('/iniciar-sesion');
  };

  const headerProps = {
    logoSrc: "/images/FacsyoLogo.png",
    logoAlt: "UDP Logo",
    menuItems: [{ text: "Inicio", link: "/" }],
    circleButton: {
      text: "Cerrar Sesión",
      onClick: handleLogout,
    },
  };

  useEffect(() => {
    const fetchMenu = async () => {
      if (!hasVerified.current) {
        const isValid = await verifyToken(navigate);
        if (isValid) {
          hasVerified.current = true;
          try {
            const options = await getMenuOptions();
            setMenuOptions(options);
          } catch (error) {
            console.error('Error al obtener las opciones de menú:', error);
            window.alert('Hubo un problema al obtener las opciones de menú.');
          }
        }
      }
      setIsLoading(false); // Finaliza la carga
    };

    fetchMenu();
  }, [navigate]);

  const adminCards = [
    { title: "Gestión de Pacientes", link: "/gestion-pacientes" },
    { title: "Gestión de Docentes", link: "/gestion-docentes" },
    { title: "Gestión de Estudiantes", link: "/gestion-estudiantes" },
    { title: "Gestión de Administrador", link: "/gestion-administrador" },
  ];

  const filteredAdminCards = adminCards.filter(card =>
    menuOptions.includes(card.title)
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header {...headerProps} />
      <main className="flex-grow relative">
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
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <svg
                className="animate-spin h-10 w-10 text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredAdminCards.map((card, index) => (
                <AdminCard key={index} {...card} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
