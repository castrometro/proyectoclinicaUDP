// MenuAdmin.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ChevronRight } from 'lucide-react';
import { getMenuOptions } from '../utils/menuService';

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

  // Función para cerrar sesión
  const handleLogout = () => {
    console.log('Cerrando sesión...');
    localStorage.removeItem('token'); // Elimina el token del almacenamiento local
    navigate('/iniciar-sesion'); // Redirige a la página de inicio de sesión
  };

  // Propiedades del encabezado
  const headerProps = {
    logoSrc: "/images/FacsyoLogo.png",
    logoAlt: "UDP Logo",
    menuItems: [{ text: "Inicio", link: "/" }],
    circleButton: {
      text: "Cerrar Sesión",
      onClick: handleLogout
    }
  };

  // Carga las opciones de menú desde el backend cuando el componente se monta
  useEffect(() => {
    const fetchMenuOptions = async () => {
      try {
        const options = await getMenuOptions();
        setMenuOptions(options);
      } catch (error) {
        console.error("Error al obtener las opciones de menú:", error);
        setMenuOptions([]); // Establece las opciones como vacías si hay un error
      }
    };
    fetchMenuOptions();
  }, []);

  // Define las tarjetas de administración en función de las opciones de menú permitidas
  const adminCards = [
    { title: "Gestión de Pacientes", link: "/gestion-pacientes" },
    { title: "Gestión de Docentes", link: "/gestion-docentes" },
    { title: "Gestión de Estudiantes", link: "/gestion-estudiantes" },
    { title: "Gestión de Administrador", link: "/gestion-administrador" },
  ];

  // Filtra las tarjetas en función de las opciones de menú permitidas
  const filteredAdminCards = adminCards.filter(card =>
    menuOptions.includes(card.title)
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header {...headerProps} />  {/* Header recibe las props con el botón de cerrar sesión */}
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
            {filteredAdminCards.map((card, index) => (
              <AdminCard key={index} {...card} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
