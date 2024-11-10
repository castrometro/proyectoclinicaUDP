import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';

const cards = [
  {
    title: "Sobre el Proyecto",
    text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.",
    link: "/sobre-el-proyecto"
  },
  {
    title: "Seguridad de la información",
    text: "La ciberseguridad, también conocida como seguridad digital, es la práctica de proteger su información digital, dispositivos y activos. Esto incluye información personal, cuentas, archivos, fotos e incluso el dinero.",
    link: "/seguridad-informacion"
  },
  {
    title: "Ayuda",
    text: "Pasos para RCP: 1. Verificar la conciencia del paciente. 2. Llamar a emergencias. 3. Comprimir el pecho. 4. Usar un desfibrilador.",
    link: "/ayuda"
  }
];

export default function Home() {
  const proyectoRef = useRef(null);
  const seguridadRef = useRef(null);
  const ayudaRef = useRef(null);
  const [imagePosition, setImagePosition] = useState({ x: 50, y: 50 });
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Verifica si el token existe en localStorage para saber si el usuario está logueado
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleImagePosition = (direction) => {
    setImagePosition((prev) => {
      const step = 10;
      switch (direction) {
        case 'up':
          return { ...prev, y: Math.max(0, prev.y - step) };
        case 'down':
          return { ...prev, y: Math.min(100, prev.y + step) };
        case 'left':
          return { ...prev, x: Math.max(0, prev.x - step) };
        case 'right':
          return { ...prev, x: Math.min(100, prev.x + step) };
        default:
          return prev;
      }
    });
  };

  const headerProps = {
    logoSrc: "/images/FacsyoLogo.png",
    logoAlt: "UDP Logo",
    menuItems: [
      { text: "INICIO", link: "/" },
      { text: "SOBRE EL PROYECTO", onClick: () => scrollToSection(proyectoRef) },
      { text: "SEGURIDAD DE LA INFORMACION", onClick: () => scrollToSection(seguridadRef) },
      { text: "AYUDA", onClick: () => scrollToSection(ayudaRef) },
    ],
    circleButton: isLoggedIn
      ? {
          text: "ADMIN MENU",
          onClick: () => navigate('/admin-menu') // Redirige al menú de administración si está logueado
        }
      : {
          text: "INICIAR SESIÓN",
          link: "/iniciar-sesion" // Redirige a la página de inicio de sesión si no está logueado
        },
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header {...headerProps} />
      <main className="flex-grow">
        <div className="relative w-full h-[400px]">
          <img
            src="/images/Facsyo.jpeg"
            alt="Facsyo"
            className="w-full h-full object-cover"
            style={{ objectPosition: `${imagePosition.x}% ${imagePosition.y}%` }}
          />
          <div className="absolute top-2 right-2 bg-white bg-opacity-50 p-2 rounded">
            <button onClick={() => handleImagePosition('up')} className="px-2 py-1 bg-blue-500 text-white rounded mr-1">↑</button>
            <button onClick={() => handleImagePosition('down')} className="px-2 py-1 bg-blue-500 text-white rounded mr-1">↓</button>
            <button onClick={() => handleImagePosition('left')} className="px-2 py-1 bg-blue-500 text-white rounded mr-1">←</button>
            <button onClick={() => handleImagePosition('right')} className="px-2 py-1 bg-blue-500 text-white rounded">→</button>
          </div>
        </div>
        <div ref={proyectoRef}>
          <Card {...cards[0]} />
        </div>
        <div ref={seguridadRef}>
          <Card {...cards[1]} />
        </div>
        <div ref={ayudaRef}>
          <Card {...cards[2]} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
