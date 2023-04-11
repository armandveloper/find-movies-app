import { createContext, PropsWithChildren, useCallback, useState } from 'react';
import { MoviesResponse, Search } from '../interfaces/movies.interface';
import { MovieResponse } from '../interfaces/movie.interface';
import { suggestedMovies } from '../data/suggest-movies';
import * as moviesService from '../services/movies'

interface MovieError {
	type: string;
	description: string;
}

interface MoviesState {
	loading: boolean;
	error: MovieError | null;
	data: Search[] | MovieResponse[] | null;
}

interface MovieState {
	loading: boolean;
	error: MovieError | null;
	data: MovieResponse | null;
}

interface MoviesContextInterface {
	movies: MoviesState;
	activeMovie: MovieState | null;
	searchMovies(term: string): void;
	getSuggestedMovies(): void;
	searchMovie(id: string): void;
	unsetActiveMovie(): void;
	setMovieLoading(): void;
}

const initState = {
	loading: true,
	error: null,
	data: null,
};

export const MoviesContext = createContext({} as MoviesContextInterface);

export const MoviesProvider = ({ children }: PropsWithChildren<{}>) => {
	// Estado para las sugerencias al inicio y los resultados de búsqueda
	const [movies, setMovies] = useState<MoviesState>(initState);

	// Estado para la película visualizada en un modal
	const [activeMovie, setActiveMovie] = useState<MovieState | null>(null);

	const reset = () => setMovies(initState);

	const getSuggestedMovies = useCallback(async () => {
		try {
			const data: MovieResponse[] = [];
			for (const movie of suggestedMovies) {
				const resp = await fetch(
					`https://www.omdbapi.com/?apikey=99c57d3&t=${movie}`
				);
				const body: MovieResponse = await resp.json();
				data.push(body);
			}
			setMovies({ loading: false, error: null, data });
		} catch (err) {
			console.log(err);
			setMovies({
				loading: false,
				error: {
					type: 'BackendError',
					description:
						'Something went wrong on our end. Try to refresh the page',
				},
				data: null,
			});
		}
	}, []);

	const searchMovies = useCallback(async (query: string) => {
		reset();
		try {
			const data = await moviesService.searchMovie(query);
			if (data.Response === 'True') {
				return setMovies({
					loading: false,
					error: null,
					data: data.Search,
				});
			}
			setMovies({
				loading: false,
				error: {
					type: 'SearchError',
					description:
						"We couldn't find that movie. Rephrase the search term and try again",
				},
				data: null,
			});
		} catch (err) {
			console.log(err);
			setMovies({
				loading: false,
				error: {
					type: 'BackendError',
					description:
						'Something went wrong on our end. Try to refresh the page',
				},
				data: null,
			});
		}
	}, []);

	const searchMovie = async (id: string) => {
		try {
			const data = await moviesService.getMovieById(id);
			if (data.Response === 'True') {
				return setActiveMovie({ loading: false, error: null, data });
			}
			setActiveMovie({
				loading: false,
				error: {
					type: 'SearchError',
					description:
						"We couldn't find that movie. Rephrase the search term and try again",
				},
				data: null,
			});
		} catch (err) {
			console.log(err);
			setActiveMovie({
				loading: false,
				error: {
					type: 'BackendError',
					description:
						'Something went wrong on our end. Try to refresh the page',
				},
				data: null,
			});
		}
	};

	const unsetActiveMovie = () => setActiveMovie(null);

	const setMovieLoading = () =>
		setActiveMovie({ loading: true, error: null, data: null });

	return (
		<MoviesContext.Provider
			value={{
				movies,
				activeMovie,
				searchMovies,
				getSuggestedMovies,
				searchMovie,
				unsetActiveMovie,
				setMovieLoading,
			}}
		>
			{children}
		</MoviesContext.Provider>
	);
};
