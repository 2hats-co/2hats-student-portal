import React, { Component } from 'react';
import Div100vh from 'react-div-100vh';

import withStyles from '@material-ui/core/styles/withStyles';
import { Grid, Typography, Button } from '@material-ui/core';

import ReloadIcon from '@material-ui/icons/Refresh';

import graphic from 'assets/images/graphics/PersonBedsick.svg';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.default,

    width: '100%',
    height: '100%',

    userSelect: 'none',
    textAlign: 'center',
  },

  content: {
    padding: theme.spacing(2),
    maxWidth: 480,
  },

  graphic: {
    width: 120,
    marginBottom: theme.spacing(1),
    userDrag: 'none',
  },

  reloadButton: {
    margin: theme.spacing(4),
  },

  error: {
    userSelect: 'auto',
  },
});

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  componentDidCatch(error, info) {
    // Throw error to console so Smartlook can catch it
    console.error(error);
    this.setState({ hasError: true, errorMessage: error.message });
  }

  render() {
    const { classes, children } = this.props;
    const { hasError, errorMessage } = this.state;

    if (hasError)
      return (
        <Grid
          container
          className={classes.root}
          justify="center"
          alignItems="center"
          direction="column"
          wrap="nowrap"
          component={Div100vh}
          style={{ minHeight: '100rvh' }}
        >
          <Grid item className={classes.content}>
            <img
              src={graphic}
              alt="Bedsick person"
              className={classes.graphic}
            />

            <Typography variant="h6" className={classes.title} gutterBottom>
              Something went wrong
            </Typography>

            <Typography variant="body1" color="textSecondary">
              Please try reloading and re-opening this page
            </Typography>

            <Button
              color="primary"
              onClick={() => {
                window.location.reload();
              }}
              className={classes.reloadButton}
            >
              Reload
              <ReloadIcon />
            </Button>

            <Typography
              variant="body2"
              color="textSecondary"
              className={classes.error}
            >
              ERROR: {errorMessage}
            </Typography>
          </Grid>
        </Grid>
      );

    return children;
  }
}

export default withStyles(styles)(ErrorBoundary);
