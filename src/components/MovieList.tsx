import Grid from '@material-ui/core/Grid';
import MovieCard from './MovieCard';
import { Search } from '../interfaces/movies.interface';
import { MovieResponse } from '../interfaces/movie.interface';

interface MovieListProps {
	movies: Search[] | MovieResponse[] | null;
}

function MovieList({ movies }: MovieListProps) {
	return (
		<Grid container spacing={3}>
			{movies?.map((movie: Search | MovieResponse) => (
				<MovieCard key={movie.imdbID} {...movie} />
			))}
		</Grid>
	);
}

export default MovieList;
