import React, { useEffect, useState } from 'react';
import { Users, BookOpen, UserCheck, FileText } from 'lucide-react';
import { getTotalPacientes, getTotalDocentes, getTotalEstudiantes, getTotalFichas } from '../utils/dashboardService';
import { Loader } from 'lucide-react'; // Icono de carga

export default function AdministradorDashboard() {
  const [totalPacientes, setTotalPacientes] = useState(0);
  const [totalDocentes, setTotalDocentes] = useState(0);
  const [totalEstudiantes, setTotalEstudiantes] = useState(0);
  const [totalFichas, setTotalFichas] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const pacientes = await getTotalPacientes();
        const docentes = await getTotalDocentes();
        const estudiantes = await getTotalEstudiantes();
        const fichas = await getTotalFichas();

        setTotalPacientes(pacientes);
        setTotalDocentes(docentes);
        setTotalEstudiantes(estudiantes);
        setTotalFichas(fichas);
      } catch (error) {
        console.error("Error al obtener los datos del dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Dashboard del Administrador</h2>
      
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <Loader size={40} className="animate-spin text-blue-500" /> {/* Spinner */}
          <span className="ml-4 text-lg">Cargando datos...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardCard icon={<Users size={24} />} title="Total Pacientes" value={totalPacientes} />
          <DashboardCard icon={<UserCheck size={24} />} title="Total Docentes" value={totalDocentes} />
          <DashboardCard icon={<BookOpen size={24} />} title="Total Estudiantes" value={totalEstudiantes} />
          <DashboardCard icon={<FileText size={24} />} title="Total Fichas" value={totalFichas} />
        </div>
      )}
    </div>
  );
}

function DashboardCard({ icon, title, value }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex items-center mb-2">
        {icon}
        <h3 className="ml-2 text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}
