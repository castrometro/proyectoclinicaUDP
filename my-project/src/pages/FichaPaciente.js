// FichaPaciente.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SelectorFichaClinica from '../components/SelectorFichaClinica';
import InformacionFicha from '../components/InformacionFicha';
import CrearFicha from '../components/CrearFicha'; // Importar el nuevo componente
import { getFichaById } from '../utils/fichasService';
import { getPacienteByRut } from '../utils/pacientesService';


export default function FichaPaciente() {
  const { rut } = useParams();
  const [paciente, setPaciente] = useState(null);
  const [selectedFichaId, setSelectedFichaId] = useState(null);
  const [selectedFicha, setSelectedFicha] = useState(null);
  const [showCrearFicha, setShowCrearFicha] = useState(false); // Estado para mostrar el formulario de creación
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log('Cerrando sesión...');
    localStorage.removeItem('token'); // Elimina el token del almacenamiento local
    navigate('/iniciar-sesion'); // Redirige a la página de inicio de sesión
  };

  useEffect(() => {
    const fetchPaciente = async () => {
      const data = await getPacienteByRut(rut);
      setPaciente(data);
    };

    setSelectedFichaId(null);
    setSelectedFicha(null);
    fetchPaciente();
  }, [rut]);

  const handleFichaSelect = async (fichaId) => {
    setSelectedFichaId(fichaId);
    if (fichaId) {
      const ficha = await getFichaById(fichaId);
      setSelectedFicha(ficha);
    } else {
      setSelectedFicha(null);
    }
  };

  const handleFichaClose = () => {
    setSelectedFichaId(null);
    setSelectedFicha(null);
  };

  const handleCrearFichaToggle = () => {
    setShowCrearFicha(!showCrearFicha); // Alternar la visibilidad del formulario
  };

  const handleFichaDelete = () => {
    setSelectedFichaId(null);
    setSelectedFicha(null);
    window.location.reload(); // Recargar la página para mostrar la ficha eliminada
  }
  const handleFichaUpdate = () => {
    setSelectedFichaId(null);
    setSelectedFicha(null);
    window.location.reload(); // Recargar la página para mostrar la ficha actualizada
  }

  const headerProps = {
    logoSrc: "/images/FacsyoLogo.png",
    logoAlt: "UDP Logo",
    menuItems: [
      { text: "Inicio", link: "/" },
      { text: "Panel Admin", link: "/admin-menu" }
    ],
    circleButton: {
      text: "Cerrar Sesión",
      onClick: handleLogout // Usa onClick para el cierre de sesión
    }
  };

  if (!paciente) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Header {...headerProps} />
        <main className="flex-grow container mx-auto px-4 py-8"> Cargando información del paciente...</main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header {...headerProps} />

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Ficha del paciente: {paciente.nombre} {paciente.apellido}</h1>
        <p className="text-lg text-gray-600 mb-6">RUT: {paciente.rut}</p>

        <button onClick={handleCrearFichaToggle} className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4">
          {showCrearFicha ? "Cancelar" : "Añadir nueva ficha"}
        </button>

        {showCrearFicha && (
          <CrearFicha rut={rut} onClose={handleCrearFichaToggle} />
        )}

        <SelectorFichaClinica rut={rut} onSelectFichaId={handleFichaSelect} />

        {selectedFicha && (
          <InformacionFicha 
            fichaId={selectedFichaId} 
            onClose={handleFichaClose} 
            onDelete={handleFichaDelete}
            onUpdate={handleFichaUpdate}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}


