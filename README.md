# Acads Case Studies Automata

This project is a **Windows XP–style desktop** web application built with **Astro**, **React**, and **Tailwind CSS v4**. It runs as a server-side rendered application with **dynamic React islands**, and is deployed via **Vercel** for zero‑config CI/CD.

- **Live demo:** [acads-case-studies-automata.vercel.app](https://acads-case-studies-automata.vercel.app/)
- **Portfolio case study:** [marksiazon.dev/projects/automata-winxp](https://www.marksiazon.dev/projects/automata-winxp)

## 🚀 Tech Stack

- **Framework**: [Astro](https://astro.build/) v7.3.5
- **UI Library**: [React](https://reactjs.org/) v19.1.0 (hydrated within Astro islands)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (via `@tailwindcss/vite`)
- **Deployment**: [Vercel](https://vercel.com) (using `@astrojs/vercel` adapter)
- **Icons**: [Lucide Icons](https://lucide.dev/) via `@lucide/astro` and `lucide-react`
- **Animation**: [GSAP (GreenSock Animation Platform)](https://greensock.com/gsap/) v3.13.0
- **Quality**: GitHub Actions CI (`npm run build`), Dependabot, `@vercel/analytics` + `@vercel/speed-insights` (free tier)

## 📂 Project Structure

A brief overview of the key directories and files:

```text
/                               # repo root
├── public/                     # Static assets (icons, images)
│   ├── favicon.png
│   ├── favicon.svg
│   └── xp-icon/                # XP-themed icons
├── src/
│   ├── assets/                 # Project-specific static assets (SVGs)
│   ├── components/             # Reusable UI components
│   │   ├── home/               # Components for the main desktop interface
│   │   │   ├── Background.astro
│   │   │   ├── HomeContent.astro # Display windows component
│   │   │   ├── Window.tsx      # Core window component
│   │   │   ├── windowManager.ts # Logic for managing windows
│   │   │   └── Taskbar/        # Taskbar related components
│   │   └── windows/            # Components for specific "applications" or "exercises"
│   ├── layouts/                # Astro layout components
│   │   └── Layout.astro        # Main site layout
│   ├── pages/                  # Astro pages (server-side rendered routes)
│   │   └── index.astro         # Homepage
│   └── styles/                 # Global, Tailwind CSS and modular styles
├── astro.config.mjs            # Astro configuration (integrations, Vercel adapter)
├── tailwind.config.mjs         # Tailwind CSS configuration
├── package.json                # Project dependencies and scripts
├── tsconfig.json               # TypeScript configuration
```

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v22 or higher (see `engines` in `package.json`)
- npm

### Installation

1. **Clone the repository:**

   ```bash
   git clone <your-repository-url>
   cd Acads-Case-Studies-Automata
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

### Running in Development Mode

1. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   This will start the Astro development server, typically at `http://localhost:4321`.

## 🧞 Available Commands

All commands are run from the root of the project in a terminal:

| Command             | Action                                                 |
| :------------------ | :----------------------------------------------------- |
| `npm install`       | Installs project dependencies                          |
| `npm run dev`       | Starts the local development server                    |
| `npm run build`     | Builds the project for production (outputs to `dist/`) |
| `npm run preview`   | Previews the production build locally                  |
| `npm run astro ...` | Access Astro CLI commands (e.g., `astro check`)        |

### 🚀 Deploy to Vercel

The project is configured for automatic deployment on Vercel:

1. **Push to your repository** - Vercel will automatically detect changes and deploy
2. **Manual deployment** (if needed):
   ```bash
   npm run build
   vercel --prod
   ```

Your site will be available at `https://<your-vercel-project>.vercel.app`.

### 📊 Web Analytics & Speed Insights (free)

This project uses the **standard (free) tier** only — `@vercel/analytics/astro` and `@vercel/speed-insights/astro` in `Layout.astro`. It does **not** use Web Analytics Plus, Speed Insights Plus, server-side custom events, or any paid Vercel observability add-ons.

| Feature | Hobby plan (free) | If you exceed the limit |
| --- | --- | --- |
| [Web Analytics](https://vercel.com/docs/analytics/limits-and-pricing) | 50,000 pageview events / month | Collection pauses; **no charge** on Hobby |
| [Speed Insights](https://vercel.com/docs/speed-insights/limits-and-pricing) | 10,000 events / team / 30 days | Collection pauses 14 days; **no charge** on Hobby |

The npm packages are free to install. You only pay if you upgrade to Pro and buy add-ons — **do not enable “Plus” toggles** in the Vercel dashboard unless you intend to pay.

After deploying on a **Hobby (free) team**, enable once in the project dashboard:

1. **Project → Analytics** → enable **Web Analytics** (not Web Analytics Plus)
2. **Project → Speed Insights** → enable **Speed Insights** (not Speed Insights Plus)

Data appears after the next production deployment.

## ✨ Key Features

- **Desktop-like UI**: The application mimics a Windows XP-style desktop environment with a taskbar, start menu, and draggable/resizable windows.
- **Interactive Exercises**: Includes interactive "applications" for mathematical concepts like Fibonacci sequence, Pascal's Triangle, and Tribonacci sequence.
- **Component-Based Architecture**: Leverages Astro for server-side rendering and React for dynamic UI components.
- **Tailwind CSS Styling**: Utilizes Tailwind CSS v4 for rapid and consistent styling.

## 🎨 Styling

- **Tailwind CSS v4**: The primary styling method. Configuration is in `tailwind.config.mjs`.
- **Global Styles**: Base styles and Tailwind imports are in `src/styles/global.css`.
- **CSS Modules**: Used for component-specific styles where needed.

## 📚 Learn More

- [Astro Documentation](https://docs.astro.build)
- [React Documentation](https://reactjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev/)
- [GSAP Documentation](https://greensock.com/docs/)
- _Finished and Archived: 5/28/2025 ~M. Siazon_
