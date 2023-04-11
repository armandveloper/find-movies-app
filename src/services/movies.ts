import { MoviesResponse } from "../interfaces/movies.interface";

const baseUrl = 'https://www.omdbapi.com/?apikey=99c57d3';

export async function searchMovie(query: string): Promise<MoviesResponse> {
  const response = await fetch(`${baseUrl}&s=${query}`);
  return response.json();
  }