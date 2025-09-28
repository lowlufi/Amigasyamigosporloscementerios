# ⚡ Setup Rápido en Cloudflare Pages

## 🚀 Instrucciones Express (5 minutos)

### 1. Acceder a Cloudflare
```
1. Ve a: https://dash.cloudflare.com
2. Navega a "Pages" en el menú lateral
3. Haz clic en "Create a project"
```

### 2. Opción A: Desde Git (Recomendado)
```
1. Selecciona "Connect to Git"
2. Autoriza GitHub/GitLab/Bitbucket
3. Selecciona tu repositorio
4. Usa esta configuración:

   Framework preset: React
   Build command: npm run build
   Build output directory: dist
   Root directory: /
   Node.js version: 18
```

### 3. Opción B: Upload Manual
```
1. Ejecuta en tu máquina:
   cd amigos-cementerios-react
   npm run build

2. En Cloudflare Pages:
   - Selecciona "Upload assets"
   - Arrastra la carpeta 'dist' completa
   - Nombra el proyecto: "amigos-cementerios"
```

### 4. Variables de Entorno (Opcional)
```
NODE_VERSION = 18
VITE_APP_NAME = Amigas y Amigos por los Cementerios
```

### 5. Configurar Dominio (Opcional)
```
1. En tu proyecto → Custom domains
2. Add custom domain
3. Ingresa tu dominio
4. Sigue las instrucciones DNS
```

## ✅ Verificación Post-Deploy

Verifica que funcione:
- [ ] ✅ Sitio principal carga
- [ ] ✅ Navegación funciona
- [ ] ✅ Admin panel accesible (/admin)
- [ ] ✅ Login funciona (admin/cementerios2024)
- [ ] ✅ Imágenes cargan correctamente

## 🔗 URLs Importantes

Después del deploy tendrás:
- **Sitio principal**: `https://tu-proyecto.pages.dev`
- **Admin panel**: `https://tu-proyecto.pages.dev/admin`
- **API endpoints**: `https://tu-proyecto.pages.dev/api/*`

## 🆘 Solución de Problemas

### Build falla:
```bash
# Localmente:
npm install
npm run build
# Si funciona local → problema de configuración CF
```

### 404 en rutas:
```
Causa: Falta _redirects
Solución: Verificar que public/_redirects exista
```

### Imágenes no cargan:
```
Causa: Ruta incorrecta
Solución: Las imágenes deben estar en public/img/
```

## 📞 Soporte Express

**Demo Login:**
- Usuario: `admin`
- Contraseña: `cementerios2024`

**¿Problemas?**
Revisa los logs en: Cloudflare Dashboard → Pages → tu-proyecto → Functions

---
🎉 **¡En 5 minutos tu nueva plataforma estará online!**