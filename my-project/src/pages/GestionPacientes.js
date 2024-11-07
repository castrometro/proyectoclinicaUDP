import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import CrearPacienteButton from '../components/CrearPacienteButton'
import BuscadorPaciente from '../components/BuscadorPaciente'
import InformacionPaciente from '../components/InformacionPaciente'
import CrearPaciente from '../components/CrearPaciente'
import { getPacientes, addPaciente } from '../utils/pacientesService'

export default function GestionPacientes() {
  const [pacientes, setPacientes] = useState([])  // Inicializa como array vacío
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [showCrearPaciente, setShowCrearPaciente] = useState(false)

  // Cargar pacientes al montar el componente
  useEffect(() => {
    const fetchPacientes = async () => {
      const data = await getPacientes()
      setPacientes(Array.isArray(data) ? data : [])  // Asegura que siempre sea un array
    }
    fetchPacientes()
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

  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient)
  }

  const handleCreatePatient = async (newPatient) => {
    const createdPatient = await addPaciente(newPatient)
    if (createdPatient) {
      // Actualiza el estado pacientes para incluir el nuevo paciente
      setPacientes(prevPacientes => [...prevPacientes, createdPatient])
      setSelectedPatient(createdPatient)  // Opcional: Selecciona el nuevo paciente automáticamente
    }
    setShowCrearPaciente(false)  // Cierra el modal después de crear el paciente
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
            {/* Pasamos la lista de pacientes al componente BuscadorPaciente */}
            <BuscadorPaciente pacientes={pacientes} onSelectPatient={handleSelectPatient} />
          </div>

          <div className="md:col-span-2">
            {selectedPatient && <InformacionPaciente selectedPatient={selectedPatient} />}
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
