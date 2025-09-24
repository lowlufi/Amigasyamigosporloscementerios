/**
 * Core Web Vitals Monitor
 * Monitorea métricas de performance y las envía a analytics
 */

class PerformanceMonitor {
  constructor() {
    this.metrics = {};
    this.thresholds = {
      LCP: 2500, // Largest Contentful Paint
      FID: 100,  // First Input Delay
      CLS: 0.1   // Cumulative Layout Shift
    };
    this.init();
  }

  init() {
    this.observePerformanceMetrics();
    this.reportOnPageUnload();
  }

  // Observer para Core Web Vitals
  observePerformanceMetrics() {
    // Largest Contentful Paint (LCP)
    this.observeLCP();

    // First Input Delay (FID)
    this.observeFID();

    // Cumulative Layout Shift (CLS)
    this.observeCLS();

    // Time to First Byte (TTFB)
    this.observeTTFB();

    // First Contentful Paint (FCP)
    this.observeFCP();
  }

  observeLCP() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];

        this.metrics.LCP = {
          value: lastEntry.startTime,
          rating: this.getRating(lastEntry.startTime, 'LCP'),
          element: lastEntry.element?.tagName || 'unknown'
        };

        console.log('📊 LCP:', this.metrics.LCP);
      });

      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    }
  }

  observeFID() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          this.metrics.FID = {
            value: entry.processingStart - entry.startTime,
            rating: this.getRating(entry.processingStart - entry.startTime, 'FID'),
            eventType: entry.name
          };

          console.log('📊 FID:', this.metrics.FID);
          break; // Solo necesitamos la primera interacción
        }
      });

      observer.observe({ entryTypes: ['first-input'] });
    }
  }

  observeCLS() {
    if ('PerformanceObserver' in window) {
      let clsValue = 0;
      let sessionValue = 0;
      let sessionEntries = [];

      const observer = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (!entry.hadRecentInput) {
            const firstSessionEntry = sessionEntries[0];
            const lastSessionEntry = sessionEntries[sessionEntries.length - 1];

            if (sessionValue &&
                entry.startTime - lastSessionEntry.startTime < 1000 &&
                entry.startTime - firstSessionEntry.startTime < 5000) {
              sessionValue += entry.value;
              sessionEntries.push(entry);
            } else {
              sessionValue = entry.value;
              sessionEntries = [entry];
            }

            if (sessionValue > clsValue) {
              clsValue = sessionValue;
              this.metrics.CLS = {
                value: clsValue,
                rating: this.getRating(clsValue, 'CLS'),
                sources: sessionEntries.map(e => e.sources?.[0]?.node?.tagName || 'unknown')
              };

              console.log('📊 CLS:', this.metrics.CLS);
            }
          }
        }
      });

      observer.observe({ entryTypes: ['layout-shift'] });
    }
  }

  observeTTFB() {
    if ('performance' in window && 'getEntriesByType' in performance) {
      const navigationEntry = performance.getEntriesByType('navigation')[0];
      if (navigationEntry) {
        this.metrics.TTFB = {
          value: navigationEntry.responseStart - navigationEntry.requestStart,
          rating: this.getRating(navigationEntry.responseStart - navigationEntry.requestStart, 'TTFB')
        };

        console.log('📊 TTFB:', this.metrics.TTFB);
      }
    }
  }

  observeFCP() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            this.metrics.FCP = {
              value: entry.startTime,
              rating: this.getRating(entry.startTime, 'FCP')
            };

            console.log('📊 FCP:', this.metrics.FCP);
            break;
          }
        }
      });

      observer.observe({ entryTypes: ['paint'] });
    }
  }

  // Determinar rating basado en thresholds
  getRating(value, metric) {
    const thresholds = {
      LCP: { good: 2500, poor: 4000 },
      FID: { good: 100, poor: 300 },
      CLS: { good: 0.1, poor: 0.25 },
      TTFB: { good: 800, poor: 1800 },
      FCP: { good: 1800, poor: 3000 }
    };

    const threshold = thresholds[metric];
    if (!threshold) return 'unknown';

    if (value <= threshold.good) return 'good';
    if (value <= threshold.poor) return 'needs-improvement';
    return 'poor';
  }

  // Reportar métricas al analytics
  reportMetrics() {
    // Enviar a Google Analytics si está disponible
    if (typeof gtag !== 'undefined') {
      Object.entries(this.metrics).forEach(([metric, data]) => {
        gtag('event', 'web_vitals', {
          metric_name: metric,
          metric_value: data.value,
          metric_rating: data.rating,
          custom_parameter: data.element || data.eventType || data.sources?.[0] || ''
        });
      });
    }

    // Log para desarrollo
    console.log('📈 Performance Report:', this.metrics);

    // Mostrar alertas si hay problemas
    this.showPerformanceAlerts();
  }

  // Mostrar alertas de performance en consola
  showPerformanceAlerts() {
    Object.entries(this.metrics).forEach(([metric, data]) => {
      if (data.rating === 'poor') {
        console.warn(`⚠️ ${metric} performance is poor: ${data.value.toFixed(2)}`);
      }
    });
  }

  // Reportar al unload de la página
  reportOnPageUnload() {
    // Usar sendBeacon para envío confiable
    window.addEventListener('beforeunload', () => {
      this.reportMetrics();

      if ('navigator' in window && 'sendBeacon' in navigator) {
        const data = JSON.stringify({
          url: window.location.href,
          metrics: this.metrics,
          timestamp: Date.now(),
          userAgent: navigator.userAgent
        });

        // Aquí podrías enviar a tu endpoint de analytics
        // navigator.sendBeacon('/analytics/performance', data);
      }
    });
  }

  // API pública para obtener métricas actuales
  getMetrics() {
    return { ...this.metrics };
  }

  // API para obtener un resumen de performance
  getPerformanceSummary() {
    const summary = {
      overall: 'good',
      issues: [],
      recommendations: []
    };

    Object.entries(this.metrics).forEach(([metric, data]) => {
      if (data.rating === 'poor') {
        summary.overall = 'poor';
        summary.issues.push(`${metric}: ${data.value.toFixed(2)}`);
        summary.recommendations.push(this.getRecommendation(metric));
      } else if (data.rating === 'needs-improvement' && summary.overall === 'good') {
        summary.overall = 'needs-improvement';
      }
    });

    return summary;
  }

  // Recomendaciones específicas por métrica
  getRecommendation(metric) {
    const recommendations = {
      LCP: 'Optimiza imágenes principales y usa preload para recursos críticos',
      FID: 'Reduce JavaScript bloqueante y usa workers para tareas pesadas',
      CLS: 'Define dimensiones para imágenes y evita insertar contenido dinámico',
      TTFB: 'Optimiza el servidor y usa CDN para mejor tiempo de respuesta',
      FCP: 'Minimiza CSS crítico y usa resource hints'
    };

    return recommendations[metric] || 'Optimiza recursos y reduce tiempo de carga';
  }
}

// Inicializar monitor automáticamente
window.addEventListener('load', () => {
  window.performanceMonitor = new PerformanceMonitor();

  // Hacer disponible globalmente para debugging
  window.getPerformanceReport = () => {
    return window.performanceMonitor.getPerformanceSummary();
  };
});

// Export para uso modular
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PerformanceMonitor;
}