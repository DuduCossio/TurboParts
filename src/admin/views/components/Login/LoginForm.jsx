// LoginPage.jsx (o LoginForm.jsx)
import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff } from 'lucide-react'; // Iconos para usuario y contraseña

export function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false); // Para "keep me signed in"

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Intentando iniciar sesión con:', { username, password, keepLoggedIn });
    // Aquí iría la lógica de autenticación con tu backend (Laravel)
    // - Enviar username y password
    // - Recibir token JWT o respuesta de éxito/error
    // - Redirigir al dashboard o mostrar mensaje de error
    alert('Intento de Login. Revisa la consola para los datos.');
  };

  return (
    <div 
      className=" flex items-center justify-center min-h-screen bg-cover bg-center w-full"
      style={{ backgroundImage: 'url(public/reparacion-taller.jpg)' }} // Imagen de fondo de Unsplash
    >
      {/* Overlay para oscurecer la imagen de fondo y mejorar legibilidad */}
      <div className=" inset-0 bg-black opacity-60"></div>

      <div className="relative z-10 p-8 md:p-12 bg-opacity-10 backdrop-filter backdrop-blur-sm rounded-lg shadow-2xl w-full max-w-md mx-auto transform hover:scale-105 transition-transform duration-300">
        
        {/* Título */}
        <h1 className="text-white text-4xl md:text-5xl font-extrabold text-center mb-10 tracking-wide">
          AUTO REPUESTOS
          <span className="block text-xl font-semibold mt-2">INICIAR SESIÓN</span>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campo Username */}
          <div className="relative flex items-center rounded-full backdrop-filter backdrop-blur-md border border-white border-opacity-30 shadow-lg transition-all duration-300 focus-within:ring-2 focus-within:ring-indigo-400">
            <User className="absolute left-4 w-5 h-5 text-gray-200" />
            <input
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-transparent text-white placeholder-gray-200 focus:outline-none text-lg"
              required
            />
          </div>

          {/* Campo Password */}
          <div className="relative flex items-center rounded-full bg-opacity-20 backdrop-filter backdrop-blur-md border border-opacity-30 shadow-lg transition-all duration-300 focus-within:ring-2 focus-within:ring-indigo-400">
            <Lock className="absolute left-4 w-5 h-5 text-gray-200" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-12 py-3 bg-transparent text-white placeholder-gray-200 focus:outline-none text-lg"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 p-1 text-gray-200 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Opciones Adicionales (Show Password, Keep me signed in, Forgot Password) */}
          <div className="flex items-center justify-between text-sm text-white mt-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showPassword} // Usamos el mismo estado para la imagen original
                onChange={() => setShowPassword(!showPassword)}
                className="form-checkbox h-4 w-4 text-indigo-500 rounded border-gray-300 focus:ring-indigo-500 bg-white bg-opacity-30 border-opacity-50"
              />
              <span>Mostrar Contraseña</span>
            </label>
            
          </div>
          <div className="flex items-center justify-between text-sm text-white mt-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={keepLoggedIn}
                onChange={(e) => setKeepLoggedIn(e.target.checked)}
                className="form-checkbox h-4 w-4 text-indigo-500 rounded border-gray-300 focus:ring-indigo-500 bg-white bg-opacity-30 border-opacity-50"
              />
              <span>Recordarme</span>
            </label>
            <a href="#" className="text-indigo-300 hover:text-indigo-100 transition-colors">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          {/* Botón SIGN IN */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-full text-lg shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
          >
            INICIAR SESIÓN
          </button>
        </form>

        {/* Copyright (como en la imagen de referencia) */}
        <p className="text-center text-gray-300 text-xs mt-10">
          &copy; 2024 Tienda de Repuestos. Todos los derechos reservados | Diseñado por TuNombre
        </p>
      </div>
    </div>
  );
}