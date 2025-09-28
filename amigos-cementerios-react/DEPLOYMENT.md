# 🚀 Guía de Despliegue en Cloudflare Pages

Esta guía te llevará paso a paso para desplegar la nueva plataforma "Amigas y Amigos por los Cementerios" en Cloudflare Pages.

## 📋 Prerrequisitos

- ✅ Cuenta de Cloudflare activa
- ✅ Dominio configurado en Cloudflare (opcional)
- ✅ Git repository (GitHub, GitLab, o Bitbucket)
- ✅ Node.js 18+ instalado localmente

## 🎯 Opción 1: Despliegue Automático desde Git (Recomendado)

### Paso 1: Preparar el Repositorio
```bash
# Si no tienes un repositorio, créalo
git init
git add .
git commit -m "feat: initial commit - modern platform for cementerios"
git branch -M main
git remote add origin https://github.com/tu-usuario/amigos-cementerios.git
git push -u origin main
```

### Paso 2: Configurar Cloudflare Pages
1. **Accede a Cloudflare Dashboard**
   - Ve a https://dash.cloudflare.com
   - Navega a "Pages" en el menú lateral

2. **Crear Nuevo Proyecto**
   - Haz clic en "Create a project"
   - Selecciona "Connect to Git"
   - Autoriza y selecciona tu repositorio

3. **Configuración de Build**
   ```
   Framework preset: React
   Build command: npm run build
   Build output directory: dist
   Root directory: /
   ```

4. **Variables de Entorno**
   ```
   NODE_VERSION=18
   VITE_APP_NAME=Amigas y Amigos por los Cementerios
   VITE_APP_VERSION=2.0.0
   VITE_CONTACT_EMAIL=contacto@amigosporloscementerios.cl
   ```

### Paso 3: Configuración Avanzada

#### Funciones de Cloudflare
- Las funciones en `/functions/api/` se desplegarán automáticamente
- Endpoints disponibles:
  - `/api/contact` - Formulario de contacto
  - `/api/auth` - Autenticación
  - `/api/test` - Endpoint de prueba

#### Redirects y Headers
- `public/_redirects` - Configuración de SPA routing
- `public/_headers` - Headers de seguridad y cache

## 🎯 Opción 2: Despliegue Manual

### Paso 1: Build Local
```bash
# Instalar dependencias
npm install

# Crear build de producción
npm run build

# Verificar que se creó la carpeta dist/
ls -la dist/
```

### Paso 2: Upload Manual
1. En Cloudflare Pages, selecciona "Upload assets"
2. Arrastra la carpeta `dist/` completa
3. Configura el nombre del proyecto

## ⚙️ Configuración de Dominio Personalizado

### Dominio Principal
1. En tu proyecto de Pages, ve a "Custom domains"
2. Haz clic en "Set up a custom domain"
3. Ingresa tu dominio (ej: `cementerios.cl`)
4. Sigue las instrucciones de verificación DNS

### Subdominios
```
admin.cementerios.cl  → /admin
blog.cementerios.cl   → /blog
biblioteca.cementerios.cl → /biblioteca
```

## 🔒 Configuración de Seguridad

### Headers de Seguridad (Ya configurados)
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin

### SSL/TLS
- Cloudflare maneja automáticamente SSL
- Certificados renovados automáticamente
- HTTP → HTTPS redirect habilitado

## 📊 Analytics y Monitoreo

### Web Analytics
1. En Cloudflare Dashboard → Analytics
2. Habilita "Web Analytics"
3. Agrega el código a tu sitio (opcional)

### Real User Monitoring
- Ve a Speed → Optimization
- Habilita "Browser Insights"

## 🚀 Performance Optimization

### Cache Rules (Recomendadas)
```
Cache Level: Standard
Browser TTL: 4 hours
Edge TTL: 2 hours
```

### Page Rules
```
cementerios.cl/assets/*
- Cache Level: Cache Everything
- Edge Cache TTL: 1 month

cementerios.cl/img/*
- Cache Level: Cache Everything
- Edge Cache TTL: 1 month
```

## 🔧 CI/CD Automation

### GitHub Actions (Opcional)
```yaml
# .github/workflows/deploy.yml
name: Deploy to Cloudflare Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: amigos-cementerios
          directory: dist
```

## 🌍 CDN Global

Cloudflare distribuye automáticamente tu sitio en más de 275 ubicaciones:

- **América**: Santiago, Buenos Aires, São Paulo, Miami, Los Angeles
- **Europa**: Londres, París, Frankfurt, Amsterdam
- **Asia**: Tokio, Singapur, Hong Kong, Mumbai

## 📱 Preview Deployments

Cada pull request crea automáticamente un preview:
- URL única para testing
- No afecta producción
- Feedback directo en GitHub

## 🐛 Troubleshooting

### Error: "Build Failed"
```bash
# Verificar localmente
npm run build

# Si hay errores de TypeScript
npm run lint:fix

# Limpiar cache
npm run clean
npm run build
```

### Error: "Functions not working"
- Verifica que los archivos estén en `/functions/api/`
- Revisa los logs en Cloudflare Dashboard
- Comprueba CORS headers

### Error: "Routing 404"
- Verifica que `_redirects` esté en `/public/`
- Confirma que el SPA routing esté configurado

## 📈 Monitoring

### Métricas Importantes
- **Core Web Vitals**: LCP, FID, CLS
- **Response Time**: < 200ms objetivo
- **Uptime**: 99.9% garantizado por Cloudflare
- **Cache Hit Rate**: > 90% objetivo

### Alertas
Configura alertas para:
- Downtime del sitio
- Errores 5xx
- Tiempo de respuesta alto
- Tráfico inusual

## 💰 Costos

### Cloudflare Pages (Plan Gratuito)
- ✅ 1 build concurrente
- ✅ 500 builds/mes
- ✅ Bandwidth ilimitado
- ✅ 100 dominios personalizados

### Plan Pro ($20/mes)
- ✅ 5 builds concurrentes
- ✅ 5,000 builds/mes
- ✅ Preview branches ilimitados
- ✅ Analytics avanzados

## 🎉 Post-Deployment

### Verificaciones
1. ✅ Sitio carga correctamente
2. ✅ Navegación SPA funciona
3. ✅ Panel admin accesible
4. ✅ Formularios funcionan
5. ✅ Imágenes cargan
6. ✅ Performance > 90 en PageSpeed

### Siguiente Pasos
1. **Configurar Analytics**
2. **SEO Optimization**
3. **Content Migration**
4. **Team Training**
5. **Backup Strategy**

## 📞 Soporte

### Para el Equipo
- **Acceso Admin**: usuario `admin`, contraseña `cementerios2024`
- **Acceso Admin**: Las credenciales de acceso se gestionan de forma segura y se comunican al equipo a través de los canales designados.
- **Documentación**: Este archivo + README.md
- **Soporte Técnico**: Daniel Aguilera (@lowlufi)

### Recursos
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [React Router Docs](https://reactrouter.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/)

---

🎊 **¡Felicitaciones! Tu nueva plataforma está lista para hacer historia digital del patrimonio funerario de Valparaíso.**