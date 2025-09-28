import { useState } from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import {
  HomeIcon,
  DocumentTextIcon,
  BookOpenIcon,
  CameraIcon,
  ArchiveBoxIcon,
  UsersIcon,
  PhotoIcon,
  Cog6ToothIcon,
  ChartBarIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

// Import admin components
import AdminOverview from '../components/admin/AdminOverview';
import BlogManagement from '../components/admin/BlogManagement';
import LibraryManagement from '../components/admin/LibraryManagement';
import PhotoContestManagement from '../components/admin/PhotoContestManagement';
import PatrimonyManagement from '../components/admin/PatrimonyManagement';
import TeamManagement from '../components/admin/TeamManagement';
import GalleryManagement from '../components/admin/GalleryManagement';
import Settings from '../components/admin/Settings';

const AdminDashboard = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: 'Panel Principal', href: '/admin', icon: HomeIcon, current: location.pathname === '/admin' },
    { name: 'Blog', href: '/admin/blog', icon: DocumentTextIcon, current: location.pathname === '/admin/blog' },
    { name: 'Biblioteca Digital', href: '/admin/biblioteca', icon: BookOpenIcon, current: location.pathname === '/admin/biblioteca' },
    { name: 'Concurso Fotográfico', href: '/admin/concurso', icon: CameraIcon, current: location.pathname === '/admin/concurso' },
    { name: 'Registro Patrimonial', href: '/admin/patrimonio', icon: ArchiveBoxIcon, current: location.pathname === '/admin/patrimonio' },
    { name: 'Equipo', href: '/admin/equipo', icon: UsersIcon, current: location.pathname === '/admin/equipo' },
    { name: 'Galería', href: '/admin/galeria', icon: PhotoIcon, current: location.pathname === '/admin/galeria' },
    { name: 'Configuración', href: '/admin/configuracion', icon: Cog6ToothIcon, current: location.pathname === '/admin/configuracion' },
  ];

  const quickActions = [
    { name: 'Nuevo Artículo', href: '/admin/blog/nuevo', icon: PlusIcon, color: 'bg-blue-500' },
    { name: 'Subir Libro', href: '/admin/biblioteca/nuevo', icon: PlusIcon, color: 'bg-green-500' },
    { name: 'Nueva Foto', href: '/admin/galeria/nueva', icon: PlusIcon, color: 'bg-purple-500' },
    { name: 'Nuevo Registro', href: '/admin/patrimonio/nuevo', icon: PlusIcon, color: 'bg-red-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex min-h-0 flex-1 flex-col bg-gray-800">
          <div className="flex h-16 flex-shrink-0 items-center bg-gray-900 px-4">
            <img
              className="h-8 w-auto"
              src="/img/logos/footer.png"
              alt="Amigas y Amigos por los Cementerios"
            />
            <span className="ml-2 text-white font-bold text-sm">Panel Admin</span>
          </div>
          <div className="flex flex-1 flex-col overflow-y-auto">
            <nav className="flex-1 space-y-1 bg-gray-800 px-2 py-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${
                    item.current
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                >
                  <item.icon
                    className={`${
                      item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300'
                    } mr-3 flex-shrink-0 h-6 w-6`}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="relative z-40 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
          <div className="fixed inset-0 z-40 flex">
            <div className="relative flex w-full max-w-xs flex-1 flex-col bg-gray-800">
              <div className="flex h-16 flex-shrink-0 items-center bg-gray-900 px-4">
                <img
                  className="h-8 w-auto"
                  src="/img/logos/footer.png"
                  alt="Amigas y Amigos por los Cementerios"
                />
                <span className="ml-2 text-white font-bold text-sm">Panel Admin</span>
              </div>
              <div className="flex flex-1 flex-col overflow-y-auto">
                <nav className="flex-1 space-y-1 bg-gray-800 px-2 py-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`${
                        item.current
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                    >
                      <item.icon
                        className={`${
                          item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300'
                        } mr-3 flex-shrink-0 h-6 w-6`}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-white shadow-sm">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Abrir sidebar</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                Última actualización: {new Date().toLocaleDateString('es-ES')}
              </span>
              <Link
                to="/"
                className="bg-primary hover:bg-primary-hover text-white px-3 py-1 rounded-md text-sm font-medium transition-colors"
              >
                Ver Sitio
              </Link>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <Routes>
            <Route index element={<AdminOverview quickActions={quickActions} />} />
            <Route path="blog/*" element={<BlogManagement />} />
            <Route path="biblioteca/*" element={<LibraryManagement />} />
            <Route path="concurso/*" element={<PhotoContestManagement />} />
            <Route path="patrimonio/*" element={<PatrimonyManagement />} />
            <Route path="equipo/*" element={<TeamManagement />} />
            <Route path="galeria/*" element={<GalleryManagement />} />
            <Route path="configuracion" element={<Settings />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;