@echo off
REM Script de Deploy para Windows
REM Amigas y Amigos por los Cementerios

echo 🚀 Iniciando proceso de deploy...

REM Limpiar build anterior
echo 🧹 Limpiando build anterior...
if exist dist rmdir /s /q dist

REM Instalar dependencias
echo 📦 Instalando dependencias...
call npm ci

REM Crear nuevo build
echo 🔨 Creando build de producción...
call npm run build

REM Verificar que el build fue exitoso
if exist dist (
    echo ✅ Build completado exitosamente
    echo 📊 Contenido generado en dist/
    dir dist /s
) else (
    echo ❌ Error: Build falló
    exit /b 1
)

echo.
echo 🎉 LISTO PARA DEPLOY!
echo.
echo 📋 Opciones de deploy:
echo 1. Manual: Sube la carpeta 'dist/' a Cloudflare Pages
echo 2. CLI: wrangler pages deploy dist/
echo 3. Git: Push a tu repositorio conectado
echo.
echo 🔗 URLs después del deploy:
echo - Sitio principal: https://tu-proyecto.pages.dev
echo - Panel admin: https://tu-proyecto.pages.dev/admin
echo - Login: admin / cementerios2024
echo.
echo 📚 Documentación: README.md y DEPLOYMENT.md

pause