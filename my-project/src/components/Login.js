import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { login } from '../utils/authService';

export default function Login({ onSuccess }) {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await login(username, password);

    setIsLoading(false);

    if (result.success) {
      onSuccess();
    } else {
      setErrorMessage(result.message);
    }
  };

  return (
    <form onSubmit={handleLogin} className="w-full space-y-6">
      {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

      <div>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Nombre de usuario"
          required
        />
      </div>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Contraseña"
          required
        />
        <button
          type="button"
          className="absolute right-4 top-3 text-gray-500"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center">
          <input
            id="remember"
            name="remember"
            type="checkbox"
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="remember" className="ml-2 text-gray-700">
            Recordarme
          </label>
        </div>

        <a href="/recuperar-password" className="text-blue-600 hover:text-blue-500">
          ¿Olvidó su contraseña?
        </a>
      </div>

      <button
  type="submit"
  className={`w-full py-3 rounded-full bg-aqua hover:bg-blue-800 text-white font- focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aqua ${
    isLoading ? 'bg-gray-400' : ''
  }`}
  disabled={isLoading}
>
  {isLoading ? (
    <svg
      className="animate-spin h-5 w-5 text-white mx-auto"
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
  ) : (
    'INICIAR SESIÓN'
  )}
</button>

    </form>
  );
}