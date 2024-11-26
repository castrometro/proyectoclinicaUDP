import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CrearEstudianteButton from '../components/CrearEstudianteButton';
import BuscadorEstudiante from '../components/BuscadorEstudiante';
import InformacionEstudiante from '../components/InformacionEstudiante';
import CrearEstudiante from '../components/CrearEstudiante';
import { getEstudiantes } from '../utils/estudiantesService';

export default function GestionEstudiantes() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showCrearEstudiante, setShowCrearEstudiante] = useState(false);
  const [notification, setNotification] = useState(null); // Para notificaciones de sesión expirada
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('Cerrando sesión...');
    localStorage.removeItem('token');
    navigate('/iniciar-sesion');
  };

  useEffect(() => {
    const fetchEstudiantes = async () => {
      try {
        const data = await getEstudiantes();
        setEstudiantes(Array.isArray(data) ? data : []);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.error("Token expirado.");
          setNotification('Tu sesión ha expirado. Serás redirigido al inicio de sesión en breve.');
          setTimeout(() => {
            handleLogout();
          }, 5000); // Redirige después de 5 segundos
        } else {
          console.error("Error al cargar estudiantes:", error);
        }
      }
    };
    fetchEstudiantes();
  }, [handleLogout]);

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

  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
  };

  const handleCreateStudent = async (newStudent) => {
    setEstudiantes([...estudiantes, newStudent]);
    setShowCrearEstudiante(false);
  };

  const handleStudentDeletion = (id) => {
    setEstudiantes((prevEstudiantes) => prevEstudiantes.filter((estudiante) => estudiante.id !== id));
    setSelectedStudent(null);
  };

  const handleStudentUpdate = () => {
    setSelectedStudent(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {notification && (
        <div className="bg-red-500 text-white text-center py-2">
          {notification}
        </div>
      )}
      <Header {...headerProps} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Gestión de Estudiantes</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-3">
            <CrearEstudianteButton onClick={() => setShowCrearEstudiante(true)} />
          </div>

          <div className="md:col-span-1">
            <BuscadorEstudiante estudiantes={estudiantes} onSelectStudent={handleSelectStudent} />
          </div>

          <div className="md:col-span-2">
            {selectedStudent && (
              <InformacionEstudiante
                selectedStudent={selectedStudent}
                onStudentDeleted={handleStudentDeletion}
                onStudentUpdated={handleStudentUpdate}
              />
            )}
          </div>
        </div>
      </main>

      {showCrearEstudiante && (
        <CrearEstudiante
          onClose={() => setShowCrearEstudiante(false)}
          onCreateStudent={handleCreateStudent}
        />
      )}
      <Footer />
    </div>
  );
}
