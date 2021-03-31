import { SyntheticEvent, useContext, useState } from 'react';
import { MoviesContext } from '../context/MoviesContext';

function Searchbox() {
	const [term, setTerm] = useState('');
	const [prevTerm, setPrevTerm] = useState(term);

	const { searchMovies } = useContext(MoviesContext);

	const handleSearch = (e: SyntheticEvent) => {
		e.preventDefault();
		if (!term || prevTerm === term) return;
		// Buscar
		searchMovies(term);
		setPrevTerm(term);
		setTerm('');
	};

	return (
		<form onSubmit={handleSearch}>
			<input
				value={term}
				onChange={({ target }) => setTerm(target.value)}
				type="text"
				className="searchbox__input"
				placeholder="E.g. Harry Potter"
			/>
		</form>
	);
}

export default Searchbox;
