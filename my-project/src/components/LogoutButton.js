// LogoutButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');   // Elimina el token del almacenamiento local
    navigate('/iniciar-sesion');        // Redirige a la página de inicio de sesión
  };

  return (
    <button onClick={handleLogout} className="circle-button">
      Cerrar Sesión
    </button>
  );
}
