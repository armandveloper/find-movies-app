import { MovieResponse } from "../interfaces/movie.interface";
import { MoviesResponse } from "../interfaces/movies.interface";

const baseUrl = 'https://www.omdbapi.com/?apikey=99c57d3';

export async function searchMovie(query: string): Promise<MoviesResponse> {
  const response = await fetch(`${baseUrl}&s=${query}`);
  return response.json();
}

export async function getMovieById(id: string): Promise<MovieResponse> {
  const response = await fetch(`${baseUrl}&i=${id}&plot=full`);
  return response.json();
}
