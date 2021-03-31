import Header from './components/Header';
import MoviesSection from './components/MoviesSection';
import { MoviesProvider } from './context/MoviesContext';

function App() {
	return (
		<MoviesProvider>
			<div className="app">
				<Header />
				<MoviesSection />
			</div>
		</MoviesProvider>
	);
}

export default App;
