// Integración con Cloudflare para Amigas y Amigos por los Cementerios
class CloudflareIntegration {
  constructor() {
    this.apiBase = 'https://api.cloudflare.com/client/v4';
    this.zone = window.location.hostname;
    this.initCloudflareServices();
  }

  // Inicializar servicios de Cloudflare
  initCloudflareServices() {
    this.initCaching();
    this.initSecurity();
    this.initAnalytics();
    this.initWorkers();
  }

  // Configuración de cache inteligente
  initCaching() {
    // Cache Strategy para recursos estáticos
    const cacheStrategy = {
      images: {
        maxAge: 31536000, // 1 año
        pattern: /\.(jpg|jpeg|png|gif|webp|svg)$/i
      },
      documents: {
        maxAge: 86400, // 1 día
        pattern: /\.(pdf|doc|docx)$/i
      },
      scripts: {
        maxAge: 604800, // 1 semana
        pattern: /\.(js|css)$/i
      }
    };

    // Implementar estrategia de cache
    if ('serviceWorker' in navigator) {
      this.registerServiceWorker();
    }
  }

  // Registro del Service Worker
  async registerServiceWorker() {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registrado:', registration);
    } catch (error) {
      console.error('Error al registrar Service Worker:', error);
    }
  }

  // Configuración de seguridad
  initSecurity() {
    // CSP Headers para Cloudflare
    const securityConfig = {
      contentSecurityPolicy: {
        'default-src': "'self'",
        'script-src': "'self' 'unsafe-inline' https://cdn.jsdelivr.net https://unpkg.com",
        'style-src': "'self' 'unsafe-inline' https://fonts.googleapis.com",
        'font-src': "'self' https://fonts.gstatic.com",
        'img-src': "'self' data: https:",
        'connect-src': "'self' https://api.cloudflare.com"
      },

      // Rate Limiting para formularios
      rateLimiting: {
        photoUpload: { requests: 10, window: 600 }, // 10 uploads por 10 min
        documentUpload: { requests: 5, window: 600 }, // 5 uploads por 10 min
        bookPurchase: { requests: 20, window: 3600 } // 20 compras por hora
      }
    };

    this.implementSecurity(securityConfig);
  }

  // Implementar medidas de seguridad
  implementSecurity(config) {
    // Bot protection básico
    this.enableBotProtection();

    // Rate limiting local
    this.setupRateLimiting(config.rateLimiting);
  }

  // Protección contra bots
  enableBotProtection() {
    // Verificación básica de comportamiento humano
    let humanVerified = false;

    document.addEventListener('mousemove', () => {
      if (!humanVerified) {
        humanVerified = true;
        this.unlockFeatures();
      }
    }, { once: true });

    // Timeout para verificación automática
    setTimeout(() => {
      if (!humanVerified) {
        this.requestHumanVerification();
      }
    }, 30000);
  }

  // Rate limiting local
  setupRateLimiting(limits) {
    Object.keys(limits).forEach(action => {
      const limit = limits[action];
      const key = `rateLimit_${action}`;

      window[`checkRateLimit_${action}`] = () => {
        const now = Date.now();
        const stored = JSON.parse(localStorage.getItem(key) || '[]');
        const validRequests = stored.filter(time => now - time < limit.window * 1000);

        if (validRequests.length >= limit.requests) {
          throw new Error(`Rate limit exceeded for ${action}`);
        }

        validRequests.push(now);
        localStorage.setItem(key, JSON.stringify(validRequests));
        return true;
      };
    });
  }

  // Analytics de Cloudflare
  initAnalytics() {
    // Web Analytics básico
    const analyticsConfig = {
      trackPageViews: true,
      trackDownloads: true,
      trackFormSubmissions: true,
      trackErrors: true
    };

    this.setupAnalytics(analyticsConfig);
  }

  // Configurar analytics
  setupAnalytics(config) {
    if (config.trackPageViews) {
      this.trackPageView();
    }

    if (config.trackDownloads) {
      this.trackDownloads();
    }

    if (config.trackFormSubmissions) {
      this.trackFormSubmissions();
    }

    if (config.trackErrors) {
      this.trackErrors();
    }
  }

  // Tracking de página
  trackPageView() {
    const data = {
      page: window.location.pathname,
      referrer: document.referrer,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent
    };

    this.sendAnalytics('pageview', data);
  }

  // Tracking de descargas
  trackDownloads() {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (link && (link.href.includes('.pdf') || link.href.includes('.doc'))) {
        this.sendAnalytics('download', {
          file: link.href,
          type: 'document',
          timestamp: new Date().toISOString()
        });
      }
    });
  }

  // Tracking de formularios
  trackFormSubmissions() {
    ['photo-registry-form', 'document-upload-form'].forEach(formId => {
      const form = document.getElementById(formId);
      if (form) {
        form.addEventListener('submit', () => {
          this.sendAnalytics('form_submission', {
            form: formId,
            timestamp: new Date().toISOString()
          });
        });
      }
    });
  }

  // Tracking de errores
  trackErrors() {
    window.addEventListener('error', (e) => {
      this.sendAnalytics('error', {
        message: e.message,
        filename: e.filename,
        lineno: e.lineno,
        timestamp: new Date().toISOString()
      });
    });
  }

  // Enviar datos de analytics
  sendAnalytics(event, data) {
    // En producción, esto se enviaría a Cloudflare Analytics
    console.log(`Analytics Event: ${event}`, data);

    // Almacenar localmente para revisión
    const analytics = JSON.parse(localStorage.getItem('cfAnalytics') || '[]');
    analytics.push({ event, data, timestamp: Date.now() });

    // Mantener solo los últimos 100 eventos
    if (analytics.length > 100) {
      analytics.splice(0, analytics.length - 100);
    }

    localStorage.setItem('cfAnalytics', JSON.stringify(analytics));
  }

  // Cloudflare Workers para funcionalidad avanzada
  initWorkers() {
    // Configuración de workers para:
    // 1. Procesamiento de imágenes
    // 2. API de pagos
    // 3. Notificaciones
    // 4. Backup automático

    this.setupImageProcessing();
    this.setupPaymentAPI();
    this.setupNotifications();
    this.setupAutoBackup();
  }

  // Worker para procesamiento de imágenes
  setupImageProcessing() {
    window.processImageWithCloudflare = async (file) => {
      // En producción, esto usaría Cloudflare Images
      const formData = new FormData();
      formData.append('file', file);

      try {
        // Simular procesamiento
        return {
          success: true,
          optimizedUrl: URL.createObjectURL(file),
          thumbnailUrl: URL.createObjectURL(file),
          metadata: {
            size: file.size,
            type: file.type,
            lastModified: file.lastModified
          }
        };
      } catch (error) {
        console.error('Error procesando imagen:', error);
        return { success: false, error: error.message };
      }
    };
  }

  // API de pagos usando Workers
  setupPaymentAPI() {
    window.processPaymentWithCloudflare = async (paymentData) => {
      try {
        // En producción, esto se conectaría con un procesador de pagos
        // a través de Cloudflare Workers

        // Simular procesamiento de pago
        await new Promise(resolve => setTimeout(resolve, 2000));

        return {
          success: true,
          transactionId: `cf_${Date.now()}`,
          amount: paymentData.amount,
          currency: 'CLP',
          status: 'completed'
        };
      } catch (error) {
        return { success: false, error: error.message };
      }
    };
  }

  // Sistema de notificaciones
  setupNotifications() {
    window.sendNotificationViaCloudflare = async (type, data) => {
      // En producción, usaría Cloudflare Workers para enviar emails/SMS
      console.log(`Notification [${type}]:`, data);

      const notification = {
        type,
        data,
        timestamp: new Date().toISOString(),
        status: 'sent'
      };

      const notifications = JSON.parse(localStorage.getItem('cfNotifications') || '[]');
      notifications.push(notification);
      localStorage.setItem('cfNotifications', JSON.stringify(notifications));

      return { success: true, id: Date.now() };
    };
  }

  // Backup automático
  setupAutoBackup() {
    // Backup diario de datos críticos
    setInterval(() => {
      this.performBackup();
    }, 24 * 60 * 60 * 1000); // 24 horas

    // Backup inmediato al cargar
    this.performBackup();
  }

  // Realizar backup
  async performBackup() {
    try {
      const backupData = {
        photos: JSON.parse(localStorage.getItem('photoRegistry') || '[]'),
        books: JSON.parse(localStorage.getItem('digitalLibrary') || '[]'),
        documents: JSON.parse(localStorage.getItem('documentRepository') || '[]'),
        analytics: JSON.parse(localStorage.getItem('cfAnalytics') || '[]'),
        timestamp: new Date().toISOString(),
        version: '1.0'
      };

      // En producción, esto se enviaría a Cloudflare KV o R2
      const backup = {
        id: `backup_${Date.now()}`,
        data: backupData,
        size: JSON.stringify(backupData).length
      };

      const backups = JSON.parse(localStorage.getItem('cfBackups') || '[]');
      backups.push(backup);

      // Mantener solo los últimos 7 backups
      if (backups.length > 7) {
        backups.splice(0, backups.length - 7);
      }

      localStorage.setItem('cfBackups', JSON.stringify(backups));

      console.log('Backup realizado:', backup.id);
      return { success: true, backupId: backup.id };
    } catch (error) {
      console.error('Error en backup:', error);
      return { success: false, error: error.message };
    }
  }

  // Restaurar backup
  async restoreBackup(backupId) {
    try {
      const backups = JSON.parse(localStorage.getItem('cfBackups') || '[]');
      const backup = backups.find(b => b.id === backupId);

      if (!backup) {
        throw new Error('Backup no encontrado');
      }

      const data = backup.data;
      localStorage.setItem('photoRegistry', JSON.stringify(data.photos));
      localStorage.setItem('digitalLibrary', JSON.stringify(data.books));
      localStorage.setItem('documentRepository', JSON.stringify(data.documents));

      // Recargar sistemas
      location.reload();

      return { success: true };
    } catch (error) {
      console.error('Error restaurando backup:', error);
      return { success: false, error: error.message };
    }
  }

  // Desbloquear funciones después de verificación humana
  unlockFeatures() {
    document.body.classList.add('human-verified');
    console.log('Usuario verificado como humano');
  }

  // Solicitar verificación humana
  requestHumanVerification() {
    const modal = document.createElement('div');
    modal.innerHTML = `
      <div class="modal fade show" style="display: block; background: rgba(0,0,0,0.5);">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5>Verificación de Seguridad</h5>
            </div>
            <div class="modal-body">
              <p>Por favor, haz clic en el botón para continuar:</p>
              <button class="btn btn-primary" onclick="this.closest('.modal').remove(); cloudflareIntegration.unlockFeatures()">
                Soy humano
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  // Obtener estadísticas de rendimiento
  getPerformanceStats() {
    const analytics = JSON.parse(localStorage.getItem('cfAnalytics') || '[]');
    const backups = JSON.parse(localStorage.getItem('cfBackups') || '[]');

    return {
      totalEvents: analytics.length,
      totalBackups: backups.length,
      lastBackup: backups[backups.length - 1]?.timestamp || 'Nunca',
      cacheHitRate: this.calculateCacheHitRate(),
      errorRate: this.calculateErrorRate(analytics)
    };
  }

  // Calcular tasa de cache hit (simulado)
  calculateCacheHitRate() {
    return Math.floor(Math.random() * 20) + 80; // 80-100%
  }

  // Calcular tasa de errores
  calculateErrorRate(analytics) {
    const errors = analytics.filter(a => a.event === 'error').length;
    return analytics.length > 0 ? (errors / analytics.length * 100).toFixed(2) : 0;
  }
}

// Inicializar integración con Cloudflare
const cloudflareIntegration = new CloudflareIntegration();

// Exportar para uso global
window.cloudflareIntegration = cloudflareIntegration;