import { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import MovieRow from '../components/MovieRow';
import type { Movie } from '../types/movie';
import { getPopularMovies, getMoviesBySearch } from '../services/omdbApi';

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [actionMovies, setActionMovies] = useState<Movie[]>([]);
  const [comedyMovies, setComedyMovies] = useState<Movie[]>([]);
  const [dramaMovies, setDramaMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const [trending, action, comedy, drama] = await Promise.all([
          getPopularMovies(),
          getMoviesBySearch('action'),
          getMoviesBySearch('comedy'),
          getMoviesBySearch('drama'),
        ]);

        setTrendingMovies(trending);
        setActionMovies(action);
        setComedyMovies(comedy);
        setDramaMovies(drama);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-netflix-red mx-auto mb-4"></div>
          <p className="text-xl text-gray-400">Loading amazing content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-12">
      <Hero />
      <div className="mt-8 md:mt-12">
        {trendingMovies.length > 0 && (
          <MovieRow title="Trending Now" movies={trendingMovies} isLargeRow />
        )}
        {actionMovies.length > 0 && (
          <MovieRow title="Action Movies" movies={actionMovies} />
        )}
        {comedyMovies.length > 0 && (
          <MovieRow title="Comedy Movies" movies={comedyMovies} />
        )}
        {dramaMovies.length > 0 && (
          <MovieRow title="Drama Movies" movies={dramaMovies} />
        )}
      </div>
    </div>
  );
};

export default Home;
