# Vite + React + TypeScript + zustand + axios + BFF

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

BFF combined with MVC front-end practice.

## 项目结构

```
react-vite-temp
├─ .env
├─ .eslintrc.cjs
├─ .prettierignore
├─ .prettierrc
├─ README.md
├─ index.html
├─ package.json
├─ postcss.config.js
├─ public
│  └─ vite.svg
├─ src
│  ├─ App.css
│  ├─ App.tsx
│  ├─ assets
│  │  └─ react.svg
│  ├─ components
│  │  ├─ Loading.tsx
│  │  └─ WithAuth.tsx
│  ├─ configs
│  │  └─ router.ts
│  ├─ constants
│  │  └─ routes.ts
│  ├─ hooks
│  │  ├─ use.ts
│  │  └─ useAuth.ts
│  ├─ layouts
│  │  └─ BaseLayout.tsx
│  ├─ main.tsx
│  ├─ pages
│  │  ├─ ErrorBoundary.tsx
│  │  ├─ Forbidden.tsx
│  │  ├─ NotFound.tsx
│  │  ├─ home
│  │  │  ├─ components
│  │  │  │  └─ list.tsx
│  │  │  ├─ controller.ts
│  │  │  ├─ index.tsx
│  │  │  ├─ service.ts
│  │  │  └─ type.ts
│  │  └─ test
│  │     └─ index.tsx
│  ├─ services
│  │  └─ global-api.ts
│  ├─ stores
│  │  ├─ useApp.ts
│  │  └─ useCounter.ts
│  ├─ tailwind.css
│  ├─ utils
│  │  ├─ interceptor.ts
│  │  ├─ request.ts
│  │  ├─ router.ts
│  │  ├─ transfer.ts
│  │  └─ zustand.ts
│  └─ vite-env.d.ts
├─ tailwind.config.js
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
├─ vite.config.ts
└─ yarn.lock

```