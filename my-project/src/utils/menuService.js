import axios from 'axios';
export const getMenuOptions = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('https://fichaclinica.udp.cl/api/menu-options/', {
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


