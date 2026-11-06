# FinanTrack Frontend

Interfaz web de FinanTrack para registrar usuarios, iniciar sesión y visualizar un dashboard de finanzas personales. Está desarrollada con React, TypeScript y Vite.

## Estado actual

- El registro y el inicio de sesión consumen la API real de FinanTrack.
- El token JWT se guarda en `localStorage` cuando se selecciona **Recordarme** y en `sessionStorage` en caso contrario.
- Las rutas privadas comprueban que exista un token antes de mostrar el dashboard.
- Los datos financieros visibles en el dashboard todavía son datos locales de demostración.
- Las secciones del menú lateral aún no tienen navegación propia.

## Tecnologías

- React 18
- TypeScript
- Vite 5
- React Router
- Axios
- React Hook Form y Zod
- TanStack Query
- Recharts
- Lucide React
- Tailwind CSS / PostCSS

## Requisitos

- Node.js 20 o superior
- npm
- FinanTrack API en ejecución para registro e inicio de sesión

## Instalación

Desde la carpeta del frontend:

```bash
cd finantrackfront
npm install
```

## Variables de entorno

Crea un archivo `.env.local` con la URL base del backend:

```env
VITE_API_URL=http://localhost:3000
```

La URL debe apuntar a la raíz de la API y no a Swagger. Si no se define la variable, la aplicación usa `http://localhost:3000`.

> Reinicia el servidor de Vite después de modificar variables de entorno. Solo las variables que empiezan por `VITE_` quedan disponibles en el navegador.

## Ejecución

1. Inicia primero el backend en `http://localhost:3000`.
2. Inicia el frontend:

```bash
npm run dev
```

Abre `http://localhost:5173` en el navegador.

## Scripts

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia Vite con recarga automática |
| `npm run build` | Valida TypeScript y genera el build en `dist/` |
| `npm run preview` | Sirve localmente el build de producción |

## Rutas

| Ruta | Descripción | Acceso |
|---|---|---|
| `/login` | Inicio de sesión | Público |
| `/register` | Creación de cuenta | Público |
| `/dashboard` | Resumen financiero | Requiere token |
| Cualquier otra | Redirige a `/login` | — |

## Integración con la API

La instancia de Axios está en `src/services/api.ts`. Agrega automáticamente el encabezado de autorización cuando encuentra un token:

```http
Authorization: Bearer <access_token>
```

Endpoints consumidos actualmente:

| Método | Endpoint | Uso |
|---|---|---|
| `POST` | `/auth/register` | Crear una cuenta y guardar la sesión |
| `POST` | `/auth/login` | Autenticar al usuario y guardar la sesión |

Para desarrollo local, el backend debe permitir el origen del frontend mediante esta variable:

```env
FRONTEND_URL=http://localhost:5173
```

## Estructura principal

```text
src/
├── components/
│   ├── charts/       # Gráficas del dashboard
│   ├── layout/       # Navbar y barra lateral
│   └── ui/           # Tarjetas, cuentas y movimientos
├── hooks/            # Hooks de autenticación y cuentas
├── images/           # Recursos visuales
├── pages/
│   ├── auth/         # Login y registro
│   ├── dashboard/    # Dashboard principal
│   └── ...           # Vistas previstas para otros módulos
├── routes/           # Definición y protección de rutas
├── services/         # Cliente HTTP y servicios
├── App.tsx
└── main.tsx
```

## Build de producción

```bash
npm run build
npm run preview
```

El contenido generado queda en `dist/`. En el entorno de despliegue configura `VITE_API_URL` con la URL pública del backend antes de ejecutar el build.

Si la aplicación se sirve desde un hosting estático, configura una regla de fallback hacia `index.html` para que React Router pueda resolver rutas como `/login`, `/register` y `/dashboard` al recargar la página.
