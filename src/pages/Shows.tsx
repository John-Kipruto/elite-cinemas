import { useState, useEffect } from "react";
import MovieRow from "../components/MovieRow";
import SearchBar from "../components/SearchBar";
import type { Movie } from "../types/movie";
import { getMoviesBySearch, searchMovies } from "../services/omdbApi";

const Shows = () => {
  const [trendingShows, setTrendingShows] = useState<Movie[]>([]);
  const [dramaShows, setDramaShows] = useState<Movie[]>([]);
  const [comedyShows, setComedyShows] = useState<Movie[]>([]);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const fetchShows = async () => {
      setIsLoading(true);
      try {
        // Search for TV series
        const [trending, drama, comedy] = await Promise.all([
          searchMovies("series", 1, "series").then((res) => res.Search || []),
          searchMovies("drama", 1, "series").then((res) => res.Search || []),
          searchMovies("comedy", 1, "series").then((res) => res.Search || []),
        ]);

        setTrendingShows(trending.slice(0, 10));
        setDramaShows(drama.slice(0, 10));
        setComedyShows(comedy.slice(0, 10));
      } catch (error) {
        console.error("Error fetching shows:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchShows();
  }, []);

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    setHasSearched(true);
    try {
      const results = await getMoviesBySearch(query);
      // Filter for series type
      const seriesResults = results.filter(
        (movie) => movie.Type.toLowerCase() === "series",
      );
      setSearchResults(seriesResults);
    } catch (error) {
      console.error("Error searching shows:", error);
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
          <p className="text-xl text-gray-400">Loading amazing shows...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-12 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-5xl font-bold mb-8 text-center">
          TV Shows
        </h1>
        <SearchBar onSearch={handleSearch} isLoading={isSearching} />

        {isSearching && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-netflix-red mx-auto mb-4"></div>
            <p className="text-xl text-gray-400">Searching...</p>
          </div>
        )}

        {!isSearching && hasSearched && searchResults.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400">
              No shows found. Try a different search term.
            </p>
          </div>
        )}

        {!isSearching && searchResults.length > 0 && (
          <MovieRow title="Search Results" movies={searchResults} />
        )}

        {!hasSearched && (
          <>
            {trendingShows.length > 0 && (
              <MovieRow
                title="Trending Shows"
                movies={trendingShows}
                isLargeRow
              />
            )}
            {dramaShows.length > 0 && (
              <MovieRow title="Drama Series" movies={dramaShows} />
            )}
            {comedyShows.length > 0 && (
              <MovieRow title="Comedy Series" movies={comedyShows} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Shows;
