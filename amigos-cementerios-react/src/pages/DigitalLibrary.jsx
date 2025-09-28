import { useState } from 'react';
import { BookOpenIcon, EyeIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

const DigitalLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const books = [
    {
      id: 1,
      title: 'Epitafios Olvidados',
      author: 'Patricia Cortez & Eduardo Vergara',
      category: 'historia',
      description: 'Una recopilación de epitafios históricos de los cementerios de Valparaíso.',
      year: 2023,
      pages: 156,
      format: 'PDF',
      price: 15000,
      cover: '/img/portfolio/actividades/Patricia Cortez -Eduardo Vergara Libro Epitafios Olvidados.jpg',
      available: true,
      preview: true
    },
    {
      id: 2,
      title: 'Sudamerikan Zombie',
      author: 'Varios Autores',
      category: 'literatura',
      description: 'Antología de cuentos sobre muerte y tradiciones funerarias en Sudamérica.',
      year: 2022,
      pages: 234,
      format: 'PDF',
      price: 18000,
      cover: '/img/portfolio/actividades/Libro Sudamerikan Zombie.jpg',
      available: true,
      preview: true
    },
    {
      id: 3,
      title: 'Patrimonio Funerario de Valparaíso',
      author: 'Agrupación Cultural',
      category: 'patrimonio',
      description: 'Guía completa del patrimonio funerario de la región de Valparaíso.',
      year: 2023,
      pages: 189,
      format: 'PDF',
      price: 20000,
      cover: '/img/portfolio/cementerio1/La pietá cementerio n°1.jpg',
      available: true,
      preview: false
    },
    {
      id: 4,
      title: 'Necropoética: Arte y Muerte',
      author: 'Carlos Smiths',
      category: 'poesia',
      description: 'Colección de poemas inspirados en la tradición funeraria porteña.',
      year: 2024,
      pages: 98,
      format: 'PDF',
      price: 12000,
      cover: '/img/portfolio/actividades/Poeta Carlos Smiths Necropoética Cementerio Disidentes.jpg',
      available: false,
      preview: true
    }
  ];

  const categories = [
    { id: 'all', name: 'Todas las categorías' },
    { id: 'historia', name: 'Historia' },
    { id: 'literatura', name: 'Literatura' },
    { id: 'patrimonio', name: 'Patrimonio' },
    { id: 'poesia', name: 'Poesía' },
    { id: 'investigacion', name: 'Investigación' }
  ];

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <BookOpenIcon className="mx-auto h-16 w-16 text-primary mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Biblioteca Digital
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Accede a nuestra colección de libros, investigaciones y publicaciones sobre patrimonio funerario
            </p>
            <div className="max-w-md mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar libros..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <BookOpenIcon className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
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

        {/* Books Grid */}
        {filteredBooks.length === 0 ? (
          <div className="text-center py-12">
            <BookOpenIcon className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg">
              No se encontraron libros que coincidan con tu búsqueda.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBooks.map(book => (
              <div key={book.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="aspect-w-3 aspect-h-4">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="mb-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary bg-opacity-10 text-primary capitalize">
                      {book.category}
                    </span>
                    {!book.available && (
                      <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Próximamente
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-2">{book.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">por {book.author}</p>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-3">{book.description}</p>

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span>{book.year}</span>
                    <span>{book.pages} páginas</span>
                    <span>{book.format}</span>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-bold text-primary">
                        ${book.price.toLocaleString('es-CL')} CLP
                      </span>
                    </div>

                    <div className="space-y-2">
                      {book.preview && (
                        <button className="w-full flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors">
                          <EyeIcon className="h-4 w-4" />
                          <span>Vista Previa</span>
                        </button>
                      )}

                      {book.available ? (
                        <button className="w-full flex items-center justify-center space-x-2 bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg transition-colors">
                          <ShoppingCartIcon className="h-4 w-4" />
                          <span>Comprar</span>
                        </button>
                      ) : (
                        <button disabled className="w-full flex items-center justify-center space-x-2 bg-gray-300 text-gray-500 px-4 py-2 rounded-lg cursor-not-allowed">
                          <span>No Disponible</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-primary to-primary-hover rounded-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">¿Tienes una publicación?</h2>
          <p className="text-lg mb-6">
            Únete a nuestro catálogo y comparte tus investigaciones sobre patrimonio funerario
          </p>
          <div className="space-x-4">
            <button className="bg-white text-primary px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Enviar Propuesta
            </button>
            <button className="border border-white text-white px-6 py-2 rounded-lg font-medium hover:bg-white hover:text-primary transition-colors">
              Más Información
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="text-3xl font-bold text-primary mb-2">{books.length}</div>
            <div className="text-gray-600">Publicaciones</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="text-3xl font-bold text-green-600">
              {books.filter(b => b.available).length}
            </div>
            <div className="text-gray-600">Disponibles</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="text-3xl font-bold text-blue-600">
              {books.reduce((sum, book) => sum + book.pages, 0)}
            </div>
            <div className="text-gray-600">Total Páginas</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="text-3xl font-bold text-purple-600">
              {categories.length - 1}
            </div>
            <div className="text-gray-600">Categorías</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalLibrary;