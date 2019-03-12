import React from 'react';
import { withRouter } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import DashboardIcon from '@material-ui/icons/DashboardOutlined';

import { DASHBOARD } from '../constants/routes';

const styles = theme => ({
  root: {
    height: '100vh',
    width: '100%',
    textAlign: 'center',
  },

  button: { margin: theme.spacing.unit },
});

const FourOhFour = ({ classes, history }) => (
  <Grid container className={classes.root} justify="center" alignItems="center">
    <Grid item>
      <Typography variant="h5">
        The page you were looking for was not found
      </Typography>
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
