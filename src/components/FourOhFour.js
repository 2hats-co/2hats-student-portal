import React from 'react';
import { withRouter } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import DashboardIcon from '@material-ui/icons/DashboardOutlined';

import { DASHBOARD } from '../constants/routes';
import Logo from '../assets/images/Logo/Black.svg';

const styles = theme => ({
  root: {
    minHeight: '100vh',
    minWidth: '100vw',
    textAlign: 'center',
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
  },

  button: { margin: theme.spacing(4) },

  logo: {
    userSelect: 'none',
    userDrag: 'none',
    width: 80,
    opacity: 0.5,

    marginBottom: theme.spacing(1),
  },
});

const FourOhFour = ({ classes, history }) => (
  <Grid container className={classes.root} justify="center" alignItems="center">
    <Grid item>
      <img src={Logo} alt="2hats" className={classes.logo} />
      <Typography variant="h5">This page was not found</Typography>
      <Button
        color="primary"
        className={classes.button}
        onClick={() => {
          history.push(DASHBOARD);
        }}
      >
        Go to Dashboard
        <DashboardIcon />
      </Button>
    </Grid>
  </Grid>
);

export default withRouter(withStyles(styles)(FourOhFour));
