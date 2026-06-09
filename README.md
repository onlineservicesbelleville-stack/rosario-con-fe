# 📿 Rosario con Fe

Aplicación móvil católica para iOS y Android que guía a familias, niños y principiantes en el rezo del Santo Rosario paso a paso.

---

## Stack Técnico

| Tecnología | Uso |
|---|---|
| React Native + Expo | Base de la app |
| TypeScript | Tipado estático |
| Expo Router | Navegación basada en archivos |
| Firebase Auth / Firestore / Storage | Backend y autenticación |
| Expo AV | Reproducción de audio |
| Expo Notifications | Recordatorios diarios |
| RevenueCat | Suscripciones y pagos |
| Zustand | Estado global |
| AsyncStorage | Datos locales persistentes |
| EAS Build | Compilación y publicación |

---

## Instalación

```bash
cd rosario-con-fe
npm install
```

---

## Variables de Entorno

Copia el archivo de ejemplo:

```bash
cp .env.example .env
```

Edita `.env` con tus claves reales (ver sección Firebase y RevenueCat más abajo).

---

## Correr localmente

```bash
npx expo start
```

Escanea el QR con Expo Go para probar en dispositivo físico.
Para probar en simulador iOS: presiona `i` en la terminal.
Para probar en emulador Android: presiona `a`.

---

## Development Build (recomendado)

Para funciones nativas como notificaciones y RevenueCat necesitas un development build:

```bash
# Instala EAS CLI globalmente
npm install -g eas-cli

# Autentica con Expo
eas login

# Configura EAS
eas build:configure

# Build para iOS (simulador)
eas build --platform ios --profile development

# Build para Android (APK)
eas build --platform android --profile development
```

---

## Configurar Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com)
2. Crea un nuevo proyecto: `rosario-con-fe`
3. Agrega una app iOS y una app Android
4. Descarga `GoogleService-Info.plist` (iOS) y `google-services.json` (Android)
5. Colócalos en la raíz del proyecto
6. Copia las claves al archivo `.env`:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=tu_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=tu_proyecto
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
EXPO_PUBLIC_FIREBASE_APP_ID=1:123456789:ios:abc123
```

7. En Firebase Console, habilita:
   - Authentication → Email/Password y Anónimo
   - Firestore Database (modo de prueba inicialmente)
   - Storage

---

## Configurar RevenueCat

1. Ve a [RevenueCat Dashboard](https://app.revenuecat.com)
2. Crea un nuevo proyecto
3. Conecta tu app de App Store Connect y Google Play
4. Crea los productos:
   - `rosario_premium_monthly`
   - `rosario_premium_yearly`
5. Crea un Entitlement llamado `premium`
6. Agrega las API keys al `.env`:

```env
EXPO_PUBLIC_REVENUECAT_IOS_API_KEY=appl_xxxxxxxxxx
EXPO_PUBLIC_REVENUECAT_ANDROID_API_KEY=goog_xxxxxxxxxx
```

---

## Configurar iOS (App Store)

1. Crea un Apple Developer Account ($99/año)
2. En App Store Connect, crea una nueva app con bundle ID: `com.tuempresa.rosarioconfe`
3. Actualiza en `app.json`:
   ```json
   "bundleIdentifier": "com.tuempresa.rosarioconfe"
   ```
4. Actualiza en `eas.json` → submit → ios

---

## Configurar Android (Google Play)

1. Crea una cuenta de Google Play Developer ($25 única vez)
2. Crea una nueva app en Google Play Console
3. Actualiza en `app.json`:
   ```json
   "package": "com.tuempresa.rosarioconfe"
   ```
4. Genera/descarga el archivo `google-service-account.json` de Google Play Console
5. Actualiza en `eas.json` → submit → android

---

## Compilar con EAS

```bash
# Build de preview (para probar antes de publicar)
eas build --platform all --profile preview

# Build de producción
eas build --platform ios --profile production
eas build --platform android --profile production
```

---

## Publicar

```bash
# Enviar a App Store (requiere cuenta Apple)
eas submit --platform ios --profile production

# Enviar a Google Play (requiere cuenta Google)
eas submit --platform android --profile production
```

---

## Estructura de Carpetas

```
rosario-con-fe/
├── app/                     # Pantallas (Expo Router)
│   ├── _layout.tsx          # Layout raíz
│   ├── index.tsx            # Redirección inicial
│   ├── onboarding.tsx       # Onboarding (4 slides)
│   ├── home.tsx             # Pantalla principal
│   ├── rosary/              # Sección Rosario
│   ├── prayers/             # Oraciones
│   ├── mysteries/           # Misterios
│   ├── kids/                # Modo Niños
│   ├── family/              # Modo Familia
│   ├── premium/             # Paywall
│   ├── settings/            # Ajustes
│   └── auth/                # Login/Registro
│
├── src/
│   ├── components/          # Componentes reutilizables
│   ├── constants/           # Colores, tema, rutas, config
│   ├── data/                # Datos locales (oraciones, misterios)
│   ├── firebase/            # Firebase (preparado)
│   ├── hooks/               # Custom hooks
│   ├── services/            # Lógica de negocio
│   ├── store/               # Estado global (Zustand)
│   ├── types/               # Tipos TypeScript
│   └── utils/               # Utilidades
│
└── assets/                  # Imágenes, íconos, audios
```

---

## Próximos Pasos

### Firebase
- [ ] Crear proyecto en Firebase Console
- [ ] Configurar autenticación
- [ ] Subir audios a Firebase Storage
- [ ] Habilitar Firestore con reglas de seguridad

### RevenueCat
- [ ] Crear productos en App Store Connect y Google Play Console
- [ ] Configurar RevenueCat con los productos
- [ ] Conectar API keys

### Contenido
- [ ] Grabar o contratar narración profesional de oraciones y misterios
- [ ] Crear imágenes para cada misterio
- [ ] Agregar más modos de rosario (dormir, familia, salud)

### App Store / Google Play
- [ ] Crear íconos oficiales (1024x1024 para iOS, 512x512 para Android)
- [ ] Crear pantalla de splash oficial
- [ ] Preparar capturas de pantalla para las tiendas
- [ ] Escribir descripción de la app en español
- [ ] Configurar clasificación de contenido

### Fase 2
- [ ] Novenas populares
- [ ] Santos del día
- [ ] Meditaciones guiadas
- [ ] Modo offline completo
- [ ] Logros y gamificación
- [ ] Notificaciones con el misterio del día
