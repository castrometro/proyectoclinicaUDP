// FichaPaciente.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SelectorFichaClinica from '../components/SelectorFichaClinica';
import InformacionFicha from '../components/InformacionFicha';
import { getFichasClinicas, getFichaById } from '../utils/fichasService';
import { getPacienteByRut } from '../utils/pacientesService';

export default function FichaPaciente() {
  const { rut } = useParams();
  const [paciente, setPaciente] = useState(null);
  const [fichas, setFichas] = useState([]);
  const [selectedFichaId, setSelectedFichaId] = useState(null);
  const [selectedFicha, setSelectedFicha] = useState(null);

  useEffect(() => {
    const fetchPaciente = async () => {
      const data = await getPacienteByRut(rut);
      setPaciente(data);
    };
    
    const fetchFichasClinicas = async () => {
      const data = await getFichasClinicas(rut);
      setFichas(data);
    };

    fetchPaciente();
    fetchFichasClinicas();
  }, [rut]);

  const handleFichaSelect = async (fichaId) => {
    setSelectedFichaId(fichaId);
    if (fichaId) {
      const ficha = await getFichaById(fichaId); // Obtiene la ficha completa usando el ID
      setSelectedFicha(ficha); // Almacena la ficha completa en el estado
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
      { text: "Inicio", link: "/" },
      { text: "Cerrar Sesión", link: "/logout" }
    ]
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

        {/* Selector de ficha clínica */}
        <SelectorFichaClinica fichas={fichas} onSelectFichaId={handleFichaSelect} />

        {/* Mostrar los detalles de la ficha seleccionada en InformacionFicha */}
        {selectedFicha && (
          <InformacionFicha fichaId={selectedFichaId} onClose={handleFichaClose} />
        )}
        {console.log(selectedFicha)}
        {console.log(selectedFichaId)}
      </main>

      <Footer />
    </div>
  );
}

