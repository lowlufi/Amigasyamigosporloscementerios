// Nueva Galería Moderna para Amigas y Amigos por los Cementerios
class ModernGallery {
  constructor() {
    this.photos = [];
    this.filteredPhotos = [];
    this.currentFilter = 'all';
    this.currentView = 'grid';
    this.itemsPerPage = 12;
    this.currentPage = 1;
    this.currentPhoto = null;

    this.initializeGallery();
  }

  initializeGallery() {
    this.loadPhotosData();
    this.setupEventListeners();
    this.renderGallery();
    this.updateStats();
  }

  loadPhotosData() {
    // Datos de fotografías extraídos de la galería original
    this.photos = [
      // Cementerio N°1
      {
        id: 'pieta-cem1',
        title: 'La Pietá',
        description: 'Escultura La Pietá en Cementerio N°1 de Valparaíso',
        location: 'Cementerio N°1',
        photographer: 'Jaime Flores',
        date: '2023',
        category: 'cementerio1',
        tags: ['escultura', 'arte funerario', 'patrimonio'],
        imageUrl: 'assets/img/portfolio/cementerio1/La pietá cementerio n°1.jpg',
        thumbnailUrl: 'assets/img/portfolio/cementerio1/La pietá cementerio n°1.jpg'
      },
      {
        id: 'cem1-hor2',
        title: 'Arquitectura Funeraria',
        description: 'Arquitectura funeraria del Cementerio N°1',
        location: 'Cementerio N°1',
        photographer: 'Jaime Flores',
        date: '2023',
        category: 'cementerio1',
        tags: ['arquitectura', 'mausoleos', 'patrimonio'],
        imageUrl: 'assets/img/portfolio/cementerio1/cem-n1-hor2.jpg',
        thumbnailUrl: 'assets/img/portfolio/cementerio1/cem-n1-hor2.jpg'
      },
      {
        id: 'cem1-hor3',
        title: 'Mausoleos Históricos',
        description: 'Mausoleos y tumbas históricas',
        location: 'Cementerio N°1',
        photographer: 'Jaime Flores',
        date: '2023',
        category: 'cementerio1',
        tags: ['mausoleos', 'historia', 'tumbas'],
        imageUrl: 'assets/img/portfolio/cementerio1/cem-n1-hor3.jpg',
        thumbnailUrl: 'assets/img/portfolio/cementerio1/cem-n1-hor3.jpg'
      },

      // Cementerio N°2
      {
        id: 'cem2-hor1',
        title: 'Vista Panorámica',
        description: 'Vista panorámica del Cementerio N°2 de Valparaíso',
        location: 'Cementerio N°2',
        photographer: 'Jaime Flores',
        date: '2023',
        category: 'cementerio2',
        tags: ['panorámica', 'vista general', 'cementerio'],
        imageUrl: 'assets/img/portfolio/cementerio2/cem-n2-hor1.jpg',
        thumbnailUrl: 'assets/img/portfolio/cementerio2/cem-n2-hor1.jpg'
      },
      {
        id: 'cem2-hor3',
        title: 'Arquitectura del Cementerio N°2',
        description: 'Arquitectura del Cementerio N°2',
        location: 'Cementerio N°2',
        photographer: 'Jaime Flores',
        date: '2023',
        category: 'cementerio2',
        tags: ['arquitectura', 'cementerio', 'estructura'],
        imageUrl: 'assets/img/portfolio/cementerio2/cem-n2-hor3.jpg',
        thumbnailUrl: 'assets/img/portfolio/cementerio2/cem-n2-hor3.jpg'
      },

      // Cementerio Disidentes
      {
        id: 'disi1',
        title: 'Cementerio Disidentes',
        description: 'Vista general del Cementerio de Disidentes',
        location: 'Cementerio Disidentes',
        photographer: 'Paula Parada',
        date: '2022',
        category: 'disidentes',
        tags: ['disidentes', 'historia', 'patrimonio'],
        imageUrl: 'assets/img/portfolio/cementerio2/disi1.jpg',
        thumbnailUrl: 'assets/img/portfolio/cementerio2/disi1.jpg'
      },
      {
        id: 'disi2',
        title: 'Monumentos Históricos',
        description: 'Monumentos históricos del Cementerio de Disidentes',
        location: 'Cementerio Disidentes',
        photographer: 'Paula Parada',
        date: '2022',
        category: 'disidentes',
        tags: ['monumentos', 'historia', 'arte funerario'],
        imageUrl: 'assets/img/portfolio/cementerio2/disi2.jpg',
        thumbnailUrl: 'assets/img/portfolio/cementerio2/disi2.jpg'
      },

      // Actividades
      {
        id: 'sobrevuelos-cruz',
        title: 'Evento Sobrevuelos Cementerios',
        description: 'Evento Sobrevuelos Cementerios en La Cruz',
        location: 'La Cruz',
        photographer: 'Equipo',
        date: '2023',
        category: 'actividades',
        tags: ['evento', 'sobrevuelos', 'actividad cultural'],
        imageUrl: 'assets/img/portfolio/actividades/la cruz actividad.JPG',
        thumbnailUrl: 'assets/img/portfolio/actividades/la cruz actividad.JPG'
      },
      {
        id: 'libro-upla',
        title: 'Lanzamiento Libro UPLA',
        description: 'Lanzamiento de libro en Universidad de Playa Ancha',
        location: 'Universidad de Playa Ancha',
        photographer: 'Equipo',
        date: '2023',
        category: 'actividades',
        tags: ['libro', 'lanzamiento', 'universidad'],
        imageUrl: 'assets/img/portfolio/actividades/Lanzamiento libro Upla..jpg',
        thumbnailUrl: 'assets/img/portfolio/actividades/Lanzamiento libro Upla..jpg'
      },

      // Equipo
      {
        id: 'paula-carolina-adolfo',
        title: 'Paula López, Carolina Miranda, Adolfo López',
        description: 'Equipo en actividad patrimonial en Cementerio Disidentes',
        location: 'Cementerio Disidentes',
        photographer: 'Equipo',
        date: '2023',
        category: 'equipo',
        tags: ['equipo', 'colaboradores', 'actividad'],
        imageUrl: 'assets/img/portfolio/Paula López, Carolina Miranda, Adolfo López.jpg',
        thumbnailUrl: 'assets/img/portfolio/Paula López, Carolina Miranda, Adolfo López.jpg'
      },
      {
        id: 'aditi-romina-valentina',
        title: 'Aditi Olivera, Romina Care, Valentina Alvarado',
        description: 'Equipo en evento cultural',
        location: 'Cementerio N°1',
        photographer: 'Jaime Flores',
        date: '2023',
        category: 'equipo',
        tags: ['equipo', 'evento cultural', 'colaboradoras'],
        imageUrl: 'assets/img/portfolio/Aditi Olivera , Romina Care, Valentina Alvarado.jpg',
        thumbnailUrl: 'assets/img/portfolio/Aditi Olivera , Romina Care, Valentina Alvarado.jpg'
      },

      // Internacional
      {
        id: 'pierre-david1',
        title: 'Cementerio Europeo',
        description: 'Arte funerario internacional - Père Lachaise',
        location: 'París, Francia',
        photographer: 'Pierre David',
        date: '2022',
        category: 'internacional',
        tags: ['internacional', 'arte funerario', 'europa'],
        imageUrl: 'assets/img/portfolio/Cementerios x el mundo/Pierre-David1.jpg',
        thumbnailUrl: 'assets/img/portfolio/Cementerios x el mundo/Pierre-David1.jpg'
      },
      {
        id: 'pierre-david2',
        title: 'Patrimonio Funerario Europeo',
        description: 'Patrimonio funerario del Père Lachaise',
        location: 'París, Francia',
        photographer: 'Pierre David',
        date: '2022',
        category: 'internacional',
        tags: ['patrimonio', 'europa', 'cementerio'],
        imageUrl: 'assets/img/portfolio/Cementerios x el mundo/Pierre-David2.jpg',
        thumbnailUrl: 'assets/img/portfolio/Cementerios x el mundo/Pierre-David2.jpg'
      }
    ];

    this.filteredPhotos = [...this.photos];
  }

