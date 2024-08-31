import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import CrearPacienteButton from '../components/CrearPacienteButton'
import BuscadorPaciente from '../components/BuscadorPaciente'
import AgendaPaciente from '../components/AgendaPaciente'
import CrearPaciente from '../components/CrearPaciente'
import { getPacientes, addPaciente } from '../utils/pacientesService'

export default function GestionPacientes() {
  const [pacientes, setPacientes] = useState([])
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [showCrearPaciente, setShowCrearPaciente] = useState(false)

  useEffect(() => {
    setPacientes(getPacientes())
  }, [])

  const headerProps = {
    logoSrc: "/images/FacsyoLogo.png",
    logoAlt: "UDP Logo",
    menuItems: [
      { text: "Inicio", link: "/" },
      { text: "Panel Admin", link: "/admin" },
      { text: "Cerrar Sesión", link: "/logout" }
    ]
  }

  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient)
  }

  const handleCreatePatient = (newPatient) => {
    const createdPatient = addPaciente(newPatient)
    setPacientes([...pacientes, createdPatient])
    setSelectedPatient(createdPatient)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header {...headerProps} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Gestión de Pacientes</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-3">
            <CrearPacienteButton onClick={() => setShowCrearPaciente(true)} />
          </div>

          <div className="md:col-span-1">
            <BuscadorPaciente onSelectPatient={handleSelectPatient} />
          </div>

          <div className="md:col-span-2">
            {selectedPatient && <AgendaPaciente selectedPatient={selectedPatient} />}
          </div>
        </div>
      </main>

      {showCrearPaciente && (
        <CrearPaciente
          onClose={() => setShowCrearPaciente(false)}
          onCreatePatient={handleCreatePatient}
        />
      )}
    </div>
  )
}