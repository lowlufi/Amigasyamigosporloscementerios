#!/usr/bin/env node

/**
 * Script de Optimización Automática de Imágenes
 * Convierte imágenes a WebP y optimiza tamaños
 *
 * Uso: node scripts/optimize-images.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class ImageOptimizer {
  constructor() {
    this.inputDir = path.join(__dirname, '..', 'assets', 'img');
    this.supportedFormats = ['.jpg', '.jpeg', '.png'];
    this.quality = 85;
    this.webpQuality = 80;
    this.sizes = {
      thumbnail: 300,
      small: 600,
      medium: 1200,
      large: 1920
    };
  }

  async optimizeAll() {
    console.log('🖼️  Iniciando optimización de imágenes...\n');

    try {
      // Verificar que cwebp esté instalado
      this.checkDependencies();

      // Procesar todas las imágenes
      await this.processDirectory(this.inputDir);

      console.log('\n✅ Optimización completada exitosamente!');
      console.log('💡 No olvides actualizar las referencias en el HTML para usar <picture> elements');

    } catch (error) {
      console.error('❌ Error durante la optimización:', error.message);
      process.exit(1);
    }
  }

  checkDependencies() {
    try {
      execSync('cwebp -version', { stdio: 'ignore' });
    } catch (error) {
      throw new Error(`
        ❌ cwebp no está instalado.

        Instalar en Ubuntu/Debian:
        sudo apt-get install webp

        Instalar en macOS:
        brew install webp

        Instalar en Windows:
        Descargar desde: https://developers.google.com/speed/webp/download
      `);
    }

    try {
      execSync('convert -version', { stdio: 'ignore' });
    } catch (error) {
      console.warn('⚠️  ImageMagick no encontrado. Algunas funciones estarán limitadas.');
    }
  }

  async processDirectory(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        await this.processDirectory(filePath);
      } else if (this.isSupportedImage(file)) {
        await this.processImage(filePath);
      }
    }
  }

  isSupportedImage(filename) {
    const ext = path.extname(filename).toLowerCase();
    return this.supportedFormats.includes(ext);
  }

  async processImage(imagePath) {
    const filename = path.basename(imagePath, path.extname(imagePath));
    const dir = path.dirname(imagePath);
    const ext = path.extname(imagePath);

    console.log(`📸 Procesando: ${path.relative(this.inputDir, imagePath)}`);

    try {
      // 1. Crear versión WebP
      await this.createWebP(imagePath, path.join(dir, `${filename}.webp`));

      // 2. Optimizar imagen original
      await this.optimizeOriginal(imagePath);

      // 3. Crear versiones responsive (opcional para imágenes grandes)
      if (this.shouldCreateResponsive(imagePath)) {
        await this.createResponsiveVersions(imagePath, filename, dir, ext);
      }

      console.log(`   ✅ Optimizado exitosamente\n`);

    } catch (error) {
      console.error(`   ❌ Error procesando ${imagePath}:`, error.message);
    }
  }

  async createWebP(inputPath, outputPath) {
    try {
      const command = `cwebp -q ${this.webpQuality} "${inputPath}" -o "${outputPath}"`;
      execSync(command, { stdio: 'ignore' });

      const originalSize = fs.statSync(inputPath).size;
      const webpSize = fs.statSync(outputPath).size;
      const savings = ((originalSize - webpSize) / originalSize * 100).toFixed(1);

      console.log(`   📦 WebP creado (${savings}% más pequeño)`);
    } catch (error) {
      throw new Error(`Error creando WebP: ${error.message}`);
    }
  }

  async optimizeOriginal(imagePath) {
    try {
      const backupPath = `${imagePath}.backup`;

      // Crear backup si no existe
      if (!fs.existsSync(backupPath)) {
        fs.copyFileSync(imagePath, backupPath);
      }

      // Optimizar con ImageMagick si está disponible
      try {
        const command = `convert "${backupPath}" -strip -interlace Plane -gaussian-blur 0.05 -quality ${this.quality} "${imagePath}"`;
        execSync(command, { stdio: 'ignore' });
        console.log(`   🔧 Original optimizado`);
      } catch (error) {
        // Si ImageMagick no está disponible, restaurar desde backup
        fs.copyFileSync(backupPath, imagePath);
        console.log(`   ℹ️  Original mantenido (ImageMagick no disponible)`);
      }
    } catch (error) {
      throw new Error(`Error optimizando original: ${error.message}`);
    }
  }

  shouldCreateResponsive(imagePath) {
    const stat = fs.statSync(imagePath);
    // Crear versiones responsive para imágenes > 500KB
    return stat.size > 500 * 1024;
  }

  async createResponsiveVersions(imagePath, filename, dir, ext) {
    const backupPath = `${imagePath}.backup`;

    try {
      for (const [sizeName, width] of Object.entries(this.sizes)) {
        const outputPath = path.join(dir, `${filename}-${sizeName}${ext}`);
        const webpOutputPath = path.join(dir, `${filename}-${sizeName}.webp`);

        // Crear versión redimensionada
        const resizeCommand = `convert "${backupPath}" -resize ${width}x -strip -quality ${this.quality} "${outputPath}"`;
        execSync(resizeCommand, { stdio: 'ignore' });

        // Crear versión WebP redimensionada
        const webpCommand = `cwebp -q ${this.webpQuality} "${outputPath}" -o "${webpOutputPath}"`;
        execSync(webpCommand, { stdio: 'ignore' });
      }

      console.log(`   📐 Versiones responsive creadas`);
    } catch (error) {
      console.warn(`   ⚠️  Error creando versiones responsive: ${error.message}`);
    }
  }

  generateReport() {
    const reportPath = path.join(__dirname, '..', 'OPTIMIZATION_REPORT.md');
    const report = `
# 📊 Reporte de Optimización de Imágenes

## Resumen
- **Fecha**: ${new Date().toLocaleDateString()}
- **Formatos procesados**: ${this.supportedFormats.join(', ')}
- **Calidad WebP**: ${this.webpQuality}%
- **Calidad original**: ${this.quality}%

## Tamaños Responsive Generados
${Object.entries(this.sizes).map(([name, size]) => `- **${name}**: ${size}px de ancho`).join('\n')}

## Implementación Recomendada

### Uso con Picture Element
\`\`\`html
<picture>
  <source srcset="imagen-small.webp 600w, imagen-medium.webp 1200w" type="image/webp">
  <source srcset="imagen-small.jpg 600w, imagen-medium.jpg 1200w" type="image/jpeg">
  <img src="imagen.jpg" alt="Descripción" loading="lazy" class="img-fluid">
</picture>
\`\`\`

### CSS para Responsive Images
\`\`\`css
.responsive-image {
  width: 100%;
  height: auto;
  object-fit: cover;
}
\`\`\`

## Próximos Pasos
1. Actualizar referencias HTML para usar \`<picture>\` elements
2. Implementar lazy loading en todas las imágenes
3. Configurar CDN para mejor delivery
4. Considerar AVIF para navegadores compatibles

---
*Generado automáticamente por el script de optimización*
`;

    fs.writeFileSync(reportPath, report);
    console.log(`📋 Reporte generado: ${reportPath}`);
  }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  const optimizer = new ImageOptimizer();
  optimizer.optimizeAll().then(() => {
    optimizer.generateReport();
  });
}

module.exports = ImageOptimizer;