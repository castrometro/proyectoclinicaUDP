// utils/fichaService.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/fichas-clinicas/';

// Función para obtener las fichas clínicas de un paciente específico
export const getFichasClinicas = async (rut) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}?id_paciente=${rut}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener las fichas clínicas del paciente:", error);
    return [];
  }
};

// Función para crear una nueva ficha clínica
export const saveFichaClinica = async (fichaData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(API_URL, fichaData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error al guardar la ficha clínica:", error);
    return null;
  }
};


// Función para actualizar una ficha clínica específica
export const updateFichaById = async (id, fichaData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${API_URL}${id}/`, fichaData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar la ficha clínica:", error);
    return null;
  }
};

// Función para eliminar una ficha clínica específica
export const deleteFichaClinica = async (id) => {
  try {
    const token = localStorage.getItem('token');
    await axios.delete(`${API_URL}${id}/`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return true;
  } catch (error) {
    console.error("Error al eliminar la ficha clínica:", error);
    return false;
  }
};

export const deleteFichaById = async (fichaId) => {
  try {
    const token = localStorage.getItem('token');
    await axios.delete(`${API_URL}${fichaId}/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return true;
  } catch (error) {
    console.error("Error al eliminar ficha clínica:", error);
    throw error;
  }
};


export const getFichaById = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error al obtener la ficha con ID ${id}:`, error);
    return null;
  }
};
