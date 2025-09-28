import { Link } from 'react-router-dom';

const Footer = () => {
  const partnerLogos = [
    { name: 'Valparaíso Creativo', src: '/img/logos/Valparaíso Creativo.png' },
    { name: 'Servicio Nacional Patrimonio Cultural', src: '/img/logos/servicio nacional patrimonio cultural.png' },
    { name: 'Gobierno Regional Valparaíso', src: '/img/logos/Gobierno regional valparaiso.jpeg' },
    { name: 'Municipalidad La Cruz', src: '/img/logos/LOGO MUNI LA CRUZ.png' },
    { name: 'Corporación Patrimonial La Calera', src: '/img/logos/corporacion patrimonial la calera.jpg' },
    { name: 'DUOC UC', src: '/img/logos/duoc.jpg' },
    { name: 'DIN 399', src: '/img/logos/din399.jpg' },
    { name: 'Parque Cultural', src: '/img/logos/Parquecultural.png' }
  ];

  return (
    <footer id="contact" className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Organization Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="/img/logos/footer.png"
                alt="Amigas y Amigos por los Cementerios"
                className="h-12 w-auto"
              />
              <div>
                <h3 className="text-xl font-bold">
                  AMIGAS & AMIGOS POR LOS CEMENTERIOS
                </h3>
                <p className="text-gray-400">Agrupación Cultural</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Una Agrupación Cultural Comunitaria sin fines de lucro dedicada a resguardar,
              visibilizar y poner en valor los patrimonios funerarios de Valparaíso y la región.
            </p>
            <div className="space-y-2 text-gray-300">
              <p>📍 Cerro Panteón, Valparaíso, Chile</p>
              <p>📧 contacto@amigosporloscementerios.cl</p>
              <p>📱 +56 9 XXXX XXXX</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-gray-300 hover:text-primary transition-colors">
                  Nosotros
                </a>
              </li>
              <li>
                <a href="#mission" className="text-gray-300 hover:text-primary transition-colors">
                  Misión & Visión
                </a>
              </li>
              <li>
                <a href="#activities" className="text-gray-300 hover:text-primary transition-colors">
                  Actividades
                </a>
              </li>
              <li>
                <a href="#gallery" className="text-gray-300 hover:text-primary transition-colors">
                  Galería
                </a>
              </li>
              <li>
                <a href="#team" className="text-gray-300 hover:text-primary transition-colors">
                  Equipo
                </a>
              </li>
            </ul>
          </div>

          {/* New Features */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Nuevas Secciones</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-primary transition-colors">
                  Blog Patrimonial
                </Link>
              </li>
              <li>
                <Link to="/biblioteca" className="text-gray-300 hover:text-primary transition-colors">
                  Biblioteca Digital
                </Link>
              </li>
              <li>
                <Link to="/concurso-fotografico" className="text-gray-300 hover:text-primary transition-colors">
                  Concurso Fotográfico
                </Link>
              </li>
              <li>
                <Link to="/registro-patrimonial" className="text-gray-300 hover:text-primary transition-colors">
                  Registro Patrimonial
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Partners Section */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <h4 className="text-lg font-semibold mb-6 text-center">Colaboradores y Aliados</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 items-center">
            {partnerLogos.map((partner, index) => (
              <div key={index} className="flex items-center justify-center p-2 bg-white rounded-lg">
                <img
                  src={partner.src}
                  alt={partner.name}
                  className="h-8 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  title={partner.name}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 bg-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Amigas y Amigos por los Cementerios. Todos los derechos reservados.
            </p>
            <div className="flex space-x-4 mt-2 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                Política de Privacidad
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                Términos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;