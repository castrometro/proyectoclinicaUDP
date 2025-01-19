import axios from 'axios';

const API_URL = 'https://fichaclinica.udp.cl/api/estudiantes/';

// Obtener lista de estudiantes
export const getEstudiantes = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    if (error.response && error.response.status === 401) {
      throw error; // Esto será manejado en el componente
    } else {
      throw error;
    }
  }
};

// Crear estudiante
export const addEstudiante = async (estudiante) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(API_URL, estudiante, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Actualizar estudiante
export const updateEstudiante = async (id, estudiante) => {
  const token = localStorage.getItem('token');
  const response = await axios.put(`${API_URL}${id}/`, estudiante, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Eliminar estudiante
export const deleteEstudiante = async (id) => {
  const token = localStorage.getItem('token');
  await axios.delete(`${API_URL}${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
