import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/docentes/';

// Obtener lista de docentes
export const getDocentes = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  console.log('docentes: ', response.data);
  return response.data;
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
