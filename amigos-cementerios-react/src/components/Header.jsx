import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon, UserIcon } from '@heroicons/react/24/outline';
import LoginModal from './LoginModal';

const Header = ({ isAuthenticated, setIsAuthenticated }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: 'Nosotros', href: '#about', type: 'scroll' },
    { name: 'Misión & Visión', href: '#mission', type: 'scroll' },
    { name: 'Actividades', href: '#activities', type: 'scroll' },
    { name: 'Galería', href: '#gallery', type: 'scroll' },
    { name: 'Equipo', href: '#team', type: 'scroll' },
    { name: 'Blog', href: '/blog', type: 'route' },
    { name: 'Biblioteca', href: '/biblioteca', type: 'route' },
    { name: 'Concurso Fotográfico', href: '/concurso-fotografico', type: 'route' },
    { name: 'Registro Patrimonial', href: '/registro-patrimonial', type: 'route' },
    { name: 'Contacto', href: '#contact', type: 'scroll' },
  ];

  const handleNavClick = (item) => {
    if (item.type === 'scroll' && location.pathname === '/') {
      // Handle smooth scrolling for home page
      const element = document.querySelector(item.href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 w-full bg-white shadow-lg z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="/img/logos/footer.png"
                alt="Amigas y Amigos por los Cementerios"
                className="h-12 w-auto"
              />
              <div className="hidden lg:block">
                <h1 className="text-xl font-bold text-dark">
                  AGRUPACIÓN <span className="text-primary">CULTURAL</span>
                </h1>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center space-x-6">
              {navigationItems.map((item) => (
                item.type === 'route' ? (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-dark hover:text-primary transition-colors duration-300 font-medium"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item);
                    }}
                    className="text-dark hover:text-primary transition-colors duration-300 font-medium cursor-pointer"
                  >
                    {item.name}
                  </a>
                )
              ))}
            </nav>

            {/* Auth & Mobile Menu Button */}
            <div className="flex items-center space-x-4">
              {/* Admin/Login Button */}
              {isAuthenticated ? (
                <Link
                  to="/admin"
                  className="hidden md:flex items-center space-x-2 text-primary hover:text-primary-hover transition-colors duration-300"
                >
                  <UserIcon className="h-5 w-5" />
                  <span>Admin</span>
                </Link>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="hidden md:flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors duration-300"
                >
                  <UserIcon className="h-5 w-5" />
                  <span>Login</span>
                </button>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="xl:hidden p-2 rounded-md text-gray-600 hover:text-primary focus:outline-none"
              >
                {isMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="xl:hidden py-4 border-t">
              <nav className="space-y-2">
                {navigationItems.map((item) => (
                  item.type === 'route' ? (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-4 py-2 text-dark hover:text-primary hover:bg-gray-50 rounded-md transition-colors duration-300"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item);
                      }}
                      className="block px-4 py-2 text-dark hover:text-primary hover:bg-gray-50 rounded-md transition-colors duration-300 cursor-pointer"
                    >
                      {item.name}
                    </a>
                  )
                ))}

                {/* Mobile Auth */}
                <div className="pt-4 border-t">
                  {isAuthenticated ? (
                    <Link
                      to="/admin"
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-4 py-2 text-primary hover:bg-gray-50 rounded-md transition-colors duration-300"
                    >
                      Panel de Administración
                    </Link>
                  ) : (
                    <button
                      onClick={() => {
                        setIsLoginModalOpen(true);
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md transition-colors duration-300"
                    >
                      Iniciar Sesión
                    </button>
                  )}
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={setIsAuthenticated}
      />
    </>
  );
};

export default Header;