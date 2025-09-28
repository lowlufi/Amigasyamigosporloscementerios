import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CalendarIcon, UserIcon, EyeIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample blog posts data (in real app, this would come from an API)
  const samplePosts = [
    {
      id: 1,
      title: 'La Importancia del Patrimonio Funerario en Valparaíso',
      excerpt: 'Los cementerios de Valparaíso no son solo lugares de descanso final, sino verdaderos museos al aire libre que guardan la historia de nuestra ciudad...',
      content: 'Contenido completo del artículo...',
      author: 'Eduardo Vergara',
      date: '2024-01-15',
      category: 'patrimonio',
      image: '/img/portfolio/cementerio1/La pietá cementerio n°1.jpg',
      views: 1250,
      featured: true
    },
    {
      id: 2,
      title: 'Necropoética: La Poesía en los Cementerios',
      excerpt: 'La necropoética es una forma única de conectar con el patrimonio funerario a través del arte de la palabra escrita...',
      content: 'Contenido completo del artículo...',
      author: 'Carlos Smiths',
      date: '2024-01-10',
      category: 'necropoetica',
      image: '/img/portfolio/actividades/Poeta Carlos Smiths Necropoética Cementerio Disidentes.jpg',
      views: 890,
      featured: false
    },
    {
      id: 3,
      title: 'Restauración del Cementerio Nº2: Avances y Desafíos',
      excerpt: 'Un recorrido por los trabajos de restauración que se están llevando a cabo en uno de los cementerios más emblemáticos de Valparaíso...',
      content: 'Contenido completo del artículo...',
      author: 'Bernarda Zuñiga',
      date: '2024-01-08',
      category: 'restauracion',
      image: '/img/portfolio/cementerio2/cementerio N°2.jpg',
      views: 675,
      featured: true
    },
    {
      id: 4,
      title: 'Actividades Comunitarias: Conectando con el Patrimonio',
      excerpt: 'Las actividades comunitarias son fundamentales para crear conciencia sobre la importancia de preservar nuestro patrimonio funerario...',
      content: 'Contenido completo del artículo...',
      author: 'Paula Parada',
      date: '2024-01-05',
      category: 'comunidad',
      image: '/img/portfolio/actividades/Consejo de la Cultura Equipo de Patrimonio Colaboradores.jpg',
      views: 432,
      featured: false
    },
    {
      id: 5,
      title: 'Historia del Cementerio Disidentes de Valparaíso',
      excerpt: 'Un viaje en el tiempo para conocer la historia y la importancia cultural del Cementerio de Disidentes...',
      content: 'Contenido completo del artículo...',
      author: 'Adolfo López',
      date: '2024-01-03',
      category: 'historia',
      image: '/img/portfolio/cementerio2/disi1.jpg',
      views: 1100,
      featured: false
    }
  ];

  const blogCategories = [
    { id: 'all', name: 'Todas las Categorías', count: 5 },
    { id: 'patrimonio', name: 'Patrimonio', count: 1 },
    { id: 'necropoetica', name: 'Necropoética', count: 1 },
    { id: 'restauracion', name: 'Restauración', count: 1 },
    { id: 'comunidad', name: 'Comunidad', count: 1 },
    { id: 'historia', name: 'Historia', count: 1 }
  ];

  useEffect(() => {
    setPosts(samplePosts);
    setCategories(blogCategories);
  }, []);

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = posts.filter(post => post.featured);

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Blog Patrimonial
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Columnas de opinión, reflexiones y noticias sobre el patrimonio funerario de Valparaíso
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Posts */}
            {featuredPosts.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Artículos Destacados</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {featuredPosts.slice(0, 2).map(post => (
                    <article key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                      <div className="aspect-w-16 aspect-h-9">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                          <div className="flex items-center space-x-1">
                            <UserIcon className="h-4 w-4" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <CalendarIcon className="h-4 w-4" />
                            <span>{new Date(post.date).toLocaleDateString('es-ES')}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <EyeIcon className="h-4 w-4" />
                            <span>{post.views}</span>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-primary transition-colors">
                          <Link to={`/blog/${post.id}`}>{post.title}</Link>
                        </h3>
                        <p className="text-gray-600 mb-4">{post.excerpt}</p>
                        <Link
                          to={`/blog/${post.id}`}
                          className="inline-flex items-center space-x-2 text-primary hover:text-primary-hover font-medium"
                        >
                          <span>Leer más</span>
                          <ChevronRightIcon className="h-4 w-4" />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {/* Search and Filter */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Buscar artículos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name} ({category.count})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* All Posts */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedCategory === 'all' ? 'Todos los Artículos' : `Categoría: ${categories.find(c => c.id === selectedCategory)?.name}`}
              </h2>

              {filteredPosts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">
                    No se encontraron artículos que coincidan con tu búsqueda.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6">
                  {filteredPosts.map(post => (
                    <article key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                      <div className="md:flex">
                        <div className="md:w-1/3">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-48 md:h-full object-cover"
                          />
                        </div>
                        <div className="p-6 md:w-2/3">
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                            <div className="flex items-center space-x-1">
                              <UserIcon className="h-4 w-4" />
                              <span>{post.author}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <CalendarIcon className="h-4 w-4" />
                              <span>{new Date(post.date).toLocaleDateString('es-ES')}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <EyeIcon className="h-4 w-4" />
                              <span>{post.views}</span>
                            </div>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-primary transition-colors">
                            <Link to={`/blog/${post.id}`}>{post.title}</Link>
                          </h3>
                          <p className="text-gray-600 mb-4">{post.excerpt}</p>
                          <Link
                            to={`/blog/${post.id}`}
                            className="inline-flex items-center space-x-2 text-primary hover:text-primary-hover font-medium"
                          >
                            <span>Leer más</span>
                            <ChevronRightIcon className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-8">
              {/* Categories */}
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Categorías</h3>
                <ul className="space-y-2">
                  {categories.map(category => (
                    <li key={category.id}>
                      <button
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                          selectedCategory === category.id
                            ? 'bg-primary text-white'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {category.name} ({category.count})
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recent Posts */}
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Artículos Recientes</h3>
                <div className="space-y-4">
                  {posts.slice(0, 3).map(post => (
                    <div key={post.id} className="flex space-x-3">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 mb-1">
                          <Link to={`/blog/${post.id}`} className="hover:text-primary">
                            {post.title}
                          </Link>
                        </h4>
                        <p className="text-xs text-gray-500">
                          {new Date(post.date).toLocaleDateString('es-ES')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Call to Action */}
              <div className="bg-gradient-to-br from-primary to-primary-hover p-6 rounded-lg text-white">
                <h3 className="text-lg font-bold mb-2">¿Quieres contribuir?</h3>
                <p className="text-sm mb-4">
                  Únete a nuestro comité editorial y comparte tus conocimientos sobre patrimonio funerario.
                </p>
                <Link
                  to="/admin"
                  className="inline-block bg-white text-primary px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  Únete al Comité
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;