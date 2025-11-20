// OrdersTable.jsx
import React from 'react';
import { Edit, Eye, ShoppingCart, User } from 'lucide-react'; 

// Datos de Muestra basados en tu DB
const mockOrders = [
  {
    id_pedido: 1001,
    id_usuario: 5,
    cliente_nombre: 'Adriana López', // Simulación del nombre del cliente
    fecha_pedido: '2025-11-10T14:30:00Z',
    estado: 'Completado', // ENUM: Pendiente, Procesando, Enviado, Completado, Cancelado
    metodo_pago: 'Tarjeta',
    total: 85.50,
  },
  {
    id_pedido: 1002,
    id_usuario: 8,
    cliente_nombre: 'Benito García',
    fecha_pedido: '2025-11-11T09:15:00Z',
    estado: 'Pendiente',
    metodo_pago: 'Efectivo',
    total: 350.00,
  },
  {
    id_pedido: 1003,
    id_usuario: 12,
    cliente_nombre: 'Clara Torres',
    fecha_pedido: '2025-11-11T16:45:00Z',
    estado: 'Cancelado',
    metodo_pago: 'Transferencia',
    total: 45.99,
  },
];
// OrdersTable.jsx

// Helper para dar formato a la fecha
const formatDate = (isoString) => {
  return new Date(isoString).toLocaleDateString('es-ES', {
    day: '2-digit', month: 'short', year: 'numeric'
  });
};

// --- Componente Badge de Estado del Pedido ---
const OrderStatusBadge = ({ status }) => {
  let bgColor = 'bg-gray-100 text-gray-700';
  
  // Mapeo de colores basado en el estado (ENUM)
  switch (status) {
    case 'Completado':
      bgColor = 'bg-green-100 text-green-700';
      break;
    case 'Pendiente':
      bgColor = 'bg-yellow-100 text-yellow-700';
      break;
    case 'Cancelado':
      bgColor = 'bg-red-100 text-red-700';
      break;
    case 'Procesando':
      bgColor = 'bg-blue-100 text-blue-700';
      break;
    default:
      bgColor = 'bg-gray-100 text-gray-700';
  }

  return (
    <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${bgColor}`}>
      {status}
    </span>
  );
};


export function OrdersTable() {

  // --- Manejadores de Acciones (Funciones Ficticias) ---
  const handleView = (id) => {
    console.log(`Ver detalles del pedido: ${id}`);
    // Aquí iría la lógica para abrir un modal con el detalle de los ítems
  };

  const handleEditStatus = (id) => {
    console.log(`Editar estado del pedido: ${id}`);
    // Aquí iría la lógica para cambiar el estado (ENUM) del pedido
  };
  
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">Gestión de Pedidos</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          
          {/* Encabezado de la Tabla */}
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pedido / Cliente
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Método de Pago
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
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
            {mockOrders.map((order) => (
              <tr 
                key={order.id_pedido} 
                className="hover:bg-indigo-50 transition-colors"
              >
                
                {/* Columna PEDIDO / CLIENTE (id_pedido y id_usuario) */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <User className="w-8 h-8 mr-3 text-indigo-500" />
                    <div>
                      <div className="text-sm font-semibold text-gray-900">{order.cliente_nombre}</div>
                      <div className="text-xs text-gray-500">
                        Pedido # {order.id_pedido} (ID Usuario: {order.id_usuario})
                      </div>
                    </div>
                  </div>
                </td>

                {/* Columna FECHA DE PEDIDO */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-700">{formatDate(order.fecha_pedido)}</div>
                </td>
                
                {/* Columna MÉTODO DE PAGO */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-700">{order.metodo_pago}</div>
                </td>

                {/* Columna TOTAL */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-bold text-gray-900">
                    ${order.total.toFixed(2)}
                  </div>
                </td>

                {/* Columna ESTADO (ENUM) */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <OrderStatusBadge status={order.estado} />
                </td>

                {/* Columna ACCIONES */}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    {/* Botón VER DETALLE */}
                    <button
                      onClick={() => handleView(order.id_pedido)}
                      className="text-gray-600 hover:text-gray-900 p-1 rounded-full hover:bg-gray-100 transition-colors"
                      title="Ver Detalle"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    
                    {/* Botón EDITAR ESTADO */}
                    <button
                      onClick={() => handleEditStatus(order.id_pedido)}
                      className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-indigo-100 transition-colors"
                      title="Cambiar Estado"
                    >
                      <Edit className="w-5 h-5" />
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