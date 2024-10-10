import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import { getPacientes, getAtencionesByPaciente, updateAtencion, addAtencion } from '../utils/pacientesService'

export default function FichaPaciente() {
  const { rut } = useParams()
  const [paciente, setPaciente] = useState(null)
  const [atenciones, setAtenciones] = useState([])
  const [selectedAtencion, setSelectedAtencion] = useState(null)
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
  const [isEditing, setIsEditing] = useState(false)
  const [isAddingNew, setIsAddingNew] = useState(false)

  useEffect(() => {
    const pacientes = getPacientes()
    const pacienteEncontrado = pacientes.find(p => p.rut === rut)
    setPaciente(pacienteEncontrado)

    const atencionesDelPaciente = getAtencionesByPaciente(rut)
    setAtenciones(atencionesDelPaciente)
  }, [rut])

  const handleAtencionSelect = (e) => {
    const atencionId = e.target.value
    if (atencionId) {
      const atencion = atenciones.find(a => a.id === parseInt(atencionId))
      setSelectedAtencion(atencion)
      if (atencion) {
        setValoracion(atencion.valoracion)
        setDiagnostico(atencion.diagnostico)
        setIntervenciones(atencion.intervenciones)
      }
      setIsEditing(false)
      setIsAddingNew(false)
    } else {
      setSelectedAtencion(null)
      resetForm()
    }
  }

  const handleValoracionChange = (e) => {
    const { name, value } = e.target
    setValoracion(prev => ({ ...prev, [name]: value }))
  }

  const handleDiagnosticoChange = (e) => {
    const { name, value } = e.target
    setDiagnostico(prev => ({ ...prev, [name]: value }))
  }

  const handleIntervencionesChange = (e) => {
    setIntervenciones(e.target.value)
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleAddNew = () => {
    setIsAddingNew(true)
    setSelectedAtencion(null)
    resetForm()
  }

  const resetForm = () => {
    setValoracion({
      factores: '',
      anamnesis: '',
      motivoConsulta: '',
      rauNecesidades: '',
      examenFisico: '',
      instrumentosAplicados: ''
    })
    setDiagnostico({
      texto: '',
      predeterminado: ''
    })
    setIntervenciones('')
  }

  const handleSave = () => {
    const newAtencion = {
      pacienteRut: rut,
      fecha: new Date().toISOString(),
      profesional: 'Admin',
      valoracion,
      diagnostico,
      intervenciones,
      ultimaEdicion: {
        fecha: new Date().toISOString(),
        usuario: 'Admin'
      }
    }

    if (isAddingNew) {
      const addedAtencion = addAtencion(newAtencion)
      setAtenciones([...atenciones, addedAtencion])
      setSelectedAtencion(addedAtencion)
    } else if (selectedAtencion) {
      const updatedAtencion = {
        ...selectedAtencion,
        ...newAtencion
      }
      updateAtencion(updatedAtencion)
      setSelectedAtencion(updatedAtencion)
      const updatedAtenciones = atenciones.map(a => 
        a.id === updatedAtencion.id ? updatedAtencion : a
      )
      setAtenciones(updatedAtenciones)
    }

    setIsEditing(false)
    setIsAddingNew(false)
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
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Seleccionar Atención</h2>
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              onClick={handleAddNew}
            >
              Añadir Nueva Ficha
            </button>
          </div>
          <select
            onChange={handleAtencionSelect}
            value={selectedAtencion ? selectedAtencion.id : ''}
            className="w-full p-2 border rounded mb-4"
          >
            <option value="">Seleccione una fecha y hora de atención</option>
            {atenciones.map(atencion => (
              <option key={atencion.id} value={atencion.id}>
                {new Date(atencion.fecha).toLocaleString()} - {atencion.profesional}
              </option>
            ))}
          </select>
          
          {(selectedAtencion || isAddingNew) && (
            <>
              <h2 className="text-2xl font-semibold mb-4">
                {isAddingNew ? "Nueva Atención" : "Información de la Atención"}
              </h2>
              {!isAddingNew && (
                <>
                  <p className="mb-2">Fecha: {new Date(selectedAtencion.fecha).toLocaleString()}</p>
                  <p className="mb-4">Profesional: {selectedAtencion.profesional}</p>
                  
                  {selectedAtencion.ultimaEdicion && (
                    <p className="mb-4 text-sm text-gray-600">
                      Última edición: {new Date(selectedAtencion.ultimaEdicion.fecha).toLocaleString()} por {selectedAtencion.ultimaEdicion.usuario}
                    </p>
                  )}
                </>
              )}

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
                      disabled={!isEditing && !isAddingNew}
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
                  disabled={!isEditing && !isAddingNew}
                />
                <select
                  name="predeterminado"
                  value={diagnostico.predeterminado}
                  onChange={handleDiagnosticoChange}
                  className="w-full p-2 border rounded"
                  disabled={!isEditing && !isAddingNew}
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
                  onChange={handleIntervencionesChange}
                  className="w-full p-2 border rounded"
                  rows="3"
                  disabled={!isEditing && !isAddingNew}
                />
              </div>

              {isEditing || isAddingNew ? (
                <button
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={handleSave}
                >
                  Guardar Cambios
                </button>
              ) : (
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={handleEdit}
                >
                  Editar Ficha
                </button>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  )
}