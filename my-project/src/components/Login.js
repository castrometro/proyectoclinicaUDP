import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { login } from '../utils/authService';

export default function Login({ onSuccess }) {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Nuevo estado para manejar la carga

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Activar estado de carga

    const result = await login(username, password);

    setIsLoading(false); // Desactivar estado de carga después de recibir la respuesta

    if (result.success) {
      onSuccess(); // Llama a onSuccess si el login es exitoso
    } else {
      setErrorMessage(result.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
      <div className="mb-4">
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Nombre de usuario</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-4 relative">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="button"
          className="absolute right-3 top-8 text-gray-500"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
      <button
        type="submit"
        className={`w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 
          ${isLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'} text-white`}
        disabled={isLoading} // Deshabilitar el botón si está cargando
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
          </div>
        ) : (
          'INICIAR SESIÓN'
        )}
      </button>
    </form>
  );
}
