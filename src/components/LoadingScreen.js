import React from 'react';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

function LoadingScreen(props) {
  return (
    <Grid
      container
      alignItems="center"
      justify="center"
      style={{ height: '100%', position: 'absolute', top: 0, left: 0 }}
    >
      <CircularProgress color="primary" size={64} />
    </Grid>
  );
}

export default LoadingScreen;
