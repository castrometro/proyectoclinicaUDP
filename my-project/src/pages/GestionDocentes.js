import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import CrearDocenteButton from '../components/CrearDocenteButton';
import BuscadorDocente from '../components/BuscadorDocente';
import InformacionDocente from '../components/InformacionDocente';
import CrearDocente from '../components/CrearDocente';
import { getDocentes, addDocente } from '../utils/docentesService';

export default function GestionDocentes() {
  const [docentes, setDocentes] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [showCrearDocente, setShowCrearDocente] = useState(false);
  const navigate = useNavigate();

  // Cargar docentes al montar el componente
  useEffect(() => {
    const fetchDocentes = async () => {
      try{
        const data = await getDocentes();
        setDocentes(Array.isArray(data) ? data : []); // Asegura que siempre sea un array

      } catch (error) {
        console.error('Error al cargar los docentes:', error);
      }
    };
    fetchDocentes();
  }, []);

  // Manejo de cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem('token'); // Elimina el token del almacenamiento local
    navigate('/iniciar-sesion'); // Redirige a la página de inicio de sesión
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
      onClick: handleLogout,
    },
  };

  const handleSelectTeacher = (teacher) => {
    setSelectedTeacher(teacher);
  };

  const handleCreateTeacher = async (newTeacher) => {
    const createdTeacher = await addDocente(newTeacher);
    if (createdTeacher) {
      setDocentes((prevDocentes) => [...prevDocentes, createdTeacher]);
      setSelectedTeacher(createdTeacher);
    }
    setShowCrearDocente(false); // Cierra el modal después de crear el docente
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
            {/* Pasamos la lista de docentes al componente BuscadorDocente */}
            <BuscadorDocente docentes={docentes} onSelectTeacher={handleSelectTeacher} />
          </div>

          <div className="md:col-span-2">
            {selectedTeacher && <InformacionDocente selectedTeacher={selectedTeacher} />}
          </div>
        </div>
      </main>

      {showCrearDocente && (
        <CrearDocente
          onClose={() => setShowCrearDocente(false)}
          onCreateTeacher={handleCreateTeacher}
        />
      )}
    </div>
  );
}
