import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import CrearDocenteButton from '../components/CrearDocenteButton'
import BuscadorDocente from '../components/BuscadorDocente'
import InformacionDocente from '../components/InformacionDocente'
import CrearDocente from '../components/CrearDocente'
import { getDocentes, addDocente } from '../utils/docentesService'

export default function GestionDocentes() {
  const [docentes, setDocentes] = useState([])
  const [selectedTeacher, setSelectedTeacher] = useState(null)
  const [showCrearDocente, setShowCrearDocente] = useState(false)

  useEffect(() => {
    setDocentes(getDocentes())
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

  const handleSelectTeacher = (teacher) => {
    setSelectedTeacher(teacher)
  }

  const handleCreateTeacher = (newTeacher) => {
    const createdTeacher = addDocente(newTeacher)
    setDocentes([...docentes, createdTeacher])
    setSelectedTeacher(createdTeacher)
  }

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
            <BuscadorDocente onSelectTeacher={handleSelectTeacher} />
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
  )
}