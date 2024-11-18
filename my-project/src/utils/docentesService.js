import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/docentes/';

// Obtener lista de docentes
export const getDocentes = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    if (error.response && error.response.status === 401) { // Esto será capturado en el componente
      throw error;
    } else {
      throw error;
    }
  }
};


// Crear docente
export const addDocente = async (docente) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(API_URL, docente, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const searchDocentes = async (searchTerm) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`http://127.0.0.1:8000/api/docentes/?search=${searchTerm}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error al buscar docentes:", error);
    return [];
  }
};


// Actualizar docente
export const updateDocente = async (id, docente) => {
  const token = localStorage.getItem('token');
  const response = await axios.put(`${API_URL}${id}/`, docente, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

// Eliminar docente
export const deleteDocente = async (id) => {
  const token = localStorage.getItem('token');
  await axios.delete(`${API_URL}${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
