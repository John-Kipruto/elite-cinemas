# Elite Cinemas - Netflix Clone

A modern movie discovery website built with React, TypeScript, Vite, and Tailwind CSS, featuring a Netflix-inspired UI.

## Features

- 🎬 Netflix-style UI with dark theme
- 🔍 Movie search functionality using OMDB API
- 📱 Responsive design for mobile and desktop
- 🎨 Beautiful hero section with featured movies
- 📺 Movie rows with horizontal scrolling
- ⚡ Fast and optimized with Vite

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Axios** - HTTP client
- **OMDB API** - Movie data

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up your OMDB API key:
   - Get a free API key from [OMDB API](http://www.omdbapi.com/apikey.aspx)
   - Create a `.env` file in the root directory:
   ```
   VITE_OMDB_API_KEY=your_api_key_here
   ```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── Header.tsx   # Navigation header
│   ├── Hero.tsx     # Hero section with featured movie
│   ├── MovieCard.tsx # Individual movie card
│   ├── MovieRow.tsx  # Horizontal scrolling movie row
│   └── SearchBar.tsx # Search input component
├── pages/           # Page components
│   ├── Home.tsx     # Homepage with movie rows
│   └── Movies.tsx   # Movies search page
├── services/        # API services
│   └── omdbApi.ts   # OMDB API integration
├── types/           # TypeScript type definitions
│   └── movie.ts     # Movie-related types
├── App.tsx          # Main app component
├── main.tsx         # Entry point
└── index.css        # Global styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Environment Variables

Create a `.env` file in the root directory:

```
VITE_OMDB_API_KEY=your_omdb_api_key
```

## License

MIT
