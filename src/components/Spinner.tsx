import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

function Spinner() {
  return (
    <Box
      height="100%"
      flexGrow={1}
      display="flex"
      alignItems="center"
      justifyContent="center"
      style={{ gridColumn: '1 / -1' }}
    >
      <CircularProgress size={96} className="progress-color" />
    </Box>
  );
}

export default Spinner;
