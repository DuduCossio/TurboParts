// ProductsTable.jsx (o donde lo vayas a usar)
import React from 'react';
import { Edit, Trash2, Tag, Box } from 'lucide-react'; 

// Datos de Muestra basados en tu DB (simulando los campos)
const mockProducts = [
  {
    id_producto: 1,
    nombre: 'Exfoliante Facial de Miel',
    descripcion: 'Suave exfoliante para piel sensible.',
    precio: 35.50,
    stock: 15,
    id_categoria: 2, // Facial
    id_marca: 1, // Marca A
    activo: 1,
  },
  {
    id_producto: 2,
    nombre: 'Crema Hidratante Corporal',
    descripcion: 'Hidratación profunda 24h.',
    precio: 60.00,
    stock: 4,
    id_categoria: 1, // Corporal
    id_marca: 2, // Marca B
    activo: 1,
  },
  {
    id_producto: 3,
    nombre: 'Set de Maquillaje de Novia',
    descripcion: 'Edición limitada de maquillaje profesional.',
    precio: 180.99,
    stock: 0,
    id_categoria: 4, // Maquillaje
    id_marca: 3, // Marca C
    activo: 0,
  },
];
// ProductsTable.jsx

// Asegúrate de tener mockProducts, Edit, Trash2, etc. definidos o importados.

export function ProductsTable() {

  // --- Manejadores de Acciones (Funciones Ficticias) ---
  const handleEdit = (id) => {
    console.log(`Editar producto: ${id}`);
    // Aquí iría la lógica para abrir un modal de edición
  };

  const handleDelete = (id) => {
    console.log(`Eliminar producto: ${id}`);
    // Aquí iría la lógica para confirmar y eliminar
  };

  // --- Componente Badge de Estado (activo/inactivo) ---
  const StatusBadge = ({ isActive }) => {
    const statusText = isActive ? 'Activo' : 'Inactivo';
    const bgColor = isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700';

    return (
      <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${bgColor}`}>
        {statusText}
      </span>
    );
  };
  
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">Inventario de Productos</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          
          {/* Encabezado de la Tabla */}
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                Producto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Descripción
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Precio
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">
                Acciones
              </th>
            </tr>
          </thead>
          
          {/* Cuerpo de la Tabla */}
          <tbody className="bg-white divide-y divide-gray-100">
            {mockProducts.map((product) => (
              <tr 
                key={product.id_producto} 
                className={`hover:bg-indigo-50 transition-colors ${product.stock === 0 ? 'bg-yellow-50/50' : ''}`}
              >
                
                {/* Columna PRODUCTO (Simula la columna NAME de tu referencia) */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Box className="w-8 h-8 mr-3 text-indigo-500" /> {/* Icono de Producto */}
                    <div>
                      <div className="text-sm font-semibold text-gray-900">{product.nombre}</div>
                      <div className="text-xs text-gray-500">
                        ID: {product.id_producto} | Cat: {product.id_categoria}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Columna DESCRIPCIÓN (Simula la columna TITLE) */}
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900 line-clamp-2">{product.descripcion}</div>
                </td>

                {/* Columna PRECIO */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-700">${product.precio.toFixed(2)}</div>
                </td>

                {/* Columna STOCK */}
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`font-semibold ${product.stock < 5 ? 'text-red-600' : 'text-gray-800'}`}>
                    {product.stock} {product.stock <= 1 ? 'unidad' : 'unidades'}
                  </span>
                </td>

                {/* Columna ESTADO (Simula la columna STATUS) */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge isActive={product.activo === 1} />
                </td>

                {/* Columna ACCIONES (Simula la columna ROL + Botón de Edición) */}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    {/* Botón EDITAR */}
                    <button
                      onClick={() => handleEdit(product.id_producto)}
                      className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-indigo-100 transition-colors"
                      title="Editar Producto"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    
                    {/* Botón ELIMINAR */}
                    <button
                      onClick={() => handleDelete(product.id_producto)}
                      className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-100 transition-colors"
                      title="Eliminar Producto"
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