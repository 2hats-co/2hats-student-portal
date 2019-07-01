import React, { Component } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import { Grid, Typography, Button } from '@material-ui/core';

import ReloadIcon from '@material-ui/icons/Refresh';

import graphic from 'assets/images/graphics/PersonBedsick.svg';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.default,

    width: '100%',
    height: '100%',
    minHeight: '100vh',

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
});

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    console.log(error, info);
  }

  render() {
    const { classes, children } = this.props;
    const { hasError } = this.state;

    if (hasError)
      return (
        <Grid
          container
          className={classes.root}
          justify="center"
          alignItems="center"
          direction="column"
          wrap="nowrap"
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
              Try reloading the page.
            </Typography>
            <Typography variant="body1" color="textSecondary">
              You may have an old version of this site.
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
          </Grid>
        </Grid>
      );

    return children;
  }
}

export default withStyles(styles)(ErrorBoundary);
