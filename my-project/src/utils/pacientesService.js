// utils/pacientesService.js
import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000/api/pacientes/'

// Función para obtener la lista de pacientes
export const getPacientes = async () => {
  try {
    const response = await axios.get(`${API_URL}`)
    return Array.isArray(response.data) ? response.data : []  // Asegúrate de que siempre devuelva un array
  } catch (error) {
    console.error("Error al obtener pacientes:", error)
    return []  // Devuelve un array vacío en caso de error
  }
}
// Función para agregar un paciente
export const addPaciente = async (paciente) => {
  try {
    const response = await axios.post(API_URL, paciente, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    console.error("Error al crear paciente:", error)
    return null
  }
}


// Función para obtener atenciones de un paciente
export const getAtencionesByPaciente = async (pacienteId) => {
  try {
    const response = await axios.get(`${API_URL}fichas_clinicas/?paciente=${pacienteId}`)
    return response.data
  } catch (error) {
    console.error("Error al obtener atenciones:", error)
    return []
  }
}

// Función para agregar una atención
export const addAtencion = async (atencion) => {
  try {
    const response = await axios.post(`${API_URL}fichas_clinicas/`, atencion)
    return response.data
  } catch (error) {
    console.error("Error al crear atención:", error)
    return null
  }
}

// Función para actualizar una atención
export const updateAtencion = async (atencionId, atencionData) => {
  try {
    const response = await axios.put(`${API_URL}fichas_clinicas/${atencionId}/`, atencionData)
    return response.data
  } catch (error) {
    console.error("Error al actualizar atención:", error)
    return null
  }
}
