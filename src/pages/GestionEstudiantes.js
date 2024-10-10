import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import CrearEstudianteButton from '../components/CrearEstudianteButton'
import BuscadorEstudiante from '../components/BuscadorEstudiante'
import InformacionEstudiante from '../components/InformacionEstudiante'
import CrearEstudiante from '../components/CrearEstudiante'
import { getEstudiantes, addEstudiante } from '../utils/estudiantesService'

export default function GestionEstudiantes() {
  const [estudiantes, setEstudiantes] = useState([])
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [showCrearEstudiante, setShowCrearEstudiante] = useState(false)

  useEffect(() => {
    setEstudiantes(getEstudiantes())
  }, [])

  const headerProps = {
    logoSrc: "/images/FacsyoLogo.png",
    logoAlt: "UDP Logo",
    menuItems: [
      { text: "Inicio", link: "/" },
      { text: "Panel Admin", link: "/admin-menu" },
      { text: "Cerrar Sesión", link: "/logout" }
    ]
  }

  const handleSelectStudent = (student) => {
    setSelectedStudent(student)
  }

  const handleCreateStudent = (newStudent) => {
    const createdStudent = addEstudiante(newStudent)
    setEstudiantes([...estudiantes, createdStudent])
    setSelectedStudent(createdStudent)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header {...headerProps} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Gestión de Estudiantes</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-3">
            <CrearEstudianteButton onClick={() => setShowCrearEstudiante(true)} />
          </div>

          <div className="md:col-span-1">
            <BuscadorEstudiante onSelectStudent={handleSelectStudent} />
          </div>

          <div className="md:col-span-2">
            {selectedStudent && <InformacionEstudiante selectedStudent={selectedStudent} />}
          </div>
        </div>
      </main>

      {showCrearEstudiante && (
        <CrearEstudiante
          onClose={() => setShowCrearEstudiante(false)}
          onCreateStudent={handleCreateStudent}
        />
      )}
    </div>
  )
}