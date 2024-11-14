// utils/usuariosService.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/usuarios/';

// Función para obtener información del usuario actual
export const getUsuarioActual = async () => {
  try {
    const token = localStorage.getItem('token'); // Obtén el token del almacenamiento local
    const response = await axios.get(`${API_URL}actual/`, {
      headers: {
        'Authorization': `Bearer ${token}`, // Agrega el token en los encabezados
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener la información del usuario:", error);
    return null;
  }
};

// Función para obtener el nombre de usuario por ID
export const getNombreUsuario = async (userId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}${userId}/nombre/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    return response.data.nombre_usuario;
  } catch (error) {
    console.error("Error al obtener el nombre de usuario:", error);
    return null;
  }
};

// Función para obtener el grupo del usuario
export const getGrupoUsuario = async (userId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}${userId}/grupo/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    return response.data.grupo;
  } catch (error) {
    console.error("Error al obtener el grupo del usuario:", error);
    return null;
  }
};

// Función para obtener el tipo de usuario
export const getTipoUsuario = async (userId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}${userId}/tipo/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    return response.data.tipo;
  } catch (error) {
    console.error("Error al obtener el tipo de usuario:", error);
    return null;
  }
};
