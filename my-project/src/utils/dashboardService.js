// dashboardService.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/dashboard/';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getTotalPacientes = async () => {
  const response = await axios.get(`${API_URL}total_pacientes`, getAuthHeaders());
  return response.data.total;
};

export const getTotalDocentes = async () => {
  const response = await axios.get(`${API_URL}total_docentes`, getAuthHeaders());
  return response.data.total;
};

export const getTotalEstudiantes = async () => {
  const response = await axios.get(`${API_URL}total_estudiantes`, getAuthHeaders());
  return response.data.total;
};

export const getTotalFichas = async () => {
  const response = await axios.get(`${API_URL}total_fichas`, getAuthHeaders());
  return response.data.total;
};

