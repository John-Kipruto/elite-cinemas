import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieById } from '../services/omdbApi';
import type { MovieDetails as MovieDetailsType } from '../types/movie';

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchMovie = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getMovieById(id);
        if (data.Response === 'False') {
          setError('Movie not found');
          setMovie(null);
        } else {
          setMovie(data);
        }
      } catch (err) {
        setError('Failed to load movie details');
        setMovie(null);
      } finally {
        setLoading(false);
    }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-netflix-red mx-auto mb-4" />
          <p className="text-xl text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="pt-24 min-h-screen flex flex-col items-center justify-center px-4">
        <p className="text-xl text-gray-400 mb-6">{error ?? 'Movie not found'}</p>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-netflix-red hover:underline font-semibold"
        >
          Go back
        </button>
      </div>
    );
  }

  const defaultPoster = 'https://via.placeholder.com/300x450?text=No+Image';
  const posterUrl = movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : defaultPoster;

  return (
    <div className="min-h-screen bg-netflix-black">
      {/* Backdrop */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-netflix-black/20 via-netflix-black/70 to-netflix-black z-10" />
        <img
          src={posterUrl}
          alt=""
          className="w-full h-full object-cover object-top opacity-30"
        />
      </div>

      <div className="relative z-20 pt-24 pb-16 px-4 md:px-12">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-8 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <div className="flex flex-col md:flex-row gap-8 md:gap-12 max-w-6xl">
          {/* Poster */}
          <div className="flex-shrink-0 w-full max-w-[300px] mx-auto md:mx-0">
            <img
              src={posterUrl}
              alt={movie.Title}
              className="w-full rounded-lg shadow-2xl"
            />
          </div>

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-3xl md:text-5xl font-bold mb-2">{movie.Title}</h1>
            <div className="flex flex-wrap gap-3 text-gray-400 text-sm md:text-base mb-6">
              {movie.Year && <span>{movie.Year}</span>}
              {movie.Rated && movie.Rated !== 'N/A' && (
                <span className="border border-gray-500 px-2 py-0.5 rounded">{movie.Rated}</span>
              )}
              {movie.Runtime && movie.Runtime !== 'N/A' && <span>{movie.Runtime}</span>}
              {movie.Genre && movie.Genre !== 'N/A' && <span>{movie.Genre}</span>}
              {movie.Type && (
                <span className="capitalize text-netflix-red">{movie.Type}</span>
              )}
            </div>

            {movie.Plot && movie.Plot !== 'N/A' && (
              <p className="text-gray-300 text-base md:text-lg mb-6 max-w-2xl leading-relaxed">
                {movie.Plot}
              </p>
            )}

            {/* Ratings */}
            {movie.Ratings && movie.Ratings.length > 0 && (
              <div className="flex flex-wrap gap-4 mb-6">
                {movie.imdbRating && movie.imdbRating !== 'N/A' && (
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400 font-bold text-lg">IMDb</span>
                    <span className="text-white">{movie.imdbRating}/10</span>
                  </div>
                )}
                {movie.Ratings.map((r) => (
                  <div key={r.Source} className="flex items-center gap-2">
                    <span className="text-gray-400">{r.Source}</span>
                    <span className="text-white">{r.Value}</span>
                  </div>
                ))}
              </div>
            )}

            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {movie.Director && movie.Director !== 'N/A' && (
                <>
                  <dt className="text-gray-500">Director</dt>
                  <dd className="text-gray-300">{movie.Director}</dd>
                </>
              )}
              {movie.Writer && movie.Writer !== 'N/A' && (
                <>
                  <dt className="text-gray-500">Writer</dt>
                  <dd className="text-gray-300">{movie.Writer}</dd>
                </>
              )}
              {movie.Actors && movie.Actors !== 'N/A' && (
                <>
                  <dt className="text-gray-500">Cast</dt>
                  <dd className="text-gray-300">{movie.Actors}</dd>
                </>
              )}
              {movie.Language && movie.Language !== 'N/A' && (
                <>
                  <dt className="text-gray-500">Language</dt>
                  <dd className="text-gray-300">{movie.Language}</dd>
                </>
              )}
              {movie.Country && movie.Country !== 'N/A' && (
                <>
                  <dt className="text-gray-500">Country</dt>
                  <dd className="text-gray-300">{movie.Country}</dd>
                </>
              )}
              {movie.Released && movie.Released !== 'N/A' && (
                <>
                  <dt className="text-gray-500">Released</dt>
                  <dd className="text-gray-300">{movie.Released}</dd>
                </>
              )}
              {movie.Awards && movie.Awards !== 'N/A' && (
                <>
                  <dt className="text-gray-500">Awards</dt>
                  <dd className="text-gray-300">{movie.Awards}</dd>
                </>
              )}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
