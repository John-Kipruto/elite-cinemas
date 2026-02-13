import axios from 'axios';
import type { Movie, MovieDetails, SearchResponse } from '../types/movie';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY || 'demo';
const BASE_URL = 'https://www.omdbapi.com/';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    apikey: API_KEY,
  },
});

export const searchMovies = async (query: string, page: number = 1): Promise<SearchResponse> => {
  const response = await api.get<SearchResponse>('', {
    params: {
      s: query,
      page,
    },
  });
  return response.data;
};

export const getMovieById = async (imdbID: string): Promise<MovieDetails> => {
  const response = await api.get<MovieDetails>('', {
    params: {
      i: imdbID,
    },
  });
  return response.data;
};

export const getMoviesBySearch = async (query: string): Promise<Movie[]> => {
  const response = await searchMovies(query);
  return response.Search || [];
};

// Popular movie searches for homepage
export const getPopularMovies = async (): Promise<Movie[]> => {
  const popularQueries = ['action', 'comedy', 'drama', 'thriller', 'horror', 'sci-fi'];
  const randomQuery = popularQueries[Math.floor(Math.random() * popularQueries.length)];
  const response = await searchMovies(randomQuery);
  return response.Search || [];
};
