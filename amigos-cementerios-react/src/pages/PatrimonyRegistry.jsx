import { useState } from 'react';
import { ArchiveBoxIcon, MapIcon, DocumentTextIcon, CameraIcon } from '@heroicons/react/24/outline';

const PatrimonyRegistry = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const registries = [
    {
      id: 1,
      title: 'Mausoleo Familia Martínez',
      location: 'Cementerio Nº1, Sector A',
      category: 'mausoleo',
      year: 1895,
      architect: 'Desconocido',
      status: 'bueno',
      description: 'Mausoleo de estilo neoclásico con elementos decorativos únicos.',
      materials: ['Mármol', 'Granito', 'Hierro forjado'],
      images: ['/img/portfolio/cementerio1/La pietá cementerio n°1.jpg'],
      lastInspection: '2024-01-15',
      interventions: ['Limpieza', 'Consolidación estructural'],
      coordinates: { lat: -33.0472, lng: -71.6127 }
    },
    {
      id: 2,
      title: 'Tumba de Domingo Faustino Sarmiento',
      location: 'Cementerio Nº2, Sector Histórico',
      category: 'tumba-historica',
      year: 1888,
      architect: 'Manuel Aldunate',
      status: 'regular',
      description: 'Sepultura del destacado educador y expresidente argentino.',
      materials: ['Piedra', 'Bronce'],
      images: ['/img/portfolio/cementerio2/cementerio N°2.jpg'],
      lastInspection: '2023-12-10',
      interventions: ['Restauración de inscripciones'],
      coordinates: { lat: -33.0461, lng: -71.6089 }
    },
    {
      id: 3,
      title: 'Sector Masónico',
      location: 'Cementerio Disidentes',
      category: 'sector-tematico',
      year: 1825,
      architect: 'Varios',
      status: 'malo',
      description: 'Área dedicada a los miembros de la masonería, con simbología característica.',
      materials: ['Piedra local', 'Mármol importado'],
      images: ['/img/portfolio/cementerio2/disi1.jpg'],
      lastInspection: '2023-11-20',
      interventions: ['Urgente restauración'],
      coordinates: { lat: -33.0425, lng: -71.6156 }
    }
  ];

  const categories = [
    { id: 'all', name: 'Todos los registros' },
    { id: 'mausoleo', name: 'Mausoleos' },
    { id: 'tumba-historica', name: 'Tumbas Históricas' },
    { id: 'sector-tematico', name: 'Sectores Temáticos' },
    { id: 'esculturas', name: 'Esculturas' },
    { id: 'arquitectura', name: 'Elementos Arquitectónicos' }
  ];

  const filteredRegistries = registries.filter(registry => {
    const matchesSearch = registry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         registry.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || registry.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'bueno':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Buen Estado</span>;
      case 'regular':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Estado Regular</span>;
      case 'malo':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Mal Estado</span>;
      default:
        return null;
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <ArchiveBoxIcon className="mx-auto h-16 w-16 text-primary mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Registro Patrimonial
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Catálogo y documentación del patrimonio funerario de Valparaíso
            </p>
            <div className="max-w-md mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar en el registro..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <ArchiveBoxIcon className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Registry Grid */}
        {filteredRegistries.length === 0 ? (
          <div className="text-center py-12">
            <ArchiveBoxIcon className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg">
              No se encontraron registros que coincidan con tu búsqueda.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {filteredRegistries.map(registry => (
              <div key={registry.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={registry.images[0]}
                    alt={registry.title}
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{registry.title}</h3>
                    {getStatusBadge(registry.status)}
                  </div>

                  <div className="flex items-center space-x-2 text-gray-600 mb-3">
                    <MapIcon className="h-4 w-4" />
                    <span className="text-sm">{registry.location}</span>
                  </div>

                  <p className="text-gray-600 mb-4">{registry.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Año:</span>
                      <p className="text-gray-600">{registry.year}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Arquitecto:</span>
                      <p className="text-gray-600">{registry.architect}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <span className="font-medium text-gray-700 text-sm">Materiales:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {registry.materials.map((material, index) => (
                        <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
                          {material}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4 text-sm">
                    <span className="font-medium text-gray-700">Última inspección:</span>
                    <p className="text-gray-600">{new Date(registry.lastInspection).toLocaleDateString('es-ES')}</p>
                  </div>

                  {registry.interventions.length > 0 && (
                    <div className="mb-4">
                      <span className="font-medium text-gray-700 text-sm">Intervenciones:</span>
                      <ul className="text-xs text-gray-600 mt-1">
                        {registry.interventions.map((intervention, index) => (
                          <li key={index} className="flex items-start space-x-1">
                            <span className="text-primary">•</span>
                            <span>{intervention}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex space-x-3">
                    <button className="flex-1 bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm">
                      Ver Detalle
                    </button>
                    <button className="flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      <MapIcon className="h-4 w-4" />
                    </button>
                    <button className="flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      <CameraIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Map Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Mapa Patrimonial</h2>
          <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <MapIcon className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <p className="text-gray-500">Mapa interactivo en desarrollo</p>
              <p className="text-sm text-gray-400 mt-2">
                Visualización georreferenciada de todos los elementos patrimoniales
              </p>
            </div>
          </div>
        </div>

        {/* Registry Process */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Proceso de Registro</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <DocumentTextIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Identificación</h3>
              <p className="text-sm text-gray-600">Localización y catalogación inicial del elemento patrimonial</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CameraIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Documentación</h3>
              <p className="text-sm text-gray-600">Registro fotográfico y descripción detallada</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ArchiveBoxIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Catalogación</h3>
              <p className="text-sm text-gray-600">Clasificación y almacenamiento en base de datos</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Georreferenciación</h3>
              <p className="text-sm text-gray-600">Ubicación precisa en el mapa patrimonial</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-primary to-primary-hover rounded-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">¿Conoces algún elemento patrimonial?</h2>
          <p className="text-lg mb-6">
            Ayúdanos a completar nuestro registro patrimonial reportando elementos que deberían ser catalogados
          </p>
          <div className="space-x-4">
            <button className="bg-white text-primary px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Reportar Elemento
            </button>
            <button className="border border-white text-white px-6 py-2 rounded-lg font-medium hover:bg-white hover:text-primary transition-colors">
              Guía de Registro
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="text-3xl font-bold text-primary mb-2">{registries.length}</div>
            <div className="text-gray-600">Elementos Registrados</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="text-3xl font-bold text-green-600">
              {registries.filter(r => r.status === 'bueno').length}
            </div>
            <div className="text-gray-600">Buen Estado</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="text-3xl font-bold text-yellow-600">
              {registries.filter(r => r.status === 'regular').length}
            </div>
            <div className="text-gray-600">Estado Regular</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="text-3xl font-bold text-red-600">
              {registries.filter(r => r.status === 'malo').length}
            </div>
            <div className="text-gray-600">Mal Estado</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatrimonyRegistry;