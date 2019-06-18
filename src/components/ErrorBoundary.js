import React, { Component } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import ReloadIcon from '@material-ui/icons/Refresh';

import Logo from '../assets/images/Logo/Black.svg';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,

    width: '100%',
    height: '100%',
    minHeight: '100vh',

    userSelect: 'none',
  },

  content: {
    padding: theme.spacing(2),
    maxWidth: 480,
  },

  title: {
    marginBottom: theme.spacing(1.5),
    fontWeight: 500,
  },
  subtitle: { fontWeight: 400 },
  bodyText: { marginBottom: theme.spacing(2) },

  divider: { margin: `${theme.spacing(4)}px 0` },

  logo: {
    marginTop: theme.spacing(2),
    opacity: 0.33,
    width: 100,
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
            <Typography variant="h4" className={classes.title}>
              Something went wrong.
            </Typography>
            <Typography variant="h6" className={classes.subtitle}>
              We’ve been notified of the error.
            </Typography>

            <Divider className={classes.divider} />

            <Typography variant="h5" className={classes.title}>
              You may have an old version of this site.
            </Typography>

            <Typography variant="body1" className={classes.bodyText}>
              Please <b>reload this page</b>.
            </Typography>

            <div className={classes.bodyText}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => {
                  window.location.reload();
                }}
              >
                Reload
                <ReloadIcon />
              </Button>
            </div>

            <Typography variant="body1" className={classes.bodyText}>
              We’re constantly updating and improving this site to prevent
              errors like this. You may have an old version that does not fix
              this error.
            </Typography>
            <Typography variant="body1" className={classes.bodyText}>
              Thank you for your patience.
            </Typography>

            <img src={Logo} alt="2hats" className={classes.logo} />
          </Grid>
        </Grid>
      );

    return children;
  }
}

export default withStyles(styles)(ErrorBoundary);
