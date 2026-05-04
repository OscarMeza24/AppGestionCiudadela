# 🏘️ App Gestión de Ciudadela

Sistema móvil profesional para control y gestión de ciudadelas/condominios. Permite monitorear visitantes, alertas de seguridad, mantenimiento y documentación de incidentes.

## ✨ Características Principales

### 📊 **Dashboard**
- Estadísticas en tiempo real (Visitantes, Alertas, Residentes, Eventos)
- Banner de alertas pendientes
- Timeline de actividad reciente
- Acciones rápidas (Reportar, Emergencia, Mensaje, Configurar)

### 🚨 **Alertas**
- Sistema de alertas categorizado (Seguridad, Mantenimiento, Avisos, Info)
- Filtros por tipo
- Indicadores de severidad (Crítica, Alta, Media, Baja)
- Marcar alertas como leídas
- Contador de notificaciones nuevas

### 📁 **Gestión de Documentos**
- Captura de fotos con cámara del dispositivo
- Selección de imágenes desde galería
- Categorización de documentos:
  - 🔴 **Incidentes** - Reportes de problemas/seguridad
  - 🔵 **Visitantes** - Registro de huéspedes
  - 🟠 **Mantenimiento** - Documentación de trabajos
- Estadísticas de documentos registrados
- Eliminación individual o masiva

## 🛠️ **Tech Stack**

- **Framework**: Expo + React Native + TypeScript
- **Routing**: Expo Router (Tab-based navigation)
- **UI Components**: React Native StyleSheet + Custom Components
- **Icons**: @expo/vector-icons (SF Symbols)
- **Image Picker**: expo-image-picker v17.0.11
- **Dark Mode**: Soporte automático light/dark

## 🎨 **Paleta de Colores**

```
Primario Turquesa:    #4ECDC4
Alerta Rojo:          #FF6B6B
Advertencia Naranja:  #FFB84D
Secundario Verde:     #95E1D3
Acento Rosa:          #F38181
```

## 📱 **Pantallas**

| Pantalla | Descripción | Estado |
|----------|-------------|--------|
| Dashboard | Overview del sistema | ✅ Completado |
| Alertas | Gestión de notificaciones | ✅ Completado |
| Gestión | Captura y organización de documentos | ✅ Completado |

## 🚀 **Instalación y Setup**

### Requisitos
- Node.js 18+
- npm o yarn
- Expo CLI

### Pasos

1. **Clonar repositorio**
```bash
git clone https://github.com/OscarMeza24/AppGestionCiudadela.git
cd AppGestionCiudadela
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Iniciar servidor de desarrollo**
```bash
npx expo start
```

4. **Ejecutar en dispositivo**
   - Presiona `a` para Android
   - Presiona `i` para iOS
   - Presiona `w` para Web
   - Escanea QR con Expo Go app

## 📋 **Próximas Funcionalidades (Roadmap)**

- [ ] Contexto global para compartir estado entre pantallas
- [ ] Persistencia de datos con AsyncStorage
- [ ] Modal de visualización de documentos
- [ ] Búsqueda y filtros avanzados
- [ ] Notificaciones push
- [ ] API Backend integration
- [ ] Exportación de reportes PDF
- [ ] Autenticación de usuarios
- [ ] Sincronización en la nube
- [ ] Modo offline

## 🏗️ **Estructura del Proyecto**

```
app/
├── (tabs)/
│   ├── _layout.tsx         # Configuración de navegación
│   ├── index.tsx           # Dashboard
│   ├── explore.tsx         # Alertas
│   └── gestion.tsx         # Gestión de documentos
├── _layout.tsx             # Layout raíz
└── modal.tsx               # Modal global
components/
├── themed-text.tsx         # Componente texto con tema
├── themed-view.tsx         # Componente vista con tema
└── ui/
    └── icon-symbol.tsx     # Sistema de iconos
constants/
└── theme.ts                # Constantes de color y tema
hooks/
├── use-color-scheme.ts     # Hook para detectar tema
└── use-theme-color.ts      # Hook para colores de tema
```

## 🔧 **Dependencias Clave**

```json
{
  "expo": "^54.0.33",
  "react": "^19.1.0",
  "react-native": "^0.76.3",
  "expo-router": "^3.5.16",
  "expo-image-picker": "^17.0.11",
  "@expo/vector-icons": "^14.0.2"
}
```

## 📝 **Notas de Desarrollo**

### Iconos válidos
- El sistema usa SF Symbols 7.0 (iOS)
- Iconos válidos: `person.fill`, `exclamationmark.triangle.fill`, `house.fill`, etc.
- Evitar: `gear.fill` → usar `gearshape.fill`, `archive.fill` → usar `archivebox.fill`

### Estilos y Responsive
- Grid items: `width: '48%'` para layouts de 2 columnas
- ScrollView anidados: usar `scrollEventThrottle={16}` para mejor rendimiento
- Padding consistente: `paddingHorizontal: 16`

### Permisos
El app requiere:
- `CAMERA` - Para captura de fotos
- `MEDIA_LIBRARY` - Para acceso a galería

## 📧 **Contacto**

**Desarrollador**: Oscar Meza  
**Repositorio**: https://github.com/OscarMeza24/AppGestionCiudadela

## 📄 **Licencia**

Este proyecto está bajo licencia MIT.

---

**Última actualización**: 4 de mayo de 2026
