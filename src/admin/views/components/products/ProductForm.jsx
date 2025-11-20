// ProductForm.jsx
import React, { useState, useRef } from 'react';
import { Wrench, DollarSign, Package, Tag, Zap, PlusCircle, Image, Upload, XCircle } from 'lucide-react';

// Datos de ejemplo para los campos de relación
const mockCategories = [
  { id: 1, name: 'Frenos y Suspensión' },
  { id: 2, name: 'Motor y Transmisión' },
  { id: 3, name: 'Iluminación y Eléctrico' },
];

const mockBrands = [
  { id: 1, name: 'BOSCH' },
  { id: 2, name: 'MONROE' },
  { id: 3, name: 'ACDelco' },
];


export function ProductForm() {
  // 1. ESTADO INICIAL: 'precio' y 'stock' son strings vacíos para evitar conflictos.
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '', // ¡CORREGIDO a string!
    stock: '',  // ¡CORREGIDO a string!
    id_categoria: '',
    id_marca: '',
    activo: true,
  });

  const [mainImage, setMainImage] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [secondaryImages, setSecondaryImages] = useState([]);
  const [secondaryImagePreviews, setSecondaryImagePreviews] = useState([]);
  
  const mainImageInputRef = useRef(null);
  const secondaryImagesInputRef = useRef(null);


  // 2. FUNCIÓN DE CAMBIO: Guarda el valor como string (value)
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value, // Guarda el valor (value) directamente.
    }));
  };

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainImage(file);
      setMainImagePreview(URL.createObjectURL(file));
    } else {
      setMainImage(null);
      setMainImagePreview(null);
    }
  };

  const handleSecondaryImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newFiles = [...secondaryImages, ...files];
      setSecondaryImages(newFiles);
      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      setSecondaryImagePreviews(newPreviews);
    }
  };

  const handleRemoveSecondaryImage = (indexToRemove) => {
    const updatedFiles = secondaryImages.filter((_, index) => index !== indexToRemove);
    const updatedPreviews = secondaryImagePreviews.filter((_, index) => index !== indexToRemove);
    setSecondaryImages(updatedFiles);
    setSecondaryImagePreviews(updatedPreviews);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    
    // --- IMPORTANTE: Convertir a Número SÓLO al Enviar ---
    const finalData = {
        ...formData,
        precio: parseFloat(formData.precio) || 0.00, // Convierte a float o 0 si está vacío
        stock: parseInt(formData.stock, 10) || 0,     // Convierte a int o 0 si está vacío
    };
    
    console.log('Datos del Repuesto a Enviar (Validados):', finalData);
    console.log('Imagen Principal:', mainImage);
    console.log('Imágenes Secundarias:', secondaryImages);
    // ... (Lógica de envío de FormData a la API de Laravel) ...

    alert('Repuesto listo para ser creado con imágenes. Revisa la consola.');
  };

  const InputGroup = ({ label, name, type = 'text', icon: Icon, children, isHalf = false }) => (
    <div className={isHalf ? "w-full md:w-1/2 px-3 mb-6" : "w-full px-3 mb-6"}>
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor={name}>
        {label}
      </label>
      <div className="flex items-center border border-gray-200 rounded-lg shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
        {Icon && <Icon className="w-5 h-5 text-gray-400 ml-3" />}
        {children || (
          <input
            className="appearance-none block w-full bg-white text-gray-700 border-none py-3 px-4 leading-tight focus:outline-none"
            id={name}
            name={name}
            type={type}
            // El valor siempre es el string del estado, permitiendo escribir puntos y comas.
            value={formData[name]} 
            onChange={handleChange}
            placeholder={label}
            step={type === 'number' && (name === 'precio' ? '0.01' : '1')}
          />
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-2xl">
      {/* ... (Todo el resto de la estructura del formulario se mantiene igual) ... */}
      <div className="flex items-center mb-6 border-b pb-4">
        <PlusCircle className="w-8 h-8 text-indigo-600 mr-3" />
        <h2 className="text-3xl font-bold text-gray-800">Añadir Nuevo Repuesto</h2>
      </div>

      <form onSubmit={handleSubmit} className="w-full">
        
        {/* 1. INFORMACIÓN BÁSICA */}
        <div className="flex flex-wrap -mx-3 border-b pb-6 mb-6">
          <h3 className="w-full px-3 text-xl font-semibold text-gray-700 mb-4">
            <Wrench className="w-5 h-5 inline mr-2" />
            Información del Repuesto
          </h3>
          <InputGroup label="Nombre del Repuesto (Ej: Filtro de Aceite)" name="nombre" icon={Wrench} />
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
              placeholder="Ej: Repuesto compatible con modelos 2010-2015, código OEM 1A2B3C..."
              rows="3"
            />
          </div>
        </div>
        
        {/* 2. PRECIOS Y STOCK */}
        <div className="flex flex-wrap -mx-3 border-b pb-6 mb-6">
          <h3 className="w-full px-3 text-xl font-semibold text-gray-700 mb-4">
            <DollarSign className="w-5 h-5 inline mr-2" />
            Precios y Existencias
          </h3>
          <InputGroup 
            label="Precio de Venta (DECIMAL)" 
            name="precio" 
            type="number" 
            icon={DollarSign} 
            isHalf 
          />
          <InputGroup 
            label="Stock o Existencia (INT)" 
            name="stock" 
            type="number" 
            icon={Package} 
            isHalf 
          />
        </div>

        {/* 3. SUBIDA DE IMÁGENES */}
        <div className="flex flex-wrap -mx-3 border-b pb-6 mb-6">
          <h3 className="w-full px-3 text-xl font-semibold text-gray-700 mb-4">
            <Image className="w-5 h-5 inline mr-2" />
            Imágenes del Repuesto
          </h3>

          {/* Imagen Principal */}
          <div className="w-full md:w-1/2 px-3 mb-6">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Imagen Principal
            </label>
            <div 
              className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-indigo-500 transition-colors"
              onClick={() => mainImageInputRef.current.click()}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleMainImageChange}
                className="hidden"
                ref={mainImageInputRef}
              />
              {mainImagePreview ? (
                <img src={mainImagePreview} alt="Previsualización Principal" className="max-h-32 w-auto object-contain rounded-md mb-2" />
              ) : (
                <Upload className="w-10 h-10 text-gray-400 mb-2" />
              )}
              <p className="text-sm text-gray-600 text-center">
                {mainImage ? mainImage.name : "Click para seleccionar la imagen principal"}
              </p>
              <p className="text-xs text-gray-500 mt-1">Sube la mejor foto del repuesto.</p>
            </div>
          </div>

          {/* Imágenes Secundarias */}
          <div className="w-full md:w-1/2 px-3 mb-6">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Imágenes Secundarias
            </label>
            <div 
              className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-indigo-500 transition-colors h-full"
              onClick={() => secondaryImagesInputRef.current.click()}
            >
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleSecondaryImagesChange}
                className="hidden"
                ref={secondaryImagesInputRef}
              />
              <Upload className="w-10 h-10 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 text-center">
                Click para seleccionar imágenes secundarias (hasta 5)
              </p>
              <p className="text-xs text-gray-500 mt-1">Vistas desde diferentes ángulos o detalles.</p>
            </div>
            
            {/* Previsualizaciones de Imágenes Secundarias */}
            {secondaryImagePreviews.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-3">
                {secondaryImagePreviews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <img src={preview} alt={`Secundaria ${index + 1}`} className="w-full h-24 object-cover rounded-md border border-gray-200" />
                    <button
                      type="button"
                      onClick={() => handleRemoveSecondaryImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Eliminar imagen"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 4. RELACIONES Y ESTADO */}
        <div className="flex flex-wrap -mx-3 border-b pb-6 mb-6">
          <h3 className="w-full px-3 text-xl font-semibold text-gray-700 mb-4">
            <Tag className="w-5 h-5 inline mr-2" />
            Clasificación (Categoría y Marca)
          </h3>

          <InputGroup label="Categoría" name="id_categoria" icon={Tag} isHalf>
            <select
              className="appearance-none block w-full bg-white text-gray-700 border-none py-3 px-4 leading-tight focus:outline-none"
              id="id_categoria"
              name="id_categoria"
              value={formData.id_categoria}
              onChange={handleChange}
            >
              <option value="" disabled>Seleccione una Categoría</option>
              {mockCategories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </InputGroup>

          <InputGroup label="Marca Fabricante" name="id_marca" icon={Zap} isHalf>
            <select
              className="appearance-none block w-full bg-white text-gray-700 border-none py-3 px-4 leading-tight focus:outline-none"
              id="id_marca"
              name="id_marca"
              value={formData.id_marca}
              onChange={handleChange}
            >
              <option value="" disabled>Seleccione una Marca</option>
              {mockBrands.map(brand => (
                <option key={brand.id} value={brand.id}>{brand.name}</option>
              ))}
            </select>
          </InputGroup>
          
          <div className="w-full px-3 mb-6">
            <div className="flex items-center">
              <input
                id="activo"
                name="activo"
                type="checkbox"
                checked={formData.activo}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label htmlFor="activo" className="ml-2 block text-sm font-medium text-gray-700">
                Repuesto Activo (`activo` TINYINT)
              </label>
            </div>
            <p className="text-xs text-gray-500 mt-1">Si está activo, aparecerá en el inventario y en la tienda online.</p>
          </div>
        </div>

        {/* 5. BOTÓN DE ENVÍO */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition duration-150 ease-in-out flex items-center"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            Crear Repuesto
          </button>
        </div>
      </form>
    </div>
  );
}