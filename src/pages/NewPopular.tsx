import { useState, useEffect } from 'react';
import MovieRow from '../components/MovieRow';
import SearchBar from '../components/SearchBar';
import type { Movie } from '../types/movie';
import { getMoviesBySearch, searchMovies } from '../services/omdbApi';

const NewPopular = () => {
  const [newMovies, setNewMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        // Get recent year movies (2023, 2024)
        const currentYear = new Date().getFullYear();
        const lastYear = currentYear - 1;
        
        const [new2024, new2023, popular, topRated] = await Promise.all([
          searchMovies(String(currentYear), 1).then(res => res.Search || []),
          searchMovies(String(lastYear), 1).then(res => res.Search || []),
          searchMovies('popular', 1).then(res => res.Search || []),
          searchMovies('top', 1).then(res => res.Search || []),
        ]);

        // Combine new movies from recent years
        const combinedNew = [...new2024, ...new2023].slice(0, 10);
        setNewMovies(combinedNew);
        setPopularMovies(popular.slice(0, 10));
        setTopRatedMovies(topRated.slice(0, 10));
      } catch (error) {
        console.error('Error fetching movies:', error);
        // Fallback to generic searches
        try {
          const [action, thriller, sciFi] = await Promise.all([
            getMoviesBySearch('action'),
            getMoviesBySearch('thriller'),
            getMoviesBySearch('sci-fi'),
          ]);
          setNewMovies(action.slice(0, 10));
          setPopularMovies(thriller.slice(0, 10));
          setTopRatedMovies(sciFi.slice(0, 10));
        } catch (fallbackError) {
          console.error('Fallback error:', fallbackError);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    setHasSearched(true);
    try {
      const results = await getMoviesBySearch(query);
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching movies:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  if (isLoading) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-netflix-red mx-auto mb-4"></div>
          <p className="text-xl text-gray-400">Loading new & popular content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-12 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-center">
          New & Popular
        </h1>
        <p className="text-center text-gray-400 mb-8 text-lg">
          Discover the latest releases and trending content
        </p>
        <SearchBar onSearch={handleSearch} isLoading={isSearching} />

        {isSearching && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-netflix-red mx-auto mb-4"></div>
            <p className="text-xl text-gray-400">Searching...</p>
          </div>
        )}

        {!isSearching && hasSearched && searchResults.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400">No content found. Try a different search term.</p>
          </div>
        )}

        {!isSearching && searchResults.length > 0 && (
          <MovieRow title="Search Results" movies={searchResults} />
        )}

        {!hasSearched && (
          <>
            {newMovies.length > 0 && (
              <MovieRow title="New Releases" movies={newMovies} isLargeRow />
            )}
            {popularMovies.length > 0 && (
              <MovieRow title="Popular Now" movies={popularMovies} />
            )}
            {topRatedMovies.length > 0 && (
              <MovieRow title="Top Rated" movies={topRatedMovies} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NewPopular;
