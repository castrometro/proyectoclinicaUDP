import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CrearPacienteButton from '../components/CrearPacienteButton';
import BuscadorPaciente from '../components/BuscadorPaciente';
import InformacionPaciente from '../components/InformacionPaciente';
import CrearPaciente from '../components/CrearPaciente';
import { verifyToken } from '../utils/authService';

const userRole = localStorage.getItem('userRole');
console.log(userRole);

export default function GestionPacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showCrearPaciente, setShowCrearPaciente] = useState(false);
  const [hasVerified, setHasVerified] = useState(false); // Nueva bandera para controlar la ejecución única
  const navigate = useNavigate();

  // Verifica si el token es válido al montar el componente
  useEffect(() => {
    const checkSession = async () => {
      if (!hasVerified) {
        const isValid = await verifyToken(navigate);
        setHasVerified(isValid); // Asegura que solo se ejecuta una vez
      }
    };
    checkSession();
  }, [navigate, hasVerified]);

  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient);
  };

  const handleCreatePatient = (newPatient) => {
    setPacientes([...pacientes, newPatient]);
    setShowCrearPaciente(false);
  };

  const handlePatientDeletion = (rut) => {
    setPacientes(prevPacientes => prevPacientes.filter(p => p.rut !== rut));
    setSelectedPatient(null);
  };

  const handlePatientUpdate = () => {
    setSelectedPatient(null);
  };

  const headerProps = {
    logoSrc: "/images/FacsyoLogo.png",
    logoAlt: "UDP Logo",
    menuItems: [
      { text: "Inicio", link: "/" },
      { text: "Panel Admin", link: "/admin-menu" },
    ],
    circleButton: {
      text: "Cerrar Sesión",
      onClick: () => {
        console.log('Cerrando sesión...');
        localStorage.removeItem('token');
        navigate('/iniciar-sesion');
      },
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header {...headerProps} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Gestión de Pacientes</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {userRole !== 'Estudiante' && (
            <div className="md:col-span-3">
              <CrearPacienteButton onClick={() => setShowCrearPaciente(true)} />
            </div>
          )}

          <div className="md:col-span-1">
            <BuscadorPaciente onSelectPatient={handleSelectPatient} />
          </div>

          <div className="md:col-span-2">
            {selectedPatient && <InformacionPaciente 
              selectedPatient={selectedPatient} 
              onPatientDeleted={handlePatientDeletion}
              onPatientUpdated={handlePatientUpdate}
            />}
          </div>
        </div>
      </main>

      {showCrearPaciente && (
        <CrearPaciente
          onClose={() => setShowCrearPaciente(false)}
          onCreatePatient={handleCreatePatient}
        />
      )}
      <Footer />
    </div>
  );
}
