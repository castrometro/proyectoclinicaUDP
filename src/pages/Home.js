import React, { useRef } from 'react'
import Header from '../components/Header'
import Carousel from '../components/Carousel'
import Footer from '../components/Footer'
import HorizontalCard from '../components/HorizontalCard'
import HorizontalCard2 from '../components/HorizontalCard2'

const tarjeta1 = {
  imagen: "/images/Proyecto.png",
  titulo: "Sobre el Proyecto",
  texto: "Jorge Teillier Sandoval fue un poeta chileno de la llamada «generación literaria de 1950», creador y exponente de la poesía lárica en Chile. Nació en Lautaro, en la Región de la Araucanía, el 24 de junio de 1935 y falleció en Viña del Mar, en la Región de Valparaíso, el 22 de abril de 1996.",
  color: "bg-blue-600"
}

const tarjeta2 = {
  imagen: "/images/Ciberseg.png",
  titulo: "Seguridad de la información",
  texto: "La ciberseguridad, también conocida como seguridad digital, es la práctica de proteger su información digital, dispositivos y activos. Esto incluye información personal, cuentas, archivos, fotos e incluso el dinero.",
  color: "bg-blue-600"
}

const tarjeta3 = {
  imagen: "/images/Asistencia.png",
  titulo: "Ayuda",
  texto: "Pasos para rcp: 1. Verificar la conciencia del paciente. 2. Llamar a emergencias. 3. Comprimir el pecho. 4. Usar un desfibrilador.",
  color: "bg-blue-600"
}

export default function Home() {
  const proyectoRef = useRef(null)
  const seguridadRef = useRef(null)
  const ayudaRef = useRef(null)

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' })
  }

  const headerProps = {
    logoSrc: "/images/FacsyoLogo.png",
    logoAlt: "UDP Logo",
    menuItems: [
      { text: "Inicio", link: "/" },
      { text: "Sobre el Proyecto", onClick: () => scrollToSection(proyectoRef) },
      { text: "Seguridad de la información", onClick: () => scrollToSection(seguridadRef) },
      { text: "Ayuda", onClick: () => scrollToSection(ayudaRef) },
      { text: "Iniciar Sesión", link: "/iniciar-sesion" }
    ]
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header {...headerProps} />
      <main className="flex-grow">
        <Carousel />
        <div ref={proyectoRef}>
          <HorizontalCard {...tarjeta1} />
        </div>
        <div ref={seguridadRef}>
          <HorizontalCard2 {...tarjeta2} />
        </div>
        <div ref={ayudaRef}>
          <HorizontalCard {...tarjeta3} />
        </div>
      </main>
      <Footer />
    </div>
  )
}