// SideBar.jsx

import React from 'react';
import {
  Home,
  Mail,
  Box,
  Tag,
  LogOut,
} from 'lucide-react'; // Puedes usar react-icons o lucide-react (más moderno)

// --- Datos del Menú ---
const menuItems = [
  { name: 'Dashboard', icon: Home, link: '/dashboard', active: true },
  { name: 'Productos', icon: Box, link: '/products' },
  { name: 'Categorias', icon: Tag, link: '/categories' }, // Adaptado
  { name: 'Pedidos', icon: Mail, link: '/messages' }, // Adaptado
];

// --- Componente de un Ítem Individual ---
const SidebarItem = ({ name, Icon, link, active, badge }) => {
  // Clases base para el ítem
  const baseClasses = "flex items-center p-3 rounded-lg text-gray-700 cursor-pointer hover:bg-indigo-50 transition-colors";
  
  // Clases para el ítem ACTIVO (fondo morado/índigo claro, borde izquierdo)
  const activeClasses = active
    ? "bg-indigo-100/70 border-l-4 border-indigo-600 font-semibold text-indigo-800"
    : "";

  return (
    <a href={link} className={`${baseClasses} ${activeClasses} relative`}>
      {/* Icono */}
      <Icon className="w-5 h-5 mr-3" />
      
      {/* Nombre */}
      <span>{name}</span>

      {/* Badge de Notificación */}
      {badge && (
        <span className="ml-auto bg-pink-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </a>
  );
};

export function SideBar() {
  return (
    <div className="flex flex-col h-screen w-64 bg-gray-50 p-4 shadow-xl">
      
      {/* 1. Encabezado / Logo */}
      <div className="flex items-center mb-8 px-3">
        {/* Usamos un placeholder, reemplaza con tu logo */}
        <span className="text-3xl font-extrabold text-indigo-700">EGATOR</span> 
      </div>

      {/* 2. Menú Principal */}
      <nav className="space-y-1">
        {menuItems.map((item) => (
          <SidebarItem 
            key={item.name}
            name={item.name}
            Icon={item.icon}
            link={item.link}
            active={item.active}
            badge={item.badge}
          />
        ))}
      </nav>

      {/* 4. Pie de página / Logout (fijado al final) */}
      <div className="mt-auto pt-4 border-t">
        <SidebarItem 
          name="Cerrar Sesión" 
          Icon={LogOut} 
          link="/logout" 
        />
      </div>

    </div>
  );
}