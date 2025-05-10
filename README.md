# Case-Studies-Automata: Astro + React + Tailwind CSS Project

This project is built with [Astro](https://astro.build/), [React](https://reactjs.org/), and [Tailwind CSS](https://tailwindcss.com/). It provides a modern, performant foundation for building websites and web applications.

## 🚀 Tech Stack

- **[Astro](https://astro.build/)** - The web framework for content-driven websites
- **[React](https://reactjs.org/)** - A JavaScript library for building user interfaces
- **[Tailwind CSS](https://tailwindcss.com/)** - A utility-first CSS framework

## 📂 Project Structure

```text
/
├── public/               # Static assets
│   └── favicon.svg       # Site favicon
├── src/
│   ├── components/       # Reusable components
│   │   └── React.jsx     # Example React component
│   ├── pages/            # Page routes
│   │   └── index.astro   # Homepage
│   └── styles/           # Global styles
│       └── global.css    # Tailwind CSS imports
├── astro.config.mjs      # Astro configuration
├── package.json          # Project dependencies
├── postcss.config.cjs    # PostCSS configuration
├── tailwind.config.mjs   # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Acads-Case-Studies-Automata
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:4321`

## 🧞 Available Commands

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 🧩 Adding Components

### React Components

1. Create a new `.jsx` or `.tsx` file in the `src/components/` directory
2. Import and use the component in your Astro pages:

```astro
---
import MyComponent from '../components/MyComponent.jsx';
---

<MyComponent client:load />
```

The `client:load` directive tells Astro to hydrate the component on page load. Other directives include:
- `client:idle` - Hydrate once the main thread is idle
- `client:visible` - Hydrate once the component is visible in the viewport
- `client:media` - Hydrate based on a media query
- `client:only` - Do not server-render the component at all

## 🎨 Styling with Tailwind CSS

This project uses Tailwind CSS for styling. You can use Tailwind's utility classes directly in your HTML or component JSX:

```jsx
<div className="flex items-center p-4 bg-blue-500 text-white rounded-lg shadow-md">
  <h1 className="text-2xl font-bold">Hello, world!</h1>
</div>
```

Tailwind is configured to scan all `.astro`, `.html`, `.js`, `.jsx`, `.md`, `.mdx`, `.svelte`, `.ts`, `.tsx`, and `.vue` files.

## 🚀 Deployment

When you're ready to deploy your site, run:

```bash
npm run build
```

This will generate a production-ready build in the `dist/` directory. You can then deploy this directory to any static hosting service like Netlify, Vercel, GitHub Pages, etc.

## 📚 Additional Resources

- [Astro Documentation](https://docs.astro.build)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Astro React Integration](https://docs.astro.build/en/guides/integrations-guide/react/)
- [Astro Tailwind Integration](https://docs.astro.build/en/guides/integrations-guide/tailwind/)
