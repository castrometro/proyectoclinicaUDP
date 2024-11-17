import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CrearDocenteButton from '../components/CrearDocenteButton'; // Crear un botón específico para docentes
import BuscadorDocente from '../components/BuscadorDocente'; // Similar al buscador de pacientes
import InformacionDocente from '../components/InformacionDocente'; // Componente que muestra información del docente
import CrearDocente from '../components/CrearDocente'; // Modal para crear docentes
import { getDocentes, addDocente } from '../utils/docentesService'; // Servicios específicos para docentes

export default function GestionDocentes() {
  const [docentes, setDocentes] = useState([]);
  const [selectedDocente, setSelectedDocente] = useState(null);
  const [showCrearDocente, setShowCrearDocente] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('Cerrando sesión...');
    localStorage.removeItem('token');
    navigate('/iniciar-sesion');
  };

  // Cargar docentes al montar el componente
  useEffect(() => {
    const fetchDocentes = async () => {
      const data = await getDocentes();
      setDocentes(Array.isArray(data) ? data : []);
    };
    fetchDocentes();
  }, []);

  const headerProps = {
    logoSrc: "/images/FacsyoLogo.png",
    logoAlt: "UDP Logo",
    menuItems: [
      { text: "Inicio", link: "/" },
      { text: "Panel Admin", link: "/admin-menu" }
    ],
    circleButton: {
      text: "Cerrar Sesión",
      onClick: handleLogout
    }
  };

  const handleSelectDocente = (docente) => {
    setSelectedDocente(docente);
  };

  const handleCreateDocente = async (newDocente) => {
    const createdDocente = await addDocente(newDocente);
    if (createdDocente) {
      setDocentes(prevDocentes => [...prevDocentes, createdDocente]);
      setSelectedDocente(createdDocente);
    }
    setShowCrearDocente(false);
  };

  const handleDocenteDeletion = (id) => {
    setDocentes(prevDocentes => prevDocentes.filter(d => d.id !== id));
    setSelectedDocente(null);
  };

  const handleDocenteUpdate = () => {
    setSelectedDocente(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header {...headerProps} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Gestión de Docentes</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-3">
            <CrearDocenteButton onClick={() => setShowCrearDocente(true)} />
          </div>

          <div className="md:col-span-1">
            <BuscadorDocente docentes={docentes} onSelectDocente={handleSelectDocente} />
          </div>

          <div className="md:col-span-2">
            {selectedDocente && (
              <InformacionDocente 
                selectedDocente={selectedDocente} 
                onDocenteDeleted={handleDocenteDeletion}
                onDocenteUpdated={handleDocenteUpdate}
              />
            )}
          </div>
        </div>
      </main>

      {showCrearDocente && (
        <CrearDocente
          onClose={() => setShowCrearDocente(false)}
          onCreateDocente={handleCreateDocente}
        />
      )}
      <Footer />
    </div>
  );
}
