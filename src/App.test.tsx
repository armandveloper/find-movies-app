import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import App from './App';


/**
 * TODO
 * Mock the getMovieByTitleService
 * Test the user can search movies
 * Test a movie details should be display on clicked in a card
 */

describe('<App />', () => {
  afterEach(() => cleanup());
  it('display a title with the app name', () => {
    const { getByText } = render(<App />);
    const title = getByText(/Find movies/i);
    expect(title).toBeDefined();
  });
  it('display an input to search movies', () => {
    const { getByRole } = render(<App />);
    const input = getByRole('textbox');
    expect(input).toBeDefined();
  });
  it('should display featured movies just after loaded', async () => {
    const { findByAltText } = render(<App />);
    const movieCard = await findByAltText('Luca', undefined, { timeout: 2000 });
    expect(movieCard).toBeDefined();
  });
});
