// utils/authService.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/auth/login/';
const VERIFY_URL = 'http://127.0.0.1:8000/api/token/verify/';

export const login = async (username, password) => {
  try {
    const response = await axios.post(API_URL, { username, password });
    console.log(response.data);
    const accesstoken = response.data.access;

    if (accesstoken) {
      localStorage.setItem('token', accesstoken);
      if (response.data.role) {
        localStorage.setItem('userRole', response.data.role);
        console.log('user rol:', response.data.role);
      }
      return { success: true, token: accesstoken };
    }
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    return { success: false, message: 'Nombre de usuario o contraseña incorrectos.' };
  }
};

// Nueva función para verificar el token
export const verifyToken = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    window.alert('Su sesión ha expirado. Por favor, inicie sesión nuevamente.');
    localStorage.removeItem('token');
    window.location.href = '/iniciar-sesion'; // Redirige directamente
    return false;
  }

  try {
    await axios.post(VERIFY_URL, { token }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return true; // Token válido
  } catch (error) {
    console.error('Error verificando el token:', error);
    window.alert('Su sesión ha expirado. Por favor, inicie sesión nuevamente.');
    window.location.href = '/iniciar-sesion'; // Redirige directamente
    return false;
  }
};

