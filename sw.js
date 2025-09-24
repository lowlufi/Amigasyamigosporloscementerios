// Service Worker para Amigas y Amigos por los Cementerios
// Version 2.0 - Advanced Cache Strategy con Workbox patterns

const CACHE_NAME = 'amigas-cementerios-v2';
const STATIC_CACHE = 'static-v2';
const DYNAMIC_CACHE = 'dynamic-v2';
const IMAGE_CACHE = 'images-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/css/style.css',
  '/assets/js/main.js',
  '/assets/img/portada.png',
  '/assets/img/about.png',
  '/assets/img/logos/footer.png',
  '/assets/vendor/bootstrap/css/bootstrap.min.css',
  '/assets/vendor/bootstrap/js/bootstrap.min.js',
  '/assets/vendor/aos/aos.css',
  '/assets/vendor/aos/aos.js',
  '/assets/vendor/swiper/swiper-bundle.min.css',
  '/assets/vendor/swiper/swiper-bundle.min.js',
  '/assets/vendor/glightbox/css/glightbox.min.css',
  '/assets/vendor/glightbox/js/glightbox.min.js'
];

// Install event - Cache recursos críticos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache abierto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Advanced Fetch Strategy - Different strategies for different resources
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle different types of requests with appropriate strategies
  if (request.destination === 'image') {
    event.respondWith(handleImageRequest(request));
  } else if (request.destination === 'script' || request.destination === 'style') {
    event.respondWith(handleStaticAssets(request));
  } else if (request.mode === 'navigate') {
    event.respondWith(handleNavigationRequest(request));
  } else {
    event.respondWith(handleOtherRequests(request));
  }
});

// Cache First Strategy for Images with expiration
async function handleImageRequest(request) {
  const cache = await caches.open(IMAGE_CACHE);
  const cachedResponse = await cache.match(request);

  if (cachedResponse) {
    // Check if image is older than 30 days
    const cacheDate = cachedResponse.headers.get('sw-cache-date');
    const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);

    if (!cacheDate || parseInt(cacheDate) > thirtyDaysAgo) {
      return cachedResponse;
    }
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const responseClone = networkResponse.clone();
      const headers = new Headers(responseClone.headers);
      headers.set('sw-cache-date', Date.now().toString());

      const modifiedResponse = new Response(responseClone.body, {
        status: responseClone.status,
        statusText: responseClone.statusText,
        headers: headers
      });

      cache.put(request, modifiedResponse);
    }
    return networkResponse;
  } catch (error) {
    return cachedResponse || new Response('Image not available offline', { status: 503 });
  }
}

// Stale While Revalidate for Static Assets
async function handleStaticAssets(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cachedResponse = await cache.match(request);

  const fetchPromise = fetch(request).then(response => {
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  }).catch(() => cachedResponse);

  return cachedResponse || fetchPromise;
}

// Network First for Navigation
async function handleNavigationRequest(request) {
  try {
    const networkResponse = await fetch(request);
    const cache = await caches.open(DYNAMIC_CACHE);
    cache.put(request, networkResponse.clone());
    return networkResponse;
  } catch (error) {
    const cache = await caches.open(STATIC_CACHE);
    const cachedResponse = await cache.match('/index.html');
    return cachedResponse || new Response('Page not available offline', {
      status: 503,
      headers: { 'Content-Type': 'text/html' }
    });
  }
}

// Cache First with Network Fallback for other requests
async function handleOtherRequests(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  const cachedResponse = await cache.match(request);

  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    return new Response('Resource not available offline', { status: 503 });
  }
}

// Activate event - Limpiar caches antiguos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Eliminando cache antiguo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Background sync para formularios offline
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('Background sync triggered');
    // Aquí se pueden procesar formularios enviados offline
  }
});

// Push notifications (opcional para futuras actualizaciones)
self.addEventListener('push', (event) => {
  if (event.data) {
    const options = {
      body: event.data.text(),
      icon: '/assets/img/logos/footer.png',
      badge: '/assets/img/pestanna.ico',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: '1'
      }
    };

    event.waitUntil(
      self.registration.showNotification('Amigas y Amigos por los Cementerios', options)
    );
  }
});

// Cloudflare Integration Features
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CACHE_CLOUDFLARE_ASSETS') {
    event.waitUntil(cacheCloudflareAssets());
  }

  if (event.data && event.data.type === 'BACKUP_DATA') {
    event.waitUntil(backupToCloudflare(event.data.payload));
  }
});

// Cache específico para recursos de Cloudflare
async function cacheCloudflareAssets() {
  const cloudflareUrls = [
    '/cloudflare-integration.js',
    '/manifest.json'
  ];

  const cache = await caches.open(STATIC_CACHE);
  await cache.addAll(cloudflareUrls);
}

// Backup datos a Cloudflare KV (simulado)
async function backupToCloudflare(data) {
  try {
    // En producción, esto usaría la API de Cloudflare KV
    console.log('Backing up data to Cloudflare:', data);

    // Simular envío a Cloudflare Workers
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Notificar éxito
    self.clients.matchAll().then(clients => {
      clients.forEach(client => {
        client.postMessage({
          type: 'BACKUP_SUCCESS',
          timestamp: Date.now()
        });
      });
    });
  } catch (error) {
    console.error('Error backing up to Cloudflare:', error);
  }
}

// Manejo optimizado de formularios offline
self.addEventListener('sync', (event) => {
  if (event.tag === 'photo-upload') {
    event.waitUntil(syncPhotoUploads());
  }

  if (event.tag === 'document-upload') {
    event.waitUntil(syncDocumentUploads());
  }

  if (event.tag === 'book-purchase') {
    event.waitUntil(syncBookPurchases());
  }
});

// Sincronizar uploads de fotos
async function syncPhotoUploads() {
  const cache = await caches.open('offline-uploads');
  const requests = await cache.keys();

  for (const request of requests) {
    if (request.url.includes('photo-upload')) {
      try {
        const response = await fetch(request);
        if (response.ok) {
          await cache.delete(request);
        }
      } catch (error) {
        console.log('Error syncing photo upload:', error);
      }
    }
  }
}

// Sincronizar uploads de documentos
async function syncDocumentUploads() {
  const cache = await caches.open('offline-uploads');
  const requests = await cache.keys();

  for (const request of requests) {
    if (request.url.includes('document-upload')) {
      try {
        const response = await fetch(request);
        if (response.ok) {
          await cache.delete(request);
        }
      } catch (error) {
        console.log('Error syncing document upload:', error);
      }
    }
  }
}

// Sincronizar compras de libros
async function syncBookPurchases() {
  const cache = await caches.open('offline-uploads');
  const requests = await cache.keys();

  for (const request of requests) {
    if (request.url.includes('book-purchase')) {
      try {
        const response = await fetch(request);
        if (response.ok) {
          await cache.delete(request);
        }
      } catch (error) {
        console.log('Error syncing book purchase:', error);
      }
    }
  }
}