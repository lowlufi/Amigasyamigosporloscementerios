#!/bin/bash

# Script de Deploy Automatizado para Cloudflare Pages
# Amigas y Amigos por los Cementerios

echo "🚀 Iniciando proceso de deploy..."

# Limpiar build anterior
echo "🧹 Limpiando build anterior..."
rm -rf dist/

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

# Crear nuevo build
echo "🔨 Creando build de producción..."
npm run build

# Verificar que el build fue exitoso
if [ -d "dist" ]; then
    echo "✅ Build completado exitosamente"
    echo "📊 Archivos generados:"
    find dist/ -type f | wc -l
    echo "📁 Tamaño total:"
    du -sh dist/
else
    echo "❌ Error: Build falló"
    exit 1
fi

echo ""
echo "🎉 LISTO PARA DEPLOY!"
echo ""
echo "📋 Opciones de deploy:"
echo "1. Manual: Sube la carpeta 'dist/' a Cloudflare Pages"
echo "2. CLI: wrangler pages deploy dist/"
echo "3. Git: Push a tu repositorio conectado"
echo ""
echo "🔗 URLs después del deploy:"
echo "- Sitio principal: https://tu-proyecto.pages.dev"
echo "- Panel admin: https://tu-proyecto.pages.dev/admin"
echo "- Login: admin / cementerios2024"
echo ""
echo "📚 Documentación: README.md y DEPLOYMENT.md"