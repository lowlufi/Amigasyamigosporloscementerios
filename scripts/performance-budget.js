#!/usr/bin/env node

/**
 * Performance Budget Monitor
 * Monitorea y valida que el sitio cumpla con los budgets de performance
 *
 * Uso: node scripts/performance-budget.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class PerformanceBudget {
  constructor() {
    this.budgets = {
      // Core Web Vitals (milliseconds)
      LCP: 2500,    // Largest Contentful Paint
      FID: 100,     // First Input Delay
      CLS: 0.1,     // Cumulative Layout Shift

      // Other Performance Metrics
      TTFB: 800,    // Time to First Byte
      FCP: 1800,    // First Contentful Paint
      TTI: 3800,    // Time to Interactive

      // Resource Budgets (bytes)
      totalSize: 2 * 1024 * 1024,      // 2MB total
      cssSize: 100 * 1024,             // 100KB CSS
      jsSize: 300 * 1024,              // 300KB JavaScript
      imageSize: 1.5 * 1024 * 1024,    // 1.5MB images
      fontSize: 100 * 1024,            // 100KB fonts

      // Lighthouse Scores (0-100)
      performance: 90,
      accessibility: 95,
      seo: 100,
      pwa: 100,

      // Request Count
      maxRequests: 50
    };

    this.projectRoot = path.join(__dirname, '..');
    this.reportsDir = path.join(this.projectRoot, 'reports');
  }

  async runAudit() {
    console.log('🔍 Iniciando auditoría de Performance Budget...\n');

    try {
      // Crear directorio de reportes si no existe
      if (!fs.existsSync(this.reportsDir)) {
        fs.mkdirSync(this.reportsDir, { recursive: true });
      }

      // 1. Analizar tamaños de archivos
      const fileSizes = await this.analyzeFileSizes();
      console.log('📊 Análisis de tamaños de archivos:');
      this.printFileSizeResults(fileSizes);

      // 2. Ejecutar Lighthouse audit
      const lighthouseResults = await this.runLighthouseAudit();
      console.log('\n🚦 Resultados de Lighthouse:');
      this.printLighthouseResults(lighthouseResults);

      // 3. Generar reporte final
      const overallResults = this.generateOverallReport(fileSizes, lighthouseResults);
      this.saveReport(overallResults);

      // 4. Determinar si pasa o falla
      const passed = this.evaluateResults(overallResults);

      if (passed) {
        console.log('\n✅ ¡Performance Budget APROBADO!');
        process.exit(0);
      } else {
        console.log('\n❌ Performance Budget FALLIDO');
        console.log('📋 Revisa el reporte detallado en:', path.join(this.reportsDir, 'budget-report.json'));
        process.exit(1);
      }

    } catch (error) {
      console.error('❌ Error durante la auditoría:', error.message);
      process.exit(1);
    }
  }

  async analyzeFileSizes() {
    const results = {
      css: { size: 0, files: [] },
      js: { size: 0, files: [] },
      images: { size: 0, files: [] },
      fonts: { size: 0, files: [] },
      total: { size: 0, files: 0 }
    };

    // Analizar CSS
    this.analyzeDirectory(path.join(this.projectRoot, 'assets', 'css'), results.css, ['.css']);
    this.analyzeDirectory(path.join(this.projectRoot, 'assets', 'vendor'), results.css, ['.css'], true);

    // Analizar JavaScript
    this.analyzeDirectory(path.join(this.projectRoot, 'assets', 'js'), results.js, ['.js']);
    this.analyzeDirectory(path.join(this.projectRoot, 'assets', 'vendor'), results.js, ['.js'], true);

    // Analizar imágenes
    this.analyzeDirectory(path.join(this.projectRoot, 'assets', 'img'), results.images,
      ['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif'], true);

    // Analizar fuentes
    this.analyzeDirectory(path.join(this.projectRoot, 'assets', 'vendor'), results.fonts,
      ['.woff', '.woff2', '.ttf', '.eot'], true);

    // Calcular totales
    results.total.size = results.css.size + results.js.size + results.images.size + results.fonts.size;
    results.total.files = results.css.files.length + results.js.files.length +
                         results.images.files.length + results.fonts.files.length;

    return results;
  }

  analyzeDirectory(dir, result, extensions, recursive = false) {
    if (!fs.existsSync(dir)) return;

    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory() && recursive) {
        this.analyzeDirectory(filePath, result, extensions, recursive);
      } else if (stat.isFile()) {
        const ext = path.extname(file).toLowerCase();
        if (extensions.includes(ext)) {
          result.size += stat.size;
          result.files.push({
            path: path.relative(this.projectRoot, filePath),
            size: stat.size,
            sizeFormatted: this.formatBytes(stat.size)
          });
        }
      }
    }
  }

  async runLighthouseAudit() {
    console.log('🚦 Ejecutando Lighthouse audit...');

    try {
      // Intentar ejecutar Lighthouse
      const reportPath = path.join(this.reportsDir, 'lighthouse-report.json');
      const command = `lighthouse http://localhost:8000 --output json --output-path "${reportPath}" --quiet --chrome-flags="--headless"`;

      execSync(command, { stdio: 'ignore' });

      // Leer resultados
      const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));

      return {
        performance: Math.round(report.categories.performance.score * 100),
        accessibility: Math.round(report.categories.accessibility.score * 100),
        seo: Math.round(report.categories.seo.score * 100),
        pwa: report.categories.pwa ? Math.round(report.categories.pwa.score * 100) : 0,
        metrics: {
          LCP: report.audits['largest-contentful-paint']?.numericValue || 0,
          FID: report.audits['max-potential-fid']?.numericValue || 0,
          CLS: report.audits['cumulative-layout-shift']?.numericValue || 0,
          TTFB: report.audits['server-response-time']?.numericValue || 0,
          FCP: report.audits['first-contentful-paint']?.numericValue || 0,
          TTI: report.audits['interactive']?.numericValue || 0
        },
        requestCount: this.extractRequestCount(report)
      };

    } catch (error) {
      console.warn('⚠️  No se pudo ejecutar Lighthouse. Asegúrate de que el servidor esté corriendo en localhost:8000');
      return {
        performance: 0,
        accessibility: 0,
        seo: 0,
        pwa: 0,
        metrics: {},
        requestCount: 0
      };
    }
  }

  extractRequestCount(report) {
    try {
      const networkRequests = report.audits['network-requests'];
      return networkRequests?.details?.items?.length || 0;
    } catch (error) {
      return 0;
    }
  }

  printFileSizeResults(results) {
    console.log(`  📄 CSS: ${this.formatBytes(results.css.size)} / ${this.formatBytes(this.budgets.cssSize)} ${this.getStatusIcon(results.css.size, this.budgets.cssSize)}`);
    console.log(`  📄 JavaScript: ${this.formatBytes(results.js.size)} / ${this.formatBytes(this.budgets.jsSize)} ${this.getStatusIcon(results.js.size, this.budgets.jsSize)}`);
    console.log(`  🖼️  Imágenes: ${this.formatBytes(results.images.size)} / ${this.formatBytes(this.budgets.imageSize)} ${this.getStatusIcon(results.images.size, this.budgets.imageSize)}`);
    console.log(`  🔤 Fuentes: ${this.formatBytes(results.fonts.size)} / ${this.formatBytes(this.budgets.fontSize)} ${this.getStatusIcon(results.fonts.size, this.budgets.fontSize)}`);
    console.log(`  📦 Total: ${this.formatBytes(results.total.size)} / ${this.formatBytes(this.budgets.totalSize)} ${this.getStatusIcon(results.total.size, this.budgets.totalSize)}`);
  }

  printLighthouseResults(results) {
    console.log(`  🎯 Performance: ${results.performance}/100 ${this.getStatusIcon(results.performance, this.budgets.performance, true)}`);
    console.log(`  ♿ Accessibility: ${results.accessibility}/100 ${this.getStatusIcon(results.accessibility, this.budgets.accessibility, true)}`);
    console.log(`  🔍 SEO: ${results.seo}/100 ${this.getStatusIcon(results.seo, this.budgets.seo, true)}`);
    console.log(`  📱 PWA: ${results.pwa}/100 ${this.getStatusIcon(results.pwa, this.budgets.pwa, true)}`);

    if (results.metrics.LCP) {
      console.log(`  ⚡ LCP: ${Math.round(results.metrics.LCP)}ms / ${this.budgets.LCP}ms ${this.getStatusIcon(results.metrics.LCP, this.budgets.LCP)}`);
    }
    if (results.requestCount) {
      console.log(`  📡 Requests: ${results.requestCount} / ${this.budgets.maxRequests} ${this.getStatusIcon(results.requestCount, this.budgets.maxRequests)}`);
    }
  }

  getStatusIcon(actual, budget, higherIsBetter = false) {
    const passed = higherIsBetter ? actual >= budget : actual <= budget;
    return passed ? '✅' : '❌';
  }

  generateOverallReport(fileSizes, lighthouse) {
    return {
      timestamp: new Date().toISOString(),
      budgets: this.budgets,
      results: {
        fileSizes,
        lighthouse
      },
      summary: {
        totalFiles: fileSizes.total.files,
        totalSize: fileSizes.total.size,
        performanceScore: lighthouse.performance,
        passedChecks: this.countPassedChecks(fileSizes, lighthouse),
        totalChecks: this.getTotalChecks()
      }
    };
  }

  countPassedChecks(fileSizes, lighthouse) {
    let passed = 0;

    // File size checks
    if (fileSizes.css.size <= this.budgets.cssSize) passed++;
    if (fileSizes.js.size <= this.budgets.jsSize) passed++;
    if (fileSizes.images.size <= this.budgets.imageSize) passed++;
    if (fileSizes.fonts.size <= this.budgets.fontSize) passed++;
    if (fileSizes.total.size <= this.budgets.totalSize) passed++;

    // Lighthouse checks
    if (lighthouse.performance >= this.budgets.performance) passed++;
    if (lighthouse.accessibility >= this.budgets.accessibility) passed++;
    if (lighthouse.seo >= this.budgets.seo) passed++;
    if (lighthouse.pwa >= this.budgets.pwa) passed++;

    return passed;
  }

  getTotalChecks() {
    return 9; // 5 file size + 4 lighthouse scores
  }

  evaluateResults(report) {
    const passRate = report.summary.passedChecks / report.summary.totalChecks;
    return passRate >= 0.8; // 80% de checks deben pasar
  }

  saveReport(report) {
    const reportPath = path.join(this.reportsDir, 'budget-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    // También generar reporte markdown
    this.generateMarkdownReport(report);
  }

  generateMarkdownReport(report) {
    const markdown = `# 📊 Performance Budget Report

## 📅 Generado el: ${new Date(report.timestamp).toLocaleString()}

## ✅ Resumen
- **Checks Aprobados**: ${report.summary.passedChecks}/${report.summary.totalChecks}
- **Ratio de Éxito**: ${Math.round((report.summary.passedChecks / report.summary.totalChecks) * 100)}%
- **Total de Archivos**: ${report.summary.totalFiles}
- **Tamaño Total**: ${this.formatBytes(report.summary.totalSize)}

## 📁 Tamaños de Archivos

| Tipo | Actual | Budget | Estado |
|------|--------|--------|--------|
| CSS | ${this.formatBytes(report.results.fileSizes.css.size)} | ${this.formatBytes(report.budgets.cssSize)} | ${this.getStatusIcon(report.results.fileSizes.css.size, report.budgets.cssSize)} |
| JavaScript | ${this.formatBytes(report.results.fileSizes.js.size)} | ${this.formatBytes(report.budgets.jsSize)} | ${this.getStatusIcon(report.results.fileSizes.js.size, report.budgets.jsSize)} |
| Imágenes | ${this.formatBytes(report.results.fileSizes.images.size)} | ${this.formatBytes(report.budgets.imageSize)} | ${this.getStatusIcon(report.results.fileSizes.images.size, report.budgets.imageSize)} |
| Fuentes | ${this.formatBytes(report.results.fileSizes.fonts.size)} | ${this.formatBytes(report.budgets.fontSize)} | ${this.getStatusIcon(report.results.fileSizes.fonts.size, report.budgets.fontSize)} |

## 🚦 Lighthouse Scores

| Métrica | Actual | Budget | Estado |
|---------|--------|--------|--------|
| Performance | ${report.results.lighthouse.performance} | ${report.budgets.performance} | ${this.getStatusIcon(report.results.lighthouse.performance, report.budgets.performance, true)} |
| Accessibility | ${report.results.lighthouse.accessibility} | ${report.budgets.accessibility} | ${this.getStatusIcon(report.results.lighthouse.accessibility, report.budgets.accessibility, true)} |
| SEO | ${report.results.lighthouse.seo} | ${report.budgets.seo} | ${this.getStatusIcon(report.results.lighthouse.seo, report.budgets.seo, true)} |
| PWA | ${report.results.lighthouse.pwa} | ${report.budgets.pwa} | ${this.getStatusIcon(report.results.lighthouse.pwa, report.budgets.pwa, true)} |

## 📈 Recomendaciones

${this.generateRecommendations(report)}

---
*Generado automáticamente por Performance Budget Monitor*
`;

    const markdownPath = path.join(this.reportsDir, 'budget-report.md');
    fs.writeFileSync(markdownPath, markdown);
  }

  generateRecommendations(report) {
    const recommendations = [];

    if (report.results.fileSizes.images.size > report.budgets.imageSize) {
      recommendations.push('- 🖼️ **Optimizar imágenes**: Usar WebP, comprimir y implementar lazy loading');
    }

    if (report.results.fileSizes.js.size > report.budgets.jsSize) {
      recommendations.push('- 📄 **Reducir JavaScript**: Minificar, tree-shaking y code splitting');
    }

    if (report.results.lighthouse.performance < report.budgets.performance) {
      recommendations.push('- ⚡ **Mejorar Performance**: Optimizar Core Web Vitals y recursos críticos');
    }

    if (recommendations.length === 0) {
      return '🎉 ¡Todas las métricas están dentro del budget! Excelente trabajo.';
    }

    return recommendations.join('\n');
  }

  formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  const budget = new PerformanceBudget();
  budget.runAudit();
}

module.exports = PerformanceBudget;