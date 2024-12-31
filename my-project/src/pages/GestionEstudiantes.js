import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CrearEstudianteButton from '../components/CrearEstudianteButton';
import BuscadorEstudiante from '../components/BuscadorEstudiante';
import InformacionEstudiante from '../components/InformacionEstudiante';
import CrearEstudiante from '../components/CrearEstudiante';
import { getEstudiantes } from '../utils/estudiantesService';
import { verifyToken } from '../utils/authService';

export default function GestionEstudiantes() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showCrearEstudiante, setShowCrearEstudiante] = useState(false);
  const [notification, setNotification] = useState(null); // Para notificaciones de sesión expirada
  const [hasVerified, setHasVerified] = useState(false); // Nueva bandera para controlar la ejecución única
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('Cerrando sesión...');
    localStorage.removeItem('token');
    navigate('/iniciar-sesion');
  };

  useEffect(() => {
    const fetchEstudiantes = async () => {
      try {
        // Verifica la sesión usando verifyToken
        const isValid = await verifyToken(navigate);
  
        // Si el token no es válido, verifyToken ya manejará el redireccionamiento
        if (!isValid) return;
  
        // Si la sesión es válida, procede a obtener los estudiantes
        const data = await getEstudiantes();
        setEstudiantes(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error al cargar estudiantes:", error);
        // Si ocurre un error inesperado, puedes manejarlo aquí (opcional)
      }
    };
  
    fetchEstudiantes();
  }, [navigate]);

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
