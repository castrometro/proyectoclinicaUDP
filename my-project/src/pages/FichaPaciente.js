// FichaPaciente.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SelectorFichaClinica from '../components/SelectorFichaClinica';
import InformacionFicha from '../components/InformacionFicha';
import { getFichaById } from '../utils/fichasService';
import { getPacienteByRut } from '../utils/pacientesService';

export default function FichaPaciente() {
  const { rut } = useParams();
  console.log('rut:',rut);
  const [paciente, setPaciente] = useState(null);
  const [selectedFichaId, setSelectedFichaId] = useState(null);
  const [selectedFicha, setSelectedFicha] = useState(null);
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

    // Limpiar cualquier ficha previa cuando cambia el `rut`
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

  const headerProps = {
    logoSrc: "/images/FacsyoLogo.png",
    logoAlt: "UDP Logo",
    menuItems: [
        { text: "Inicio", 
            link: "/" },],
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

        {/* Pasar solo el rut al SelectorFichaClinica */}
        <SelectorFichaClinica rut={rut} onSelectFichaId={handleFichaSelect} />

        {/* Mostrar los detalles de la ficha seleccionada en InformacionFicha */}
        {selectedFicha && (
          <InformacionFicha fichaId={selectedFichaId} onClose={handleFichaClose} />
        )}
      </main>

      <Footer />
    </div>
  );
}

