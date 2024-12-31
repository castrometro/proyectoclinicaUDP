import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';

const cards = [
  {
    title: "Sobre el Proyecto",
    text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim",
    link: "/sobre-el-proyecto"
  },
  {
    title: "Seguridad de la información",
    text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim",
    link: "/seguridad-informacion"
  },
  {
    title: "Ayuda",
    text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim",
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
        <div className="relative w-full h-[500px]">
          <img
            src="/images/Facsyo.jpeg"
            alt="Facsyo"
            className="w-full h-full object-cover"
            style={{ objectPosition: "30% 20%" }}
          />
          {/* <div className="absolute top-2 right-2 bg-white bg-opacity-50 p-2 rounded">
            <button onClick={() => handleImagePosition('up')} className="px-2 py-1 bg-blue-500 text-white rounded mr-1">↑</button>
            <button onClick={() => handleImagePosition('down')} className="px-2 py-1 bg-blue-500 text-white rounded mr-1">↓</button>
            <button onClick={() => handleImagePosition('left')} className="px-2 py-1 bg-blue-500 text-white rounded mr-1">←</button>
            <button onClick={() => handleImagePosition('right')} className="px-2 py-1 bg-blue-500 text-white rounded">→</button>
          </div> */}
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
