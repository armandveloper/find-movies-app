import { MovieResponse } from '../interfaces/movie.interface';

// Ayuda a saber si se el objeto es producido en el primer render o como resultado de búsqueda

export function instanceOfMovieResponse(object: any): object is MovieResponse {
	return 'Plot' in object;
}
