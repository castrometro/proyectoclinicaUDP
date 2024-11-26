import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CrearDocenteButton from '../components/CrearDocenteButton'; // Crear un botón específico para docentes
import BuscadorDocente from '../components/BuscadorDocente'; // Similar al buscador de pacientes
import InformacionDocente from '../components/InformacionDocente'; // Componente que muestra información del docente
import CrearDocente from '../components/CrearDocente'; // Modal para crear docentes
import { getDocentes} from '../utils/docentesService'; // Servicios específicos para docentes

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
      try {
        const data = await getDocentes();
        setDocentes(Array.isArray(data) ? data : []);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.error("Token expirado.");
          window.alert('Su sesión ha expirado. Por favor, inicie sesión nuevamente.'); // Espera 5 segundos antes de redirigir
          handleLogout();
        } else {
          console.error("Error al cargar docentes:", error);
        }
      }
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
    setDocentes([...docentes, newDocente]);
    setShowCrearDocente(false);
    window.location.reload();
  };

  const handleDocenteDeletion = (id) => {
    setDocentes(prevDocentes => prevDocentes.filter(docente => docente.id !== id));
    setSelectedDocente(null);
    //cargar página nuevamente
    window.location.reload();
    

  };

  const handleDocenteUpdate = () => {
    setSelectedDocente(null);
    window.location.reload();
  };

  // const handleSaveChanges = async () => {
  //   const { password, ...dataSinContraseña } = editedDocente; // Excluye el campo password
  //   try {
  //     const updatedDocente = await updateDocente(editedDocente.id, dataSinContraseña);
  //     alert("Docente actualizado correctamente.");
  //     setIsEditing(false);
  //     onDocenteUpdated(updatedDocente);
  //   } catch (error) {
  //     console.error("Error al actualizar docente:", error);
  //     alert("Error al actualizar el docente.");
  //   }
  // };

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
