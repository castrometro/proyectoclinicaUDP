// utils/pacientesService.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/pacientes/';

// Función para obtener la lista de pacientes
export const getPacientes = async () => {
  try {
    const token = localStorage.getItem('token'); // Obtén el token del almacenamiento local
    const response = await axios.get(API_URL, {
      headers: {
        'Authorization': `Bearer ${token}`, // Agrega el token en los encabezados
      }
    });
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    if (error.response && error.response.status === 401) {
      throw new Error('Token expirado'); // Esto será capturado en el componente
    }else{
      throw error;
    }
    
  }
};

// Función para obtener un paciente por RUT
export const getPacienteByRut = async (rut) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}${rut}/`, {
      headers: {
        'Authorization': `Bearer ${token}` // Agrega el token en los encabezados
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el paciente con RUT ${rut}:`, error);
    return null;
  }
};

// Función para buscar pacientes
export const searchPacientes = async (searchTerm) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}?search=${searchTerm}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error al buscar pacientes:", error);
    return [];
  }
};

// Función para agregar un paciente
export const addPaciente = async (paciente) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(API_URL, paciente, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Agrega el token en los encabezados
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear paciente:", error);
    return null;
  }
};

// Función para actualizar un paciente
export const updatePaciente = async (id, paciente) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${API_URL}${id}/`, paciente, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Agrega el token en los encabezados
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar paciente:", error);
    return null;
  }
};

// Función para eliminar un paciente
export const deletePaciente = async (id) => {
  try {
    const token = localStorage.getItem('token');
    await axios.delete(`${API_URL}${id}/`, {
      headers: {
        'Authorization': `Bearer ${token}`, // Agrega el token en los encabezados
      }
    });
    return true;
  } catch (error) {
    console.error("Error al eliminar paciente:", error);
    return false;
  }
};
