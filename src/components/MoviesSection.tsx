import { useContext, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import MovieList from './MovieList';
import SearchError from './SearchError';
import { MoviesContext } from '../context/MoviesContext';
import { instanceOfMovieResponse } from '../helpers/type-guards';

function MoviesSection() {
	const { getSuggestedMovies, movies } = useContext(MoviesContext);

	const isFirstRender = movies.data
		? instanceOfMovieResponse(movies.data[0])
		: false;

	useEffect(() => {
		getSuggestedMovies();
	}, [getSuggestedMovies]);

	return (
		<main>
			<Container maxWidth="lg" className="container-center">
				{movies.loading ? (
					<Box
						height="100%"
						flexGrow={1}
						display="flex"
						alignItems="center"
						justifyContent="center"
					>
						<CircularProgress
							size={96}
							className="progress-color"
						/>
					</Box>
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
