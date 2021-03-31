import { createContext, PropsWithChildren, useCallback, useState } from 'react';
import { MoviesResponse, Search } from '../interfaces/movies.interface';
import { MovieResponse } from '../interfaces/movie.interface';
import { suggestedMovies } from '../data/suggest-movies';

interface MovieError {
	type: string;
	description: string;
}

interface MoviesState {
	loading: boolean;
	error: MovieError | null;
	data: Search[] | MovieResponse[] | null;
}

interface MoviesContextInterface {
	movies: MoviesState;
	searchMovies(term: string): void;
	getSuggestedMovies(): void;
}

const initState = {
	loading: true,
	error: null,
	data: null,
};

export const MoviesContext = createContext({} as MoviesContextInterface);

export const MoviesProvider = ({ children }: PropsWithChildren<{}>) => {
	const [movies, setMovies] = useState<MoviesState>(initState);

	const reset = () => setMovies(initState);

	const searchMovies = async (term: string) => {
		reset();
		try {
			const resp = await fetch(
				`http://www.omdbapi.com/?apikey=99c57d3&s=${term}`
			);
			const data: MoviesResponse = await resp.json();
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
	};

	const getSuggestedMovies = useCallback(async () => {
		try {
			const data: MovieResponse[] = [];
			for (const movie of suggestedMovies) {
				const resp = await fetch(
					`http://www.omdbapi.com/?apikey=99c57d3&t=${movie}`
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

	return (
		<MoviesContext.Provider
			value={{
				movies,
				searchMovies,
				getSuggestedMovies,
			}}
		>
			{children}
		</MoviesContext.Provider>
	);
};
