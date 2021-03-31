import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { instanceOfMovieResponse } from '../helpers/type-guards';

interface CardProps {
	Poster: string;
	Title: string;
	Year: string;
}

function MovieCard(props: CardProps) {
	// TODO: Devolcer un card solo con la imagen si es la única prop enviada
	// Caso contrario devolver un card con una imagen (CardMedia) y el título de la movie y el año
	// Además si solo viene la imagen colocar en xs valor de 4

	// Si no tiene el año devuelve sola un card con la imagen

	const isSuggested = instanceOfMovieResponse(props);

	const { Poster, Title, Year } = props;

	if (isSuggested) {
		return (
			<Grid item xs={6} sm={4} lg={3} className="movie">
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
