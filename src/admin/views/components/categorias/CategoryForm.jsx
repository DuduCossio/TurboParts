// CategoryForm.jsx
import React, { useState } from 'react';
import { Tag, PlusCircle, AlignLeft } from 'lucide-react';

export function CategoryForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    activa: true, // Por defecto, la categoría está activa
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos de la Categoría a Enviar:', formData);
    
    // Aquí iría la lógica para enviar los datos a tu Backend (Laravel API)
    alert('Categoría lista para ser creada. Revisa la consola.');
  };

  // Componente reutilizable para el grupo de input (solo nombre)
  const InputGroup = ({ label, name, icon: Icon }) => (
    <div className="w-full px-3 mb-6">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor={name}>
        {label}
      </label>
      <div className="flex items-center border border-gray-200 rounded-lg shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
        {Icon && <Icon className="w-5 h-5 text-gray-400 ml-3" />}
        <input
          className="appearance-none block w-full bg-white text-gray-700 border-none py-3 px-4 leading-tight focus:outline-none"
          id={name}
          name={name}
          type="text"
          value={formData[name]}
          onChange={handleChange}
          placeholder={label}
        />
      </div>
    </div>
  );

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-2xl">
      <div className="flex items-center mb-6 border-b pb-4">
        <PlusCircle className="w-8 h-8 text-indigo-600 mr-3" />
        <h2 className="text-3xl font-bold text-gray-800">Añadir Nueva Categoría</h2>
      </div>

      <form onSubmit={handleSubmit} className="w-full">
        {/* 1. INFORMACIÓN BÁSICA DE CATEGORÍA */}
        <div className="flex flex-wrap -mx-3 border-b pb-6 mb-6">
          <h3 className="w-full px-3 text-xl font-semibold text-gray-700 mb-4">
            <Tag className="w-5 h-5 inline mr-2" />
            Detalles de Clasificación
          </h3>
          
          {/* Nombre */}
          <InputGroup label="Nombre de la Categoría (Ej: Frenos y Suspensión)" name="nombre" icon={Tag} />
          
          {/* Descripción */}
          <div className="w-full px-3 mb-6">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="descripcion">
              Descripción
            </label>
            <textarea
              className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 shadow-sm"
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Ej: Repuestos relacionados con el sistema de frenado y amortiguadores..."
              rows="3"
            />
          </div>
        </div>
        
        {/* 2. ESTADO DE ACTIVIDAD */}
        <div className="flex flex-wrap -mx-3 border-b pb-6 mb-6">
          <h3 className="w-full px-3 text-xl font-semibold text-gray-700 mb-4">
            <AlignLeft className="w-5 h-5 inline mr-2" />
            Opciones
          </h3>
          
          {/* Estado Activo (Checkbox) */}
          <div className="w-full px-3 mb-6">
            <div className="flex items-center">
              <input
                id="activa"
                name="activa"
                type="checkbox"
                checked={formData.activa}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label htmlFor="activa" className="ml-2 block text-sm font-medium text-gray-700">
                Categoría Activa (`activa` TINYINT)
              </label>
            </div>
            <p className="text-xs text-gray-500 mt-1">Si está activa, aparecerá como opción al crear nuevos repuestos.</p>
          </div>
        </div>

        {/* 3. BOTÓN DE ENVÍO */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition duration-150 ease-in-out flex items-center"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            Crear Categoría
          </button>
        </div>
      </form>
    </div>
  );
}