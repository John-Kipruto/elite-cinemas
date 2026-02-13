import { useState, useEffect } from 'react';
import type { Movie } from '../types/movie';
import { getPopularMovies } from '../services/omdbApi';

const Hero = () => {
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchFeaturedMovie = async () => {
      try {
        const movies = await getPopularMovies();
        if (movies && movies.length > 0) {
          // Get a random movie from popular movies
          const randomMovie = movies[Math.floor(Math.random() * movies.length)];
          setFeaturedMovie(randomMovie);
        }
      } catch (error) {
        console.error('Error fetching featured movie:', error);
      }
    };

    fetchFeaturedMovie();
  }, []);

  if (!featuredMovie) {
    return (
      <div className="relative h-[60vh] md:h-[80vh] bg-gradient-to-r from-netflix-black to-netflix-dark-gray flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">ELITE CINEMAS</h1>
          <p className="text-xl md:text-2xl text-gray-400">Loading amazing content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[60vh] md:h-[80vh] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-netflix-black via-netflix-black/50 to-transparent z-10" />
      <img
        src={
          featuredMovie.Poster !== 'N/A'
            ? featuredMovie.Poster
            : 'https://via.placeholder.com/1920x1080?text=Featured+Movie'
        }
        alt={featuredMovie.Title}
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 z-20 p-8 md:p-16">
        <h1 className="text-3xl md:text-6xl font-bold mb-4 drop-shadow-2xl">
          {featuredMovie.Title}
        </h1>
        <div className="flex items-center space-x-4 mb-6">
          <button className="bg-white text-netflix-black px-6 py-2 md:px-8 md:py-3 rounded-md font-semibold hover:bg-opacity-80 transition-all flex items-center space-x-2">
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
            <span>Play</span>
          </button>
          <button className="bg-netflix-dark-gray bg-opacity-70 text-white px-6 py-2 md:px-8 md:py-3 rounded-md font-semibold hover:bg-opacity-90 transition-all flex items-center space-x-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>More Info</span>
          </button>
        </div>
        <p className="text-sm md:text-lg text-gray-300 max-w-2xl drop-shadow-lg">
          Year: {featuredMovie.Year} | Type: {featuredMovie.Type}
        </p>
      </div>
    </div>
  );
};

export default Hero;
