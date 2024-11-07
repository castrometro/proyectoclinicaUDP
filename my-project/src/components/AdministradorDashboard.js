import React from 'react'
import { Users, BookOpen, UserCheck, FileText } from 'lucide-react'

export default function AdministradorDashboard() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Dashboard del Administrador</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard icon={<Users size={24} />} title="Total Usuarios" value="1,234" />
        <DashboardCard icon={<BookOpen size={24} />} title="Cursos Activos" value="42" />
        <DashboardCard icon={<UserCheck size={24} />} title="Docentes" value="87" />
        <DashboardCard icon={<FileText size={24} />} title="Reportes Generados" value="156" />
      </div>
    </div>
  )
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
  )
}