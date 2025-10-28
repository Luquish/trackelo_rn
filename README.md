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
- **Tamagui UI** - Componentes universales para web y móvil
- **React Native Reanimated** - Animaciones de alto rendimiento
- **React Native Gesture Handler** - Gestos nativos avanzados
- **TanStack Query** - Manejo de estado del servidor
- **AsyncStorage** - Almacenamiento local persistente
- **Expo Vector Icons** - Iconografía completa

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

### Tamagui UI
La aplicación usa [Tamagui UI](https://tamagui.dev/ui/intro) para componentes universales que funcionan tanto en web como móvil. Incluye:
- **Layout**: YStack, XStack para diseño flexible
- **Components**: Card, Button, Input, Switch, etc.
- **Theming**: Sistema de temas integrado con colores semánticos
- **Performance**: Optimizado para React Native

### React Native Reanimated
[React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) proporciona animaciones de alto rendimiento:
- **120 FPS**: Ejecuta en UI thread nativo
- **API declarativa**: `withSpring()`, `withTiming()`, `FadeIn`, `SlideIn`
- **Layout animations**: Animaciones automáticas de entrada/salida
- **Worklets**: Código que ejecuta en UI thread

### TanStack Query (React Query)
[TanStack Query](https://tanstack.com/query/latest) maneja el estado del servidor de forma eficiente:
- **Caching inteligente**: Datos cacheados automáticamente
- **Sincronización**: Refetch automático en background
- **Mutations**: Operaciones de escritura optimizadas
- **Loading states**: Estados de carga, error y éxito
- **Offline support**: Funciona sin conexión

### AsyncStorage
[AsyncStorage](https://react-native-async-storage.github.io/async-storage/) proporciona almacenamiento local persistente:
- **Persistencia**: Datos guardados entre sesiones
- **Async/await**: API moderna y fácil de usar
- **JSON support**: Serialización automática
- **Cross-platform**: Funciona en iOS y Android

### Expo Vector Icons
[Expo Vector Icons](https://docs.expo.dev/guides/icons/) incluye múltiples familias de iconos:
- **Ionicons**: Iconos de iOS y Material Design
- **MaterialIcons**: Iconos de Google Material Design
- **FontAwesome**: Iconos populares de FontAwesome
- **AntDesign**: Iconos del sistema Ant Design

## 📱 Plataformas Soportadas

- ✅ iOS
- ✅ Android
- ✅ Web

## 📄 Licencia

Ver archivo LICENSE para más detalles.

