import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import { getPacientes } from '../utils/pacientesService'

export default function FichaPaciente() {
  const { rut } = useParams()
  const [paciente, setPaciente] = useState(null)
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0])
  const [valoracion, setValoracion] = useState({
    factores: '',
    anamnesis: '',
    motivoConsulta: '',
    rauNecesidades: '',
    examenFisico: '',
    instrumentosAplicados: ''
  })
  const [diagnostico, setDiagnostico] = useState({
    texto: '',
    predeterminado: ''
  })
  const [intervenciones, setIntervenciones] = useState('')

  useEffect(() => {
    const pacientes = getPacientes()
    const pacienteEncontrado = pacientes.find(p => p.rut === rut)
    setPaciente(pacienteEncontrado)
  }, [rut])

  const handleValoracionChange = (e) => {
    const { name, value } = e.target
    setValoracion(prev => ({ ...prev, [name]: value }))
  }

  const handleDiagnosticoChange = (e) => {
    const { name, value } = e.target
    setDiagnostico(prev => ({ ...prev, [name]: value }))
  }

  const headerProps = {
    logoSrc: "/images/FacsyoLogo.png",
    logoAlt: "UDP Logo",
    menuItems: [
      { text: "Inicio", link: "/" },
      { text: "Gestión de Pacientes", link: "/gestion-pacientes" },
      { text: "Cerrar Sesión", link: "/logout" }
    ]
  }

  if (!paciente) {
    return <div>Cargando...</div>
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header {...headerProps} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Ficha del Paciente: {paciente.nombre}</h1>
        <p className="text-lg mb-4">RUT: {paciente.rut}</p>
        
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Información del día</h2>
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="mb-4 p-2 border rounded"
          />
          
          <h3 className="text-xl font-semibold mb-2">Categoría Valoración</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {Object.entries(valoracion).map(([key, value]) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                </label>
                <textarea
                  name={key}
                  value={value}
                  onChange={handleValoracionChange}
                  className="w-full p-2 border rounded"
                  rows="3"
                />
              </div>
            ))}
          </div>

          <h3 className="text-xl font-semibold mb-2">Categoría Diagnóstico</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Diagnóstico
            </label>
            <textarea
              name="texto"
              value={diagnostico.texto}
              onChange={handleDiagnosticoChange}
              className="w-full p-2 border rounded mb-2"
              rows="3"
            />
            <select
              name="predeterminado"
              value={diagnostico.predeterminado}
              onChange={handleDiagnosticoChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Seleccione un diagnóstico predeterminado</option>
              <option value="diagnostico1">Diagnóstico 1</option>
              <option value="diagnostico2">Diagnóstico 2</option>
              <option value="diagnostico3">Diagnóstico 3</option>
            </select>
          </div>

          <h3 className="text-xl font-semibold mb-2">Categoría Intervenciones</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Intervenciones
            </label>
            <textarea
              value={intervenciones}
              onChange={(e) => setIntervenciones(e.target.value)}
              className="w-full p-2 border rounded"
              rows="3"
            />
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => console.log('Guardar ficha')}
          >
            Guardar Ficha
          </button>
        </div>
      </main>
    </div>
  )
}