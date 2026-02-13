import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import MovieRow from '../components/MovieRow';
import type { Movie } from '../types/movie';
import { getMoviesBySearch } from '../services/omdbApi';

const Movies = () => {
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setHasSearched(true);
    try {
      const results = await getMoviesBySearch(query);
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching movies:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-12 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-5xl font-bold mb-8 text-center">
          Discover Movies
        </h1>
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />

        {isLoading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-netflix-red mx-auto mb-4"></div>
            <p className="text-xl text-gray-400">Searching...</p>
          </div>
        )}

        {!isLoading && hasSearched && searchResults.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400">No movies found. Try a different search term.</p>
          </div>
        )}

        {!isLoading && searchResults.length > 0 && (
          <MovieRow title="Search Results" movies={searchResults} />
        )}

        {!hasSearched && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400">
              Search for your favorite movies using the search bar above.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Movies;
