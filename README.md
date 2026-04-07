# Tsuya 🎯

> PWA React — Habit tracker gamifié

![React](https://img.shields.io/badge/React-19-blue) ![Vite](https://img.shields.io/badge/Vite-8-purple) ![Tailwind](https://img.shields.io/badge/Tailwind-4-teal) ![PWA](https://img.shields.io/badge/PWA-ready-green)

---

## 🚀 Démarrage

### Prérequis

- **Node.js** `>=18.0.0`
- **npm** `>=9.0.0`

```bash
# Installation
npm install --legacy-peer-deps

# Développement
npm run dev

# Build production
npm run build

# Prévisualisation
npm run preview
```

---

## ✨ Fonctionnalités

- **Onboarding** — Slider animé avec swipe mobile, transitions fluides
- **Authentification** — Login / Register avec tabs, boutons sociaux (Apple, Google, Facebook)
- **Setup utilisateur** — Sélection du genre + choix des premières habitudes
- **PWA** — Installable sur mobile et desktop, service worker, manifest
- **Responsive** — Mobile first, adapté desktop 50/50

---

## 🛠 Stack technique

| Technologie     | Version | Usage      |
| --------------- | ------- | ---------- |
| React           | 19      | UI         |
| Vite            | 8       | Bundler    |
| Tailwind CSS    | 4       | Styles     |
| React Router    | 7       | Navigation |
| vite-plugin-pwa | 1.2     | PWA        |

---

## 📁 Structure du projet

```
src/
├── components/
│   ├── onboarding/     # HabitCard, ChallengeCard, HabitRow, SocialButtons, StepIndicator
│   └── setup/          # GenderCard, HabitCard, CategoryCard
├── pages/
│   ├── onboarding/     # Splash, OnboardingSlider
│   ├── auth/           # Auth (login + register)
│   └── setup/          # Gender, HabitPicker
├── lib/
│   └── utils.js
├── App.jsx             # Routes
└── main.jsx
```

---

## 🎨 Routes

| Chemin               | Page                     |
| -------------------- | ------------------------ |
| `/onboarding`        | Splash screen            |
| `/onboarding/slides` | Slider onboarding        |
| `/auth`              | Login / Register         |
| `/setup/gender`      | Choix du genre           |
| `/setup/habits`      | Choix des habitudes      |
| `/home`              | App principale (à venir) |

---

## 🎨 Charte couleurs

| Couleur        | Hex       | Usage                |
| -------------- | --------- | -------------------- |
| Bleu foncé     | `#1A4B8C` | Titres, contrastes   |
| Bleu principal | `#3A81C2` | Boutons, accents     |
| Bleu clair     | `#8CC5E8` | Éléments secondaires |
| Blanc          | `#FFFFFF` | Fond principal       |
| Gris clair     | `#F5F5F5` | Fond secondaire      |

---

## 🔧 Configuration

```js
// vite.config.js — alias path
resolve: {
  alias: { '@': path.resolve(__dirname, './src') }
}
```

```json
// jsconfig.json — autocomplétion VS Code
{
  "compilerOptions": {
    "paths": { "@/*": ["src/*"] }
  }
}
```
---

## 📌 Notes importantes

> ⚠️ Utiliser `--legacy-peer-deps` pour toutes les installations npm — incompatibilité entre `vite-plugin-pwa` et Vite 8.

```bash
npm install <package> --legacy-peer-deps
```

---

_Built with ❤️ by Yanina_
