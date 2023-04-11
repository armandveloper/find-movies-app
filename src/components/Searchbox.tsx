import { SyntheticEvent, useContext, useEffect, useRef, useState } from 'react';
import { MoviesContext } from '../context/MoviesContext';

function Searchbox() {
  const { searchMovies } = useContext(MoviesContext);

  const [term, setTerm] = useState('');
  const [prevTerm, setPrevTerm] = useState(term);

  const timeoutId = useRef<number | undefined>();

  const handleSearch = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!term || prevTerm === term) return;
    // Buscar
    searchMovies(term);
    setPrevTerm(term);
    setTerm('');
  };

  // Debouncer
  useEffect(() => {
    // Limpia el timeout anterior
    clearTimeout(timeoutId.current);
    if (!term.trim() || term.trim().length < 3) return;
    // Si hay un término de mínimo 3 caracteres hace la llamada al api
    timeoutId.current = window.setTimeout(() => {
      setPrevTerm(term);
      searchMovies(term);
    }, 500);
  }, [term, searchMovies]);

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
