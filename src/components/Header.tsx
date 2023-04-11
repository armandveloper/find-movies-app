import Container  from '@material-ui/core/Container';
import Searchbox from './Searchbox';

function Header() {
  return (
    <header className="header">
      <Container maxWidth="lg">
        <h1>Find movies</h1>
        <Searchbox />
      </Container>

    </header>
  );
}

export default Header;
