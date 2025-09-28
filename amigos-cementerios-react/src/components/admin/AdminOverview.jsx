import { Link } from 'react-router-dom';
import {
  DocumentTextIcon,
  BookOpenIcon,
  CameraIcon,
  ArchiveBoxIcon,
  UsersIcon,
  PhotoIcon,
  EyeIcon,
  HeartIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

const AdminOverview = ({ quickActions }) => {
  const stats = [
    { name: 'Artículos Publicados', value: '24', change: '+12%', changeType: 'increase', icon: DocumentTextIcon },
    { name: 'Libros en Biblioteca', value: '18', change: '+3', changeType: 'increase', icon: BookOpenIcon },
    { name: 'Fotos en Galería', value: '156', change: '+8', changeType: 'increase', icon: PhotoIcon },
    { name: 'Registros Patrimoniales', value: '42', change: '+5', changeType: 'increase', icon: ArchiveBoxIcon },
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'blog',
      title: 'Nuevo artículo: "La Importancia del Patrimonio Funerario"',
      author: 'Eduardo Vergara',
      time: 'Hace 2 horas',
      icon: DocumentTextIcon,
      iconBg: 'bg-blue-500'
    },
    {
      id: 2,
      type: 'library',
      title: 'Libro agregado: "Epitafios Olvidados"',
      author: 'Patricia Cortez',
      time: 'Hace 4 horas',
      icon: BookOpenIcon,
      iconBg: 'bg-green-500'
    },
    {
      id: 3,
      type: 'gallery',
      title: '8 nuevas fotos del Cementerio Nº1',
      author: 'Aref Cosma',
      time: 'Ayer',
      icon: PhotoIcon,
      iconBg: 'bg-purple-500'
    },
    {
      id: 4,
      type: 'contest',
      title: 'Nueva participación en concurso fotográfico',
      author: 'Usuario Anónimo',
      time: 'Hace 2 días',
      icon: CameraIcon,
      iconBg: 'bg-yellow-500'
    }
  ];

  const popularContent = [
    {
      title: 'La Importancia del Patrimonio Funerario en Valparaíso',
      views: 1250,
      likes: 89,
      comments: 23,
      type: 'blog'
    },
    {
      title: 'Historia del Cementerio Disidentes',
      views: 1100,
      likes: 76,
      comments: 18,
      type: 'blog'
    },
    {
      title: 'Restauración del Cementerio Nº2',
      views: 675,
      likes: 45,
      comments: 12,
      type: 'blog'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Panel de Administración</h1>
        <p className="text-gray-600">
          Bienvenido al sistema de gestión de contenido de Amigas y Amigos por los Cementerios
        </p>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.name}
              to={action.href}
              className="relative rounded-lg border-2 border-dashed border-gray-300 p-4 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
            >
              <div className={`mx-auto h-12 w-12 rounded-full ${action.color} flex items-center justify-center`}>
                <action.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <span className="mt-2 block text-sm font-medium text-gray-900">{action.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <stat.icon className="h-8 w-8 text-gray-400" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                    <div
                      className={`ml-2 flex items-baseline text-sm font-semibold ${
                        stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {stat.change}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Actividad Reciente</h3>
            <div className="flow-root">
              <ul className="-mb-8">
                {recentActivity.map((activity, activityIdx) => (
                  <li key={activity.id}>
                    <div className="relative pb-8">
                      {activityIdx !== recentActivity.length - 1 ? (
                        <span
                          className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                          aria-hidden="true"
                        />
                      ) : null}
                      <div className="relative flex space-x-3">
                        <div>
                          <span className={`h-8 w-8 rounded-full ${activity.iconBg} flex items-center justify-center ring-8 ring-white`}>
                            <activity.icon className="h-4 w-4 text-white" aria-hidden="true" />
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                          <div>
                            <p className="text-sm text-gray-500">{activity.title}</p>
                            <p className="text-xs text-gray-400">por {activity.author}</p>
                          </div>
                          <div className="text-right text-sm whitespace-nowrap text-gray-500">
                            <time>{activity.time}</time>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Popular Content */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Contenido Popular</h3>
            <div className="space-y-4">
              {popularContent.map((content, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{content.title}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <div className="flex items-center space-x-1 text-gray-500">
                        <EyeIcon className="h-4 w-4" />
                        <span className="text-xs">{content.views}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-500">
                        <HeartIcon className="h-4 w-4" />
                        <span className="text-xs">{content.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-500">
                        <ChatBubbleLeftRightIcon className="h-4 w-4" />
                        <span className="text-xs">{content.comments}</span>
                      </div>
                    </div>
                  </div>
                  <div className="ml-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                      {content.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Estado del Sistema</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <div className="h-4 w-4 bg-green-400 rounded-full"></div>
            <span className="text-sm text-gray-600">Sitio Web: Operativo</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="h-4 w-4 bg-green-400 rounded-full"></div>
            <span className="text-sm text-gray-600">Base de Datos: Conectada</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="h-4 w-4 bg-yellow-400 rounded-full"></div>
            <span className="text-sm text-gray-600">Almacenamiento: 78% usado</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;