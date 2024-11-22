import axios from 'axios';
export const getMenuOptions = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://127.0.0.1:8000/api/menu-options/', {
      headers: {
        Authorization: `Bearer ${token}`,  // Incluye el token en el encabezado
      },
    });
    return response.data.menu_options;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      throw new Error('Sesión expirada'); // Lanza un error personalizado
    }
    console.error("Error desconocido", error);
    return [];
  }
};


