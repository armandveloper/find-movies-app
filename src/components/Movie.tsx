import { forwardRef, Ref } from 'react';
import { useContext } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import CloseIcon from '@material-ui/icons/Close';
import StarIcon from '@material-ui/icons/Star';

import { MoviesContext } from '../context/MoviesContext';
import Spinner from './Spinner';
import SearchError from './SearchError';

const Transition = forwardRef(function Transition(
  props: TransitionProps,
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Movie() {
  const { activeMovie, unsetActiveMovie } = useContext(MoviesContext);

  if (!activeMovie) return <></>;

  const handleClose = () => unsetActiveMovie();

  if (activeMovie.loading) {
    return (
      <Dialog
        fullWidth={true}
        maxWidth="lg"
        TransitionComponent={Transition}
        onClose={handleClose}
        open={activeMovie !== null}
        aria-labelledby="Movie dialog"
      >
        <IconButton
          aria-label="Close Dialog"
          className="movie-dialog__close"
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
        <div className="movie-dialog__grid movie-dialog__grid--center">
          <Spinner />
        </div>
      </Dialog>
    );
  }

  if (activeMovie.error) {
    return (
      <Dialog
        fullWidth={true}
        maxWidth="lg"
        TransitionComponent={Transition}
        onClose={handleClose}
        open={activeMovie !== null}
        aria-labelledby="Movie dialog"
      >
        <IconButton
          aria-label="Close Dialog"
          className="movie-dialog__close"
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
        <div className="movie-dialog__grid movie-dialog__grid--center">
          <SearchError
            type={activeMovie.error.type}
            description={activeMovie.error.description}
          />
        </div>
      </Dialog>
    );
  }

  if (!activeMovie?.data) return <></>;

  const { Title, Plot, Released, Poster, Genre, Ratings } = activeMovie.data;

  return (
    <Dialog
      fullWidth={true}
      maxWidth="lg"
      TransitionComponent={Transition}
      onClose={handleClose}
      open={activeMovie !== null}
      aria-labelledby="Movie dialog"
    >
      <IconButton
        aria-label="Close Dialog"
        className="movie-dialog__close"
        onClick={handleClose}
      >
        <CloseIcon />
      </IconButton>
      <div className="movie-dialog__grid">
        <img
          src={
            Poster === 'N/A'
              ? '/find-movies-app/img/not-available.jpg'
              : Poster
          }
          alt={Title}
          className="movie-dialog__media"
        />
        <div className="movie-dialog__top">
          <h1>{Title}</h1>
          <div className="movie-dialog__meta">
            <span>{Released}</span>
            {Ratings.length > 0 && (
              <span>
                <StarIcon
                  style={{
                    color: '#FFD560',
                    marginRight: '0.4rem',
                  }}
                />
                {Ratings[0]?.Value}
              </span>
            )}
          </div>
        </div>
        <div className="movie-dialog__main">
          <div className="movie-dialog__genres">
            {Genre.split(', ').map((genre: string) => (
              <Chip
                key={genre}
                variant="outlined"
                label={genre}
                className="chip--genre"
              />
            ))}
          </div>
          <div className="movie__overview">
            <p>{Plot}</p>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default Movie;
