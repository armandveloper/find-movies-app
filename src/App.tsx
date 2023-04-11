import Header from './components/Header';
import MoviesSection from './components/MoviesSection';
import Movie from './components/Movie';
import { MoviesProvider } from './context/MoviesContext';

function App() {
  return (
    <MoviesProvider>
      <div className="app">
        <Header />
        <MoviesSection />
        <Movie />
      </div>
    </MoviesProvider>
  );
}

export default App;
