/**
* Template Name: Gp
* Template URL: https://bootstrapmade.com/gp-free-multipurpose-html-bootstrap-template/
* Updated: Mar 17 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Lazy loading para imágenes
   */
  const lazyLoadImages = () => {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  };

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Clients Slider
   */
  new Swiper('.clients-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 40
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 60
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 80
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 120
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    // Inicializar lazy loading
    lazyLoadImages();

    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 500,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

})()

// Sistema de registro de fotografías y bitácora
class PhotoRegistry {
  constructor() {
    this.photos = JSON.parse(localStorage.getItem('photoRegistry') || '[]');
    this.initEventListeners();
  }

  addPhoto(photoData) {
    const photo = {
      id: Date.now(),
      ...photoData,
      timestamp: new Date().toISOString(),
      location: photoData.location || 'Cementerios de Valparaíso',
      tags: photoData.tags || [],
      metadata: {
        camera: photoData.camera || '',
        settings: photoData.settings || '',
        weather: photoData.weather || '',
        notes: photoData.notes || ''
      }
    };
    this.photos.push(photo);
    this.saveToStorage();
    return photo;
  }

  getPhotos(filter = {}) {
    let filtered = [...this.photos];
    if (filter.location) {
      filtered = filtered.filter(p => p.location.includes(filter.location));
    }
    if (filter.tags) {
      filtered = filtered.filter(p =>
        filter.tags.some(tag => p.tags.includes(tag))
      );
    }
    return filtered;
  }

  saveToStorage() {
    localStorage.setItem('photoRegistry', JSON.stringify(this.photos));
  }

  exportData() {
    return {
      photos: this.photos,
      exportDate: new Date().toISOString(),
      version: '1.0'
    };
  }

  initEventListeners() {
    document.addEventListener('DOMContentLoaded', () => {
      this.createRegistryInterface();
    });
  }

  createRegistryInterface() {
    const registryHTML = `
      <div id="photo-registry-modal" class="modal fade" tabindex="-1">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Registro de Fotografías</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <form id="photo-registry-form">
                <div class="row">
                  <div class="col-md-6">
                    <label class="form-label">Título</label>
                    <input type="text" class="form-control" name="title" required>
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Ubicación</label>
                    <select class="form-control" name="location">
                      <option value="Cementerio N°1">Cementerio N°1</option>
                      <option value="Cementerio N°2">Cementerio N°2</option>
                      <option value="Cementerio Disidentes">Cementerio Disidentes</option>
                      <option value="Actividades">Actividades</option>
                    </select>
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-md-6">
                    <label class="form-label">Cámara</label>
                    <input type="text" class="form-control" name="camera">
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Configuración</label>
                    <input type="text" class="form-control" name="settings" placeholder="ISO, f/, velocidad">
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-md-6">
                    <label class="form-label">Clima</label>
                    <input type="text" class="form-control" name="weather">
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Tags</label>
                    <input type="text" class="form-control" name="tags" placeholder="Separados por comas">
                  </div>
                </div>
                <div class="mt-3">
                  <label class="form-label">Notas</label>
                  <textarea class="form-control" name="notes" rows="3"></textarea>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button type="button" class="btn btn-primary" onclick="photoRegistry.savePhoto()">Guardar</button>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', registryHTML);
  }

  openRegistryModal(photoTitle = '') {
    const modal = new bootstrap.Modal(document.getElementById('photo-registry-modal'));
    if (photoTitle) {
      document.querySelector('#photo-registry-form input[name="title"]').value = photoTitle;
    }
    modal.show();
  }

  savePhoto() {
    const form = document.getElementById('photo-registry-form');
    const formData = new FormData(form);
    const photoData = {
      title: formData.get('title'),
      location: formData.get('location'),
      camera: formData.get('camera'),
      settings: formData.get('settings'),
      weather: formData.get('weather'),
      tags: formData.get('tags').split(',').map(t => t.trim()).filter(t => t),
      notes: formData.get('notes')
    };

    this.addPhoto(photoData);
    bootstrap.Modal.getInstance(document.getElementById('photo-registry-modal')).hide();
    form.reset();
    this.updateGalleryDisplay();
  }

  updateGalleryDisplay() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
      const img = item.querySelector('img');
      const title = item.querySelector('h4')?.textContent;
      const registeredPhoto = this.photos.find(p => p.title === title);

      if (registeredPhoto) {
        const badge = document.createElement('div');
        badge.className = 'position-absolute top-0 end-0 m-2';
        badge.innerHTML = '<span class="badge bg-success">Registrada</span>';
        item.querySelector('.portfolio-wrap').style.position = 'relative';
        item.querySelector('.portfolio-wrap').appendChild(badge);
      }
    });
  }
}

// Biblioteca Digital
class DigitalLibrary {
  constructor() {
    this.books = JSON.parse(localStorage.getItem('digitalLibrary') || '[]');
    this.initLibrary();
  }

  addBook(bookData) {
    const book = {
      id: Date.now(),
      ...bookData,
      addedDate: new Date().toISOString(),
      downloadCount: 0,
      rating: 0,
      reviews: []
    };
    this.books.push(book);
    this.saveToStorage();
    return book;
  }

  getBooks(filter = {}) {
    let filtered = [...this.books];
    if (filter.category) {
      filtered = filtered.filter(b => b.category === filter.category);
    }
    if (filter.author) {
      filtered = filtered.filter(b => b.author.toLowerCase().includes(filter.author.toLowerCase()));
    }
    if (filter.search) {
      filtered = filtered.filter(b =>
        b.title.toLowerCase().includes(filter.search.toLowerCase()) ||
        b.description.toLowerCase().includes(filter.search.toLowerCase())
      );
    }
    return filtered;
  }

  saveToStorage() {
    localStorage.setItem('digitalLibrary', JSON.stringify(this.books));
  }

  initLibrary() {
    if (this.books.length === 0) {
      this.addBook({
        title: 'Historia de los Cementerios de Valparaíso',
        author: 'Equipo Amigas y Amigos por los Cementerios',
        category: 'Historia',
        description: 'Una completa guía sobre la historia y patrimonio de los cementerios porteños.',
        price: 15000,
        format: 'PDF',
        pages: 120,
        language: 'Español',
        available: true
      });

      this.addBook({
        title: 'Guía Fotográfica del Cementerio N°1',
        author: 'Fotógrafos Colaboradores',
        category: 'Fotografía',
        description: 'Colección de fotografías históricas y contemporáneas del Cementerio N°1.',
        price: 12000,
        format: 'PDF',
        pages: 80,
        language: 'Español',
        available: true
      });
    }
  }

  createLibraryInterface() {
    const libraryHTML = `
      <section id="digital-library" class="section-bg">
        <div class="container" data-aos="fade-up">
          <div class="section-title">
            <h2>Biblioteca Digital</h2>
            <p>Accede a nuestra colección de libros, documentos y recursos sobre patrimonio funerario</p>
          </div>

          <div class="row">
            <div class="col-lg-3">
              <div class="library-filters">
                <h5>Filtros</h5>
                <select id="category-filter" class="form-control mb-2">
                  <option value="">Todas las categorías</option>
                  <option value="Historia">Historia</option>
                  <option value="Fotografía">Fotografía</option>
                  <option value="Arquitectura">Arquitectura</option>
                  <option value="Biografías">Biografías</option>
                </select>
                <input type="text" id="search-filter" class="form-control" placeholder="Buscar...">
              </div>
            </div>

            <div class="col-lg-9">
              <div id="books-grid" class="row"></div>
            </div>
          </div>
        </div>
      </section>
    `;

    const portfolioSection = document.getElementById('portfolio');
    if (portfolioSection) {
      portfolioSection.insertAdjacentHTML('afterend', libraryHTML);
      this.renderBooks();
      this.initFilters();
    }
  }

  renderBooks(books = this.books) {
    const grid = document.getElementById('books-grid');
    if (!grid) return;

    grid.innerHTML = books.map(book => `
      <div class="col-lg-4 col-md-6 mb-4">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">${book.title}</h5>
            <p class="card-text"><strong>Autor:</strong> ${book.author}</p>
            <p class="card-text">${book.description}</p>
            <p class="card-text"><small class="text-muted">${book.pages} páginas | ${book.format}</small></p>
            <div class="d-flex justify-content-between align-items-center">
              <span class="h5 text-primary">$${book.price.toLocaleString()}</span>
              <button class="btn btn-primary btn-sm" onclick="digitalLibrary.purchaseBook(${book.id})">
                ${book.price > 0 ? 'Comprar' : 'Descargar'}
              </button>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  }

  initFilters() {
    const categoryFilter = document.getElementById('category-filter');
    const searchFilter = document.getElementById('search-filter');

    if (categoryFilter) {
      categoryFilter.addEventListener('change', () => this.applyFilters());
    }

    if (searchFilter) {
      searchFilter.addEventListener('input', () => this.applyFilters());
    }
  }

  applyFilters() {
    const category = document.getElementById('category-filter')?.value || '';
    const search = document.getElementById('search-filter')?.value || '';

    const filtered = this.getBooks({ category, search });
    this.renderBooks(filtered);
  }

  purchaseBook(bookId) {
    const book = this.books.find(b => b.id === bookId);
    if (!book) return;

    if (book.price > 0) {
      this.processPayment(book);
    } else {
      this.downloadBook(book);
    }
  }

  processPayment(book) {
    alert(`Redirigiendo al pago de "${book.title}" por $${book.price.toLocaleString()}`);
  }

  downloadBook(book) {
    book.downloadCount++;
    this.saveToStorage();
    alert(`Descargando "${book.title}"...`);
  }
}

// Sistema de Documentación Asociada
class DocumentRepository {
  constructor() {
    this.documents = JSON.parse(localStorage.getItem('documentRepository') || '[]');
    this.initRepository();
  }

  addDocument(documentData) {
    const document = {
      id: Date.now(),
      ...documentData,
      addedDate: new Date().toISOString(),
      version: '1.0',
      status: 'active'
    };
    this.documents.push(document);
    this.saveToStorage();
    return document;
  }

  getDocuments(filter = {}) {
    let filtered = [...this.documents];
    if (filter.type) {
      filtered = filtered.filter(d => d.type === filter.type);
    }
    if (filter.cemetery) {
      filtered = filtered.filter(d => d.cemetery === filter.cemetery);
    }
    return filtered;
  }

  saveToStorage() {
    localStorage.setItem('documentRepository', JSON.stringify(this.documents));
  }

  initRepository() {
    if (this.documents.length === 0) {
      // Documentos iniciales
      this.addDocument({
        title: 'Planos Históricos Cementerio N°1',
        type: 'Planos',
        cemetery: 'Cementerio N°1',
        description: 'Planos arquitectónicos originales del Cementerio N°1 de Valparaíso.',
        url: '/documents/planos-cementerio-1.pdf',
        fileSize: '2.5 MB',
        format: 'PDF'
      });

      this.addDocument({
        title: 'Registro de Monumentos Históricos',
        type: 'Inventario',
        cemetery: 'Cementerio N°2',
        description: 'Catálogo completo de monumentos y mausoleos de valor patrimonial.',
        url: '/documents/monumentos-cementerio-2.pdf',
        fileSize: '4.1 MB',
        format: 'PDF'
      });

      this.addDocument({
        title: 'Investigación Genealógica Cementerio Disidentes',
        type: 'Investigación',
        cemetery: 'Cementerio Disidentes',
        description: 'Estudios genealógicos y biografías de personalidades enterradas.',
        url: '/documents/genealogia-disidentes.pdf',
        fileSize: '3.2 MB',
        format: 'PDF'
      });
    }
  }

  createDocumentInterface() {
    const documentHTML = `
      <section id="document-repository" class="section-bg">
        <div class="container" data-aos="fade-up">
          <div class="section-title">
            <h2>Repositorio de Documentación</h2>
            <p>Accede a planos, investigaciones, inventarios y documentación histórica</p>
          </div>

          <div class="row">
            <div class="col-lg-3">
              <div class="document-filters">
                <h5>Filtros</h5>
                <select id="document-type-filter" class="form-control mb-2">
                  <option value="">Todos los tipos</option>
                  <option value="Planos">Planos</option>
                  <option value="Inventario">Inventarios</option>
                  <option value="Investigación">Investigaciones</option>
                  <option value="Fotografías">Fotografías</option>
                  <option value="Legal">Documentos Legales</option>
                </select>
                <select id="cemetery-filter" class="form-control mb-2">
                  <option value="">Todos los cementerios</option>
                  <option value="Cementerio N°1">Cementerio N°1</option>
                  <option value="Cementerio N°2">Cementerio N°2</option>
                  <option value="Cementerio Disidentes">Cementerio Disidentes</option>
                </select>
              </div>
            </div>

            <div class="col-lg-9">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h5>Documentos Disponibles</h5>
                <button class="btn btn-primary" onclick="documentRepository.openUploadModal()">
                  <i class="bx bx-upload"></i> Subir Documento
                </button>
              </div>
              <div id="documents-grid" class="row"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Modal para subir documentos -->
      <div id="document-upload-modal" class="modal fade" tabindex="-1">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Subir Documento</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <form id="document-upload-form">
                <div class="row">
                  <div class="col-md-6">
                    <label class="form-label">Título</label>
                    <input type="text" class="form-control" name="title" required>
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Tipo</label>
                    <select class="form-control" name="type" required>
                      <option value="">Seleccionar tipo</option>
                      <option value="Planos">Planos</option>
                      <option value="Inventario">Inventario</option>
                      <option value="Investigación">Investigación</option>
                      <option value="Fotografías">Fotografías</option>
                      <option value="Legal">Documento Legal</option>
                    </select>
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-md-6">
                    <label class="form-label">Cementerio</label>
                    <select class="form-control" name="cemetery">
                      <option value="">General</option>
                      <option value="Cementerio N°1">Cementerio N°1</option>
                      <option value="Cementerio N°2">Cementerio N°2</option>
                      <option value="Cementerio Disidentes">Cementerio Disidentes</option>
                    </select>
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Formato</label>
                    <select class="form-control" name="format">
                      <option value="PDF">PDF</option>
                      <option value="DOC">DOC</option>
                      <option value="JPG">JPG</option>
                      <option value="PNG">PNG</option>
                    </select>
                  </div>
                </div>
                <div class="mt-3">
                  <label class="form-label">Descripción</label>
                  <textarea class="form-control" name="description" rows="3" required></textarea>
                </div>
                <div class="mt-3">
                  <label class="form-label">Archivo</label>
                  <input type="file" class="form-control" name="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png">
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button type="button" class="btn btn-primary" onclick="documentRepository.saveDocument()">Guardar</button>
            </div>
          </div>
        </div>
      </div>
    `;

    const librarySection = document.getElementById('digital-library');
    if (librarySection) {
      librarySection.insertAdjacentHTML('afterend', documentHTML);
      this.renderDocuments();
      this.initDocumentFilters();
    }
  }

  renderDocuments(documents = this.documents) {
    const grid = document.getElementById('documents-grid');
    if (!grid) return;

    grid.innerHTML = documents.map(doc => `
      <div class="col-lg-6 col-md-12 mb-4">
        <div class="card h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start">
              <div>
                <h5 class="card-title">${doc.title}</h5>
                <span class="badge bg-primary mb-2">${doc.type}</span>
                ${doc.cemetery ? `<span class="badge bg-secondary mb-2">${doc.cemetery}</span>` : ''}
              </div>
              <div class="text-end">
                <small class="text-muted">${doc.format}</small><br>
                <small class="text-muted">${doc.fileSize || 'N/A'}</small>
              </div>
            </div>
            <p class="card-text">${doc.description}</p>
            <div class="d-flex justify-content-between align-items-center">
              <small class="text-muted">Agregado: ${new Date(doc.addedDate).toLocaleDateString()}</small>
              <div>
                <button class="btn btn-outline-primary btn-sm" onclick="documentRepository.downloadDocument(${doc.id})">
                  <i class="bx bx-download"></i> Descargar
                </button>
                <button class="btn btn-outline-secondary btn-sm" onclick="documentRepository.shareDocument(${doc.id})">
                  <i class="bx bx-share"></i> Compartir
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  }

  initDocumentFilters() {
    const typeFilter = document.getElementById('document-type-filter');
    const cemeteryFilter = document.getElementById('cemetery-filter');

    if (typeFilter) {
      typeFilter.addEventListener('change', () => this.applyDocumentFilters());
    }

    if (cemeteryFilter) {
      cemeteryFilter.addEventListener('change', () => this.applyDocumentFilters());
    }
  }

  applyDocumentFilters() {
    const type = document.getElementById('document-type-filter')?.value || '';
    const cemetery = document.getElementById('cemetery-filter')?.value || '';

    const filtered = this.getDocuments({ type, cemetery });
    this.renderDocuments(filtered);
  }

  openUploadModal() {
    const modal = new bootstrap.Modal(document.getElementById('document-upload-modal'));
    modal.show();
  }

  saveDocument() {
    const form = document.getElementById('document-upload-form');
    const formData = new FormData(form);
    const file = formData.get('file');

    const documentData = {
      title: formData.get('title'),
      type: formData.get('type'),
      cemetery: formData.get('cemetery'),
      format: formData.get('format'),
      description: formData.get('description'),
      url: file ? `/documents/${file.name}` : '',
      fileSize: file ? `${(file.size / 1024 / 1024).toFixed(1)} MB` : 'N/A'
    };

    this.addDocument(documentData);
    bootstrap.Modal.getInstance(document.getElementById('document-upload-modal')).hide();
    form.reset();
    this.renderDocuments();
  }

  downloadDocument(docId) {
    const document = this.documents.find(d => d.id === docId);
    if (document) {
      alert(`Descargando "${document.title}"...`);
    }
  }

  shareDocument(docId) {
    const document = this.documents.find(d => d.id === docId);
    if (document) {
      navigator.clipboard.writeText(`${window.location.origin}${document.url}`);
      alert('Enlace copiado al portapapeles');
    }
  }
}

// Inicializar sistemas
const photoRegistry = new PhotoRegistry();
const digitalLibrary = new DigitalLibrary();
const documentRepository = new DocumentRepository();

// Inicializar cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
  digitalLibrary.createLibraryInterface();
  documentRepository.createDocumentInterface();
});