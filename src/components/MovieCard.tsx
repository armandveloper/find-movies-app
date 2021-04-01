import { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { MoviesContext } from '../context/MoviesContext';
import { instanceOfMovieResponse } from '../helpers/type-guards';

interface CardProps {
	imdbID: string;
	Poster: string;
	Title: string;
	Year: string;
}

function MovieCard(props: CardProps) {
	const { searchMovie, setMovieLoading } = useContext(MoviesContext);

	const isSuggested = instanceOfMovieResponse(props);

	const { imdbID, Poster, Title, Year } = props;

	const handleMovieSearch = () => {
		setMovieLoading();
		searchMovie(imdbID);
	};

	if (isSuggested) {
		return (
			<Grid
				item
				xs={6}
				sm={4}
				lg={3}
				className="movie"
				onClick={handleMovieSearch}
			>
				<Card>
					<div className="movie__img">
						<CardMedia
							component="img"
							alt={Title}
							image={
								Poster === 'N/A'
									? '/img/not-available.jpg'
									: Poster
							}
							title={Title}
						/>
					</div>
				</Card>
			</Grid>
		);
	}

	return (
		<Grid
			item
			xs={12}
			sm={6}
			md={4}
			lg={3}
			className="movie movie--with-content"
			onClick={handleMovieSearch}
		>
			<Card>
				<div className="movie__img">
					<CardMedia
						component="img"
						alt={Title}
						image={
							Poster === 'N/A' ? '/img/not-available.jpg' : Poster
						}
						title={Title}
					/>
				</div>
				<CardContent>
					<h3 className="movie__title">{Title}</h3>
					<p className="movie__year">({Year})</p>
				</CardContent>
			</Card>
		</Grid>
	);
}

export default MovieCard;