  setupEventListeners() {
    // Filtros de categorías
    document.addEventListener('click', (e) => {
      if (e.target.matches('.filter-tab')) {
        this.handleFilterClick(e.target);
      }
    });

    // Barra de búsqueda
    const searchInput = document.getElementById('gallery-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.handleSearch(e.target.value);
      });
    }

    // Filtros secundarios
    const filters = ['date-filter', 'photographer-filter', 'sort-filter'];
    filters.forEach(filterId => {
      const element = document.getElementById(filterId);
      if (element) {
        element.addEventListener('change', () => this.applySecondaryFilters());
      }
    });

    // Paginación
    document.addEventListener('click', (e) => {
      if (e.target.matches('.page-link')) {
        e.preventDefault();
      }
    });
  }

  handleFilterClick(filterButton) {
    // Actualizar estado visual de filtros
    document.querySelectorAll('.filter-tab').forEach(tab => {
      tab.classList.remove('active');
    });
    filterButton.classList.add('active');

    // Aplicar filtro
    const filter = filterButton.dataset.filter;
    this.currentFilter = filter;
    this.applyFilters();
  }

  handleSearch(searchTerm) {
    this.searchTerm = searchTerm.toLowerCase();
    this.applyFilters();
  }

  applyFilters() {
    let filtered = [...this.photos];

    // Filtro por categoría
    if (this.currentFilter !== 'all') {
      filtered = filtered.filter(photo => photo.category === this.currentFilter);
    }

    // Filtro por búsqueda
    if (this.searchTerm) {
      filtered = filtered.filter(photo =>
        photo.title.toLowerCase().includes(this.searchTerm) ||
        photo.description.toLowerCase().includes(this.searchTerm) ||
        photo.location.toLowerCase().includes(this.searchTerm) ||
        photo.photographer.toLowerCase().includes(this.searchTerm) ||
        photo.tags.some(tag => tag.toLowerCase().includes(this.searchTerm))
      );
    }

    this.filteredPhotos = filtered;
    this.currentPage = 1;
    this.renderGallery();
    this.updateFilterCounts();
  }

  applySecondaryFilters() {
    const dateFilter = document.getElementById('date-filter')?.value;
    const photographerFilter = document.getElementById('photographer-filter')?.value;
    const sortFilter = document.getElementById('sort-filter')?.value;

    let filtered = [...this.filteredPhotos];

    // Filtro por fotógrafo
    if (photographerFilter) {
      filtered = filtered.filter(photo =>
        photo.photographer.toLowerCase().includes(photographerFilter)
      );
    }

    // Ordenamiento
    if (sortFilter === 'alphabetical') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortFilter === 'location') {
      filtered.sort((a, b) => a.location.localeCompare(b.location));
    }

    this.filteredPhotos = filtered;
    this.renderGallery();
  }

  renderGallery() {
    const grid = document.getElementById('gallery-grid');
    if (!grid) return;

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    const photosToShow = this.filteredPhotos.slice(startIndex, endIndex);

    if (this.currentView === 'grid') {
      this.renderGridView(grid, photosToShow);
    } else {
      this.renderListView(grid, photosToShow);
    }

    this.updatePagination();
  }

  renderGridView(container, photos) {
    container.className = 'gallery-grid row';
    container.innerHTML = photos.map(photo => `
      <div class="col-lg-4 col-md-6 mb-4" data-aos="fade-up">
        <div class="gallery-item">
          <div class="gallery-image">
            <img src="${photo.thumbnailUrl}" alt="${photo.description}" class="img-fluid" loading="lazy">
            <div class="gallery-overlay">
              <div class="gallery-info">
                <h5>${photo.title}</h5>
                <p><i class="bx bx-map"></i> ${photo.location}</p>
                <p><i class="bx bx-camera"></i> ${photo.photographer}</p>
              </div>
              <div class="gallery-actions">
                <button class="btn btn-light btn-sm" onclick="newGallery.viewPhoto('${photo.id}')" title="Ver detalle">
                  <i class="bx bx-show"></i>
                </button>
                <button class="btn btn-light btn-sm" onclick="newGallery.downloadPhoto('${photo.id}')" title="Descargar">
                  <i class="bx bx-download"></i>
                </button>
                <button class="btn btn-light btn-sm" onclick="photoRegistry.openRegistryModal('${photo.title}')" title="Editar">
                  <i class="bx bx-edit"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="gallery-meta">
            <div class="gallery-tags">
              ${photo.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
          </div>
        </div>
      </div>
    `).join('');
  }

  renderListView(container, photos) {
    container.className = 'gallery-list';
    container.innerHTML = photos.map(photo => `
      <div class="gallery-list-item" data-aos="fade-up">
        <div class="row align-items-center">
          <div class="col-md-3">
            <img src="${photo.thumbnailUrl}" alt="${photo.description}" class="img-fluid" loading="lazy">
          </div>
          <div class="col-md-6">
            <h5>${photo.title}</h5>
            <p class="text-muted">${photo.description}</p>
            <div class="meta-info">
              <span><i class="bx bx-map"></i> ${photo.location}</span>
              <span><i class="bx bx-camera"></i> ${photo.photographer}</span>
              <span><i class="bx bx-calendar"></i> ${photo.date}</span>
            </div>
            <div class="gallery-tags">
              ${photo.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
          </div>
          <div class="col-md-3 text-end">
            <div class="gallery-actions">
              <button class="btn btn-outline-primary btn-sm" onclick="newGallery.viewPhoto('${photo.id}')">
                <i class="bx bx-show"></i> Ver
              </button>
              <button class="btn btn-outline-secondary btn-sm" onclick="newGallery.downloadPhoto('${photo.id}')">
                <i class="bx bx-download"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  }

  updateFilterCounts() {
    const counts = {
      all: this.photos.length,
      cementerio1: this.photos.filter(p => p.category === 'cementerio1').length,
      cementerio2: this.photos.filter(p => p.category === 'cementerio2').length,
      disidentes: this.photos.filter(p => p.category === 'disidentes').length,
      actividades: this.photos.filter(p => p.category === 'actividades').length,
      equipo: this.photos.filter(p => p.category === 'equipo').length,
      internacional: this.photos.filter(p => p.category === 'internacional').length
    };

    Object.keys(counts).forEach(category => {
      const countElement = document.getElementById(`count-${category}`);
      if (countElement) {
        countElement.textContent = counts[category];
      }
    });
  }

  updatePagination() {
    const totalPages = Math.ceil(this.filteredPhotos.length / this.itemsPerPage);
    const pagination = document.querySelector('.gallery-pagination .pagination');

    if (!pagination || totalPages <= 1) {
      if (pagination) pagination.style.display = 'none';
      return;
    }

    pagination.style.display = 'flex';

    let paginationHTML = `
      <li class="page-item ${this.currentPage === 1 ? 'disabled' : ''}">
        <button class="page-link" onclick="newGallery.previousPage()">
          <i class="bx bx-chevron-left"></i>
        </button>
      </li>
    `;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= this.currentPage - 1 && i <= this.currentPage + 1)) {
        paginationHTML += `
          <li class="page-item ${i === this.currentPage ? 'active' : ''}">
            <button class="page-link" onclick="newGallery.goToPage(${i})">${i}</button>
          </li>
        `;
      } else if (i === this.currentPage - 2 || i === this.currentPage + 2) {
        paginationHTML += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
      }
    }

    paginationHTML += `
      <li class="page-item ${this.currentPage === totalPages ? 'disabled' : ''}">
        <button class="page-link" onclick="newGallery.nextPage()">
          <i class="bx bx-chevron-right"></i>
        </button>
      </li>
    `;

    pagination.innerHTML = paginationHTML;
  }

  updateStats() {
    const stats = {
      'total-photos': this.photos.length,
      'total-locations': [...new Set(this.photos.map(p => p.location))].length,
      'total-photographers': [...new Set(this.photos.map(p => p.photographer))].length,
      'total-events': this.photos.filter(p => p.category === 'actividades').length
    };

    Object.keys(stats).forEach(statId => {
      const element = document.getElementById(statId);
      if (element) {
        element.textContent = stats[statId];
      }
    });
  }

  // Métodos de navegación
  nextPage() {
    const totalPages = Math.ceil(this.filteredPhotos.length / this.itemsPerPage);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.renderGallery();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.renderGallery();
    }
  }

  goToPage(page) {
    this.currentPage = page;
    this.renderGallery();
  }

  // Métodos de interacción
  toggleView() {
    this.currentView = this.currentView === 'grid' ? 'list' : 'grid';
    this.renderGallery();

    const button = document.querySelector('[onclick="newGallery.toggleView()"]');
    if (button) {
      const icon = button.querySelector('i');
      icon.className = this.currentView === 'grid' ? 'bx bx-list-ul' : 'bx bx-grid-alt';
    }
  }

  viewPhoto(photoId) {
    const photo = this.photos.find(p => p.id === photoId);
    if (!photo) return;

    this.currentPhoto = photo;

    // Actualizar modal
    document.getElementById('photo-title').textContent = photo.title;
    document.getElementById('photo-detail-image').src = photo.imageUrl;
    document.getElementById('photo-location').textContent = photo.location;
    document.getElementById('photo-photographer').textContent = photo.photographer;
    document.getElementById('photo-date').textContent = photo.date;
    document.getElementById('photo-description').textContent = photo.description;

    // Actualizar tags
    const tagsContainer = document.getElementById('photo-tags');
    tagsContainer.innerHTML = photo.tags.map(tag =>
      `<span class="badge bg-secondary me-1">${tag}</span>`
    ).join('');

    // Mostrar modal
    const modal = new bootstrap.Modal(document.getElementById('photo-detail-modal'));
    modal.show();
  }

  downloadPhoto(photoId) {
    const photo = this.photos.find(p => p.id === photoId);
    if (!photo) return;

    // Crear enlace de descarga
    const link = document.createElement('a');
    link.href = photo.imageUrl;
    link.download = `${photo.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.jpg`;
    link.click();

    // Analytics
    if (window.cloudflareIntegration) {
      window.cloudflareIntegration.sendAnalytics('download', {
        photoId: photo.id,
        title: photo.title,
        category: photo.category
      });
    }
  }

  sharePhoto(photoId) {
    const photo = this.photos.find(p => p.id === photoId);
    if (!photo) return;

    if (navigator.share) {
      navigator.share({
        title: photo.title,
        text: photo.description,
        url: window.location.href + '#' + photo.id
      });
    } else {
      // Fallback: copiar URL al portapapeles
      navigator.clipboard.writeText(window.location.href + '#' + photo.id);
      alert('Enlace copiado al portapapeles');
    }
  }

  editPhoto(photoId) {
    const photo = this.photos.find(p => p.id === photoId);
    if (!photo) return;

    if (window.photoRegistry) {
      window.photoRegistry.openRegistryModal(photo.title);
    }
  }

  openMapView() {
    const modal = new bootstrap.Modal(document.getElementById('map-view-modal'));
    modal.show();
  }
}

// Inicializar la nueva galería cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
  window.newGallery = new ModernGallery();
});