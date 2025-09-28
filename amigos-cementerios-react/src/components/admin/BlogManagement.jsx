import { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';

const BlogManagement = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'La Importancia del Patrimonio Funerario en Valparaíso',
      author: 'Eduardo Vergara',
      category: 'patrimonio',
      status: 'published',
      publishDate: '2024-01-15',
      views: 1250,
      excerpt: 'Los cementerios de Valparaíso no son solo lugares de descanso final...',
      image: '/img/portfolio/cementerio1/La pietá cementerio n°1.jpg'
    },
    {
      id: 2,
      title: 'Necropoética: La Poesía en los Cementerios',
      author: 'Carlos Smiths',
      category: 'necropoetica',
      status: 'published',
      publishDate: '2024-01-10',
      views: 890,
      excerpt: 'La necropoética es una forma única de conectar con el patrimonio...',
      image: '/img/portfolio/actividades/Poeta Carlos Smiths Necropoética Cementerio Disidentes.jpg'
    },
    {
      id: 3,
      title: 'Restauración del Cementerio Nº2: Avances y Desafíos',
      author: 'Bernarda Zuñiga',
      category: 'restauracion',
      status: 'draft',
      publishDate: '2024-01-08',
      views: 0,
      excerpt: 'Un recorrido por los trabajos de restauración que se están llevando...',
      image: '/img/portfolio/cementerio2/cementerio N°2.jpg'
    }
  ]);

  const [selectedPosts, setSelectedPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Todas las categorías' },
    { id: 'patrimonio', name: 'Patrimonio' },
    { id: 'necropoetica', name: 'Necropoética' },
    { id: 'restauracion', name: 'Restauración' },
    { id: 'comunidad', name: 'Comunidad' },
    { id: 'historia', name: 'Historia' }
  ];

  const statuses = [
    { id: 'all', name: 'Todos los estados' },
    { id: 'published', name: 'Publicado' },
    { id: 'draft', name: 'Borrador' },
    { id: 'scheduled', name: 'Programado' }
  ];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || post.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || post.category === filterCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleDeletePost = (postId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este artículo?')) {
      setPosts(posts.filter(post => post.id !== postId));
      setSelectedPosts(selectedPosts.filter(id => id !== postId));
    }
  };

  const handleBulkDelete = () => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar ${selectedPosts.length} artículo(s)?`)) {
      setPosts(posts.filter(post => !selectedPosts.includes(post.id)));
      setSelectedPosts([]);
    }
  };

  const togglePostSelection = (postId) => {
    setSelectedPosts(prev =>
      prev.includes(postId)
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const toggleSelectAll = () => {
    setSelectedPosts(
      selectedPosts.length === filteredPosts.length
        ? []
        : filteredPosts.map(post => post.id)
    );
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'published':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Publicado</span>;
      case 'draft':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Borrador</span>;
      case 'scheduled':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Programado</span>;
      default:
        return null;
    }
  };

  return (
    <Routes>
      <Route index element={
        <div className="space-y-6">
          {/* Header */}
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Gestión del Blog</h1>
              <p className="text-gray-600">Administra artículos y columnas de opinión</p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Link
                to="/admin/blog/nuevo"
                className="inline-flex items-center space-x-2 bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                <PlusIcon className="h-5 w-5" />
                <span>Nuevo Artículo</span>
              </Link>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar artículos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {statuses.map(status => (
                    <option key={status.id} value={status.id}>{status.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Bulk Actions */}
            {selectedPosts.length > 0 && (
              <div className="mt-4 flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <span className="text-sm text-blue-800">
                  {selectedPosts.length} artículo(s) seleccionado(s)
                </span>
                <button
                  onClick={handleBulkDelete}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Eliminar seleccionados
                </button>
              </div>
            )}
          </div>

          {/* Posts Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={selectedPosts.length === filteredPosts.length && filteredPosts.length > 0}
                        onChange={toggleSelectAll}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Artículo
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Autor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Categoría
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vistas
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPosts.map((post) => (
                    <tr key={post.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedPosts.includes(post.id)}
                          onChange={() => togglePostSelection(post.id)}
                          className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="h-12 w-12 object-cover rounded-lg"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {post.title}
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                              {post.excerpt}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {post.author}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                          {post.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(post.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center space-x-1">
                          <EyeIcon className="h-4 w-4 text-gray-400" />
                          <span>{post.views}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(post.publishDate).toLocaleDateString('es-ES')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <Link
                            to={`/blog/${post.id}`}
                            className="text-gray-400 hover:text-gray-600"
                            title="Ver artículo"
                          >
                            <EyeIcon className="h-4 w-4" />
                          </Link>
                          <Link
                            to={`/admin/blog/editar/${post.id}`}
                            className="text-primary hover:text-primary-hover"
                            title="Editar artículo"
                          >
                            <PencilIcon className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => handleDeletePost(post.id)}
                            className="text-red-400 hover:text-red-600"
                            title="Eliminar artículo"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No se encontraron artículos que coincidan con los filtros.</p>
              </div>
            )}
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-2xl font-bold text-gray-900">{posts.length}</div>
              <div className="text-gray-600">Total de artículos</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-2xl font-bold text-green-600">
                {posts.filter(p => p.status === 'published').length}
              </div>
              <div className="text-gray-600">Publicados</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-2xl font-bold text-yellow-600">
                {posts.filter(p => p.status === 'draft').length}
              </div>
              <div className="text-gray-600">Borradores</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-2xl font-bold text-blue-600">
                {posts.reduce((sum, post) => sum + post.views, 0)}
              </div>
              <div className="text-gray-600">Total de vistas</div>
            </div>
          </div>
        </div>
      } />
      <Route path="nuevo" element={<BlogEditor />} />
      <Route path="editar/:id" element={<BlogEditor />} />
    </Routes>
  );
};

// Simple Blog Editor Component
const BlogEditor = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: 'patrimonio',
    status: 'draft',
    author: 'Eduardo Vergara',
    image: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically save to an API
    console.log('Saving post:', formData);
    navigate('/admin/blog');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Editor de Artículos</h1>
        <Link
          to="/admin/blog"
          className="text-gray-600 hover:text-gray-800"
        >
          ← Volver al listado
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Título del artículo
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Ingresa el título del artículo"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categoría
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="patrimonio">Patrimonio</option>
              <option value="necropoetica">Necropoética</option>
              <option value="restauracion">Restauración</option>
              <option value="comunidad">Comunidad</option>
              <option value="historia">Historia</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Resumen
          </label>
          <textarea
            name="excerpt"
            value={formData.excerpt}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Breve descripción del artículo..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contenido
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            rows={15}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Escribe el contenido del artículo..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Autor
            </label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estado
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="draft">Borrador</option>
              <option value="published">Publicar</option>
              <option value="scheduled">Programar</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Imagen
            </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="URL de la imagen"
            />
          </div>
        </div>

        <div className="flex items-center justify-end space-x-4">
          <Link
            to="/admin/blog"
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Guardar Artículo
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogManagement;