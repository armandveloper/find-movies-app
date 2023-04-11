import { useContext, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import MovieList from './MovieList';
import Spinner from './Spinner';
import SearchError from './SearchError';
import { MoviesContext } from '../context/MoviesContext';
import { instanceOfMovieResponse } from '../helpers/type-guards';

function MoviesSection() {
	const { getFeaturedMovies, movies } = useContext(MoviesContext);

	const isFirstRender = movies.data
		? instanceOfMovieResponse(movies.data[0])
		: false;

	useEffect(() => {
		getFeaturedMovies();
	}, [getFeaturedMovies]);

	return (
		<main>
			<Container maxWidth="lg" className="container-center">
				{movies.loading ? (
					<Spinner />
				) : movies.error ? (
					<SearchError
						type={movies.error.type}
						description={movies.error.description}
					/>
				) : (
					<section>
						<h2>
							{isFirstRender
								? 'You might like'
								: 'Search results'}
						</h2>
						<MovieList movies={movies.data} />
					</section>
				)}
			</Container>
		</main>
	);
}

export default MoviesSection;
