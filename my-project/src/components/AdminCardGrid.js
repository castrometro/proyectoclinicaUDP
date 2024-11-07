import React from 'react'
import AdminCard from './AdminCard'
import { UserCircle, GraduationCap, Users, Cog } from 'lucide-react'

export default function AdminCardGrid() {
  const cards = [
    { title: "Gestión de Pacientes", icon: UserCircle, link: "/gestion-pacientes" },
    { title: "Gestión de Docentes", icon: GraduationCap, link: "/gestion-docentes" },
    { title: "Gestión de Estudiantes", icon: Users, link: "/gestion-estudiantes" },
    { title: "Gestión de Administrador", icon: Cog, link: "/gestion-administrador" },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <AdminCard
          key={index}
          title={card.title}
          icon={card.icon}
          link={card.link}
        />
      ))}
    </div>
  )
}