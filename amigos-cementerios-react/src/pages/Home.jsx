import { useEffect, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, PlayIcon } from '@heroicons/react/24/outline';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Hero carousel images
  const heroImages = [
    '/img/portfolio/programa/act1.jpg',
    '/img/portfolio/programa/act2.jpg',
    '/img/portfolio/programa/act3.png',
  ];

  // Gallery data
  const galleryCategories = [
    {
      id: 'cementerio1',
      name: 'Cementerio Nº1',
      images: [
        '/img/portfolio/cementerio1/La pietá cementerio n°1.jpg',
        '/img/portfolio/cementerio1/cem-n1-hor1.jpg',
        '/img/portfolio/cementerio1/cem-n1-hor2.jpg',
        '/img/portfolio/cementerio1/cem-n1-hor3.jpg',
      ]
    },
    {
      id: 'cementerio2',
      name: 'Cementerio Nº2',
      images: [
        '/img/portfolio/cementerio2/cem-n2-hor1.jpg',
        '/img/portfolio/cementerio2/cementerio N°2.jpg',
        '/img/portfolio/cementerio2/disi1.jpg',
        '/img/portfolio/cementerio2/disi2.jpg',
      ]
    },
    {
      id: 'actividades',
      name: 'Actividades',
      images: [
        '/img/portfolio/actividades/20191213_Tania Care , Florencia Alvarado.jpg',
        '/img/portfolio/actividades/Lanzamiento libro Upla..jpg',
        '/img/portfolio/actividades/Esteban Jiménez Cementerio Disidentes.jpg',
        '/img/portfolio/actividades/Eduardo Vergara y Aref Cosma Cementerio N°1.jpg',
      ]
    }
  ];

  // Team members
  const teamMembers = [
    {
      name: 'Bernarda Zuñiga',
      role: 'Presidenta',
      image: '/img/Directiva/Bernarda Zuñiga.jpg'
    },
    {
      name: 'Eduardo Vergara',
      role: 'Vicepresidente',
      image: '/img/Directiva/Eduardo Vergara.jpg'
    },
    {
      name: 'Paula Parada',
      role: 'Secretaria',
      image: '/img/Directiva/paula parada secretaria 2024.jpg'
    },
    {
      name: 'Juan José Caro',
      role: 'Tesorero',
      image: '/img/Directiva/juan josé Caro Tesorero 2024.jpg'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-screen bg-gray-900 overflow-hidden">
        {/* Background Image Carousel */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            </div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              AMIGAS <span className="text-primary">&</span> AMIGOS POR LOS{' '}
              <span className="text-primary">CEMENTERIOS</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Preservando el patrimonio funerario de Valparaíso
            </p>
            <a
              href="#about"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <span>Conoce Más</span>
              <PlayIcon className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Carousel Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition-all"
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition-all"
        >
          <ChevronRightIcon className="h-6 w-6" />
        </button>

        {/* Carousel Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-primary' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div
              className="h-96 bg-cover bg-center rounded-lg shadow-lg"
              style={{ backgroundImage: 'url("/img/grupal.jpg")' }}
            ></div>
            <div>
              <div className="section-title text-left">
                <h2>Nosotros</h2>
                <p>Presentación</p>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-3">¿Qué somos?</h3>
                  <p className="text-gray-600">
                    Una Agrupación Cultural Comunitaria sin fines de lucro nacida en el año 2017
                    en el cerro Panteón de Valparaíso.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3">¿Cuál es nuestro propósito?</h3>
                  <p className="text-gray-600">
                    Reunir a vecinos, gestores e instituciones públicas con el fin de resguardar,
                    visibilizar y poner en valor los patrimonios funerarios de la ciudad de
                    Valparaíso y la región.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3">¿Qué hacemos?</h3>
                  <p className="text-gray-600">
                    Realizamos actividades culturales, de difusión, seminarios, publicaciones,
                    libros patrimoniales, recorridos turísticos, investigación y proyectos de restauración.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section id="mission" className="py-20">
        <div className="container mx-auto px-4">
          <div className="section-title">
            <h2>Misión y Visión</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Misión</h3>
                  <p className="text-gray-600">
                    Entendemos los cementerios patrimoniales como espacios de invaluable valor particular
                    que a través de su arquitectura, obras de arte, flora botánica, historia de la ciudad,
                    ritos funerarios y las tradiciones de la comunidad, configuran un patrimonio material
                    e inmaterial de gran valor para la ciudad y el país.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4">Visión</h3>
                  <p className="text-gray-600">
                    Salvaguardar los cementerios patrimoniales de Valparaíso, a través de la restauración,
                    protección y puesta en valor de las necrópolis, comprendiéndolos como lugares de encuentro
                    comunitario, cultural, turismo patrimonial y lugares de memoria.
                  </p>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <img
                src="/img/about.png"
                alt="Misión y Visión"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section id="activities" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="section-title">
            <h2>Programación Mensual</h2>
            <p>Actividades</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="swiper-container">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <img
                    src="/img/portfolio/programa/patri1.png"
                    alt="Patrimonio 1"
                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                  />
                  <img
                    src="/img/portfolio/programa/patri2.png"
                    alt="Patrimonio 2"
                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6">Nuestras Actividades</h3>
              <div className="space-y-4">
                <div className="p-4 bg-white rounded-lg shadow">
                  <h4 className="font-bold text-lg mb-2">Visitas Guiadas</h4>
                  <p className="text-gray-600">
                    Recorridos educativos por los cementerios patrimoniales de Valparaíso.
                  </p>
                </div>

                <div className="p-4 bg-white rounded-lg shadow">
                  <h4 className="font-bold text-lg mb-2">Actividades Necropoéticas</h4>
                  <p className="text-gray-600">
                    Eventos que combinan poesía y patrimonio funerario.
                  </p>
                </div>

                <div className="p-4 bg-white rounded-lg shadow">
                  <h4 className="font-bold text-lg mb-2">Seminarios y Talleres</h4>
                  <p className="text-gray-600">
                    Espacios de formación y reflexión sobre patrimonio cultural.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20">
        <div className="container mx-auto px-4">
          <div className="section-title">
            <h2>Galería</h2>
            <p>Nuestro trabajo visual</p>
          </div>

          {galleryCategories.map((category) => (
            <div key={category.id} className="mb-12">
              <h3 className="text-2xl font-bold mb-6 text-center">{category.name}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {category.images.map((image, index) => (
                  <div key={index} className="portfolio-item">
                    <img src={image} alt={`${category.name} ${index + 1}`} />
                    <div className="portfolio-overlay">
                      <div className="text-white text-center">
                        <h4 className="text-lg font-bold">{category.name}</h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="section-title">
            <h2>Nuestro Equipo</h2>
            <p>Directiva 2024</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 object-cover rounded-full mx-auto shadow-lg"
                  />
                </div>
                <h4 className="text-lg font-bold">{member.name}</h4>
                <p className="text-primary font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;