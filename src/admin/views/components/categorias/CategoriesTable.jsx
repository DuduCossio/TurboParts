// CategoriesTable.jsx (o donde lo vayas a usar)
import React from 'react';
import { Edit, Trash2, Tag, ListChecks } from 'lucide-react'; 

// Datos de Muestra basados en tu DB
const mockCategories = [
  {
    id_categoria: 1,
    nombre: 'Estética Corporal',
    descripcion: 'Tratamientos de reducción, masajes y rehabilitación.',
    activa: 1, // 1 = activa
  },
  {
    id_categoria: 2,
    nombre: 'Estética Facial',
    descripcion: 'Limpiezas profundas, peelings y tratamientos anti-edad.',
    activa: 1,
  },
  {
    id_categoria: 3,
    nombre: 'Maquillaje y Peinados',
    descripcion: 'Servicios para eventos especiales, bodas y quinceañeras.',
    activa: 0, // 0 = inactiva (quizás temporalmente suspendida)
  },
];
// CategoriesTable.jsx

// Asegúrate de tener mockCategories, Edit, Trash2, etc. definidos o importados.

export function CategoriesTable() {

  // --- Manejadores de Acciones (Funciones Ficticias) ---
  const handleEdit = (id) => {
    console.log(`Editar categoría: ${id}`);
    // Lógica para abrir modal de edición
  };

  const handleDelete = (id) => {
    console.log(`Eliminar categoría: ${id}`);
    // Lógica para confirmar y eliminar
  };

  // --- Componente Badge de Estado (activa/inactiva) ---
  // Reutilizamos el estilo del badge de la tabla de Productos
  const StatusBadge = ({ isActive }) => {
    const statusText = isActive ? 'Activa' : 'Inactiva';
    const bgColor = isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700';

    return (
      <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${bgColor}`}>
        {statusText}
      </span>
    );
  };
  
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">Gestión de Categorías</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          
          {/* Encabezado de la Tabla */}
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                Categoría
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Descripción
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">
                Acciones
              </th>
            </tr>
          </thead>
          
          {/* Cuerpo de la Tabla */}
          <tbody className="bg-white divide-y divide-gray-100">
            {mockCategories.map((category) => (
              <tr 
                key={category.id_categoria} 
                className="hover:bg-indigo-50 transition-colors"
              >
                
                {/* Columna CATEGORÍA (nombre + ID) */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Tag className="w-8 h-8 mr-3 text-indigo-500" /> 
                    <div>
                      <div className="text-sm font-semibold text-gray-900">{category.nombre}</div>
                      <div className="text-xs text-gray-500">ID: {category.id_categoria}</div>
                    </div>
                  </div>
                </td>

                {/* Columna DESCRIPCIÓN */}
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-700 line-clamp-2">{category.descripcion}</div>
                </td>

                {/* Columna ESTADO (`activa`) */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge isActive={category.activa === 1} />
                </td>

                {/* Columna ACCIONES */}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    {/* Botón EDITAR */}
                    <button
                      onClick={() => handleEdit(category.id_categoria)}
                      className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-indigo-100 transition-colors"
                      title="Editar Categoría"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    
                    {/* Botón ELIMINAR */}
                    <button
                      onClick={() => handleDelete(category.id_categoria)}
                      className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-100 transition-colors"
                      title="Eliminar Categoría"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}