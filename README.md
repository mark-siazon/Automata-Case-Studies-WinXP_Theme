# Acads Case Studies Automata

This project is a **Windows XP–style desktop** web application built with **Astro**, **React**, and **Tailwind CSS v4**. It runs as a static front-end with **dynamic React islands**, and is deployed via **Vercel Serverless** for zero‑config CI/CD.

## 🚀 Tech Stack

- **Framework**: [Astro](https://astro.build/)
- **UI Library**: [React](https://reactjs.org/) (hydrated within Astro islands)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (via `@tailwindcss/vite`)
- **Deployment**: [Vercel Serverless Functions](https://vercel.com/docs/functions/serverless-functions) (Serverless Functions adapter `@astrojs/vercel/serverless`)
- **Icons**: [Lucide Icons](https://lucide.dev/) (used with `lucide-astro` and `lucide-react`)
- **Animation**: [GSAP (GreenSock Animation Platform)](https://greensock.com/gsap/) (optional, listed in dependencies)

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
│   ├── pages/                  # Astro pages  (static routes)
│   │   └── index.astro         # Homepage
│   └── styles/                 # Global, Tailwind CSS and modular styles
├── astro.config.mjs            # Astro configuration (integrations, Vercel adapter)
├── tailwind.config.mjs         # Tailwind CSS configuration
├── package.json                # Project dependencies and scripts
├── tsconfig.json               # TypeScript configuration
```

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm (comes with Node.js)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <your-repository-url>
    cd Acads-Case-Studies-Automata
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Running in Development Mode

1.  **Start the development server:**
    ```bash
    npm run dev
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

Vercel provides instant production previews and auto‑deploys on push:

1. **Install Vercel CLI** (if needed): `npm i -g vercel`
2. **Login**: `vercel login`
3. **Deploy**:
   ```bash
   npm run build
   vercel --prod
   ```
4. **(Optional)** Link your GitHub repo in Vercel dashboard for continuous deploys.

Your site will be available at `https://<your-vercel-project>.vercel.app`.

## ✨ Key Features

- **Desktop-like UI**: The application mimics a Windows XP-style desktop environment with a taskbar, start menu, and draggable/resizable windows.
- **Interactive Exercises**: Includes interactive "applications" for mathematical concepts like Fibonacci sequence, Pascal's Triangle, and Tribonacci sequence.
- **Component-Based Architecture**: Leverages Astro for static site generation and React for dynamic UI components.
- **Tailwind CSS Styling**: Utilizes Tailwind CSS for rapid and consistent styling.

## 🎨 Styling

- **Tailwind CSS**: The primary styling method. Configuration is in `tailwind.config.mjs`.
- **Global Styles**: Base styles and Tailwind imports are in `src/styles/global.css`.
- **CSS Modules**: Used for component-specific styles where needed (e.g., `src/styles/exer.pascal.module.css`).

## 📚 Learn More

- [Astro Documentation](https://docs.astro.build)
- [React Documentation](https://reactjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev/)
- [GSAP Documentation](https://greensock.com/docs/)
