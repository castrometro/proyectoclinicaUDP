// utils/authService.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/auth/login/';
// utils/authService.js
export const login = async (username, password) => {
    try {
      const response = await axios.post(API_URL, { username, password });
      console.log(response.data); // Verifica qué datos está devolviendo la API
      const accesstoken = response.data.access;
  
      if (accesstoken) {
        localStorage.setItem('token', accesstoken);
        if (response.data.role) {
          localStorage.setItem('userRole', response.data.role);
          console.log('user rol:',response.data.role);
        }
        return { success: true, token: accesstoken };
      }
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      return { success: false, message: 'Nombre de usuario o contraseña incorrectos.' };
    }
  };
  
