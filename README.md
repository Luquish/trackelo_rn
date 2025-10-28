# Trackelo RN 📱

Aplicación móvil desarrollada con Expo Go y React Native.

## 🚀 Comenzar

### Prerrequisitos

- Node.js instalado
- npm o yarn
- Expo Go app instalada en tu dispositivo móvil (disponible en App Store y Google Play)

### Instalación

```bash
# Instalar dependencias
npm install
```

### Ejecutar la aplicación

```bash
# Iniciar servidor de desarrollo
npm start

# Para Android
npm run android

# Para iOS
npm run ios

# Para Web
npm run web
```

Escanea el código QR con la app de Expo Go en tu dispositivo para ver la aplicación en tu teléfono.

## 📦 Tecnologías

- **Expo** ~54.0.20
- **React** 19.1.0
- **React Native** 0.81.5
- **TypeScript** - Tipado estático
- **Expo Router** - Navegación basada en archivos

## 📁 Estructura del Proyecto

```
trackelo_rn/
├── app/             # Carpeta principal de la app (Expo Router)
│   ├── (tabs)/      # Grupo de navegación con tabs
│   │   ├── _layout.tsx    # Layout del navegador de tabs
│   │   ├── index.tsx      # Pantalla principal
│   │   └── explore.tsx    # Pantalla de explorar
│   └── _layout.tsx  # Layout raíz de la aplicación
├── assets/          # Imágenes, iconos y recursos
├── node_modules/    # Dependencias
├── app.json         # Configuración de Expo
├── tsconfig.json    # Configuración de TypeScript
└── package.json     # Dependencias y scripts
```

## 🔧 Desarrollo

Esta app usa **Expo Router** con navegación basada en archivos:
- Edita `app/(tabs)/index.tsx` para modificar la pantalla principal
- Edita `app/(tabs)/explore.tsx` para modificar la pantalla de explorar
- La navegación está configurada en `app/(tabs)/_layout.tsx`

### TypeScript
El proyecto está configurado con TypeScript. No necesitas importar React en cada archivo gracias a la nueva JSX Transform configurada en `tsconfig.json`.

## 📱 Plataformas Soportadas

- ✅ iOS
- ✅ Android
- ✅ Web

## 📄 Licencia

Ver archivo LICENSE para más detalles.

