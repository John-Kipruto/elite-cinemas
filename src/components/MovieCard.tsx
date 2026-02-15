import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
  isLarge?: boolean;
}

const MovieCard = ({ movie, isLarge = false }: MovieCardProps) => {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const defaultPoster = 'https://via.placeholder.com/300x450?text=No+Image';

  return (
    <Link
      to={`/movie/${movie.imdbID}`}
      className={`relative transition-all duration-300 cursor-pointer group block ${
        isLarge ? 'min-w-[200px] md:min-w-[300px]' : 'min-w-[150px] md:min-w-[200px]'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`relative overflow-hidden rounded-md transition-transform duration-300 ${
          isHovered ? 'scale-110 z-10 shadow-2xl' : 'scale-100'
        }`}
      >
        <img
          src={imageError ? defaultPoster : movie.Poster !== 'N/A' ? movie.Poster : defaultPoster}
          alt={movie.Title}
          className="w-full h-auto object-cover"
          onError={() => setImageError(true)}
        />
        {isHovered && (
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <h3 className="text-white font-semibold text-sm md:text-base mb-1 line-clamp-2">
                {movie.Title}
              </h3>
              <p className="text-gray-300 text-xs">{movie.Year}</p>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

export default MovieCard;
