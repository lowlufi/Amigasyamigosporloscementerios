// URLs de instituciones colaboradoras
const institucionesURLs = {
  'UPLA.png': 'https://www.upla.cl/',
  'Universidad de Valpo.png': 'https://www.uv.cl/',
  'U. CENTRAL.png': 'https://www.ucentral.cl/',
  'AIEP.png': 'https://www.aiep.cl/',
  'duoc.jpg': 'https://www.duoc.cl/',
  'ACCORDES.jpg': 'https://www.acordesmusical.cl/',
  'biblioteca Jorge Farías.jpg': '#',
  'Gobierno regional valparaiso.jpeg': 'https://www.gorevalparaiso.cl/',
  'LOGO MUNI LA CRUZ.png': 'https://lacruz.cl/',
  'Muni valpo.jpg': 'https://www.munivalpo.cl/',
  'calera.png': 'https://lacalera.cl/',
  'servicio nacional patrimonio cultural.png': 'https://www.patrimoniocultural.gob.cl/',
  'LOGO CORFO.png': 'https://www.corfo.cl/',
  'corporacion patrimonial la calera.jpg': '#',
  'din399.jpg': '#',
  'Parquecultural.png': 'https://www.parqueculturaldevalparaiso.cl/',
  'Capsula patrimonial.jpg': 'https://www.capsulapatrimonial.cl/',
  'Logo blanco.png': 'https://www.amigasyamigosporloscementerios.cl/',
  'logo museo histórico..jpg': '#',
  'logo cormuval.jpeg': 'https://www.cormuval.cl/',
  'redchilena.jpg': '#',
  'rediberoamericana.jpg': 'http://redcementeriospatrimoniales.blogspot.com/',
  'Xiloscopio.png': '#'
};

// Función para hacer logos clicables
document.addEventListener('DOMContentLoaded', function() {
  const logoSlides = document.querySelectorAll('.clients .swiper-slide');

  logoSlides.forEach(slide => {
    const img = slide.querySelector('img');
    if (img) {
      const imgSrc = img.getAttribute('src');
      const filename = imgSrc.split('/').pop();
      const url = institucionesURLs[filename];

      if (url && url !== '#') {
        // Crear enlace solo si hay URL válida
        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.setAttribute('aria-label', img.getAttribute('alt'));

        // Envolver imagen con el enlace
        img.parentNode.insertBefore(link, img);
        link.appendChild(img);
      }
    }
  });
});
