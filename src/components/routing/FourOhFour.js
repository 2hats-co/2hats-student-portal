import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import GoIcon from '@bit/twohats.common.icons.go';

import { DASHBOARD } from 'constants/routes';
import graphic from 'assets/images/graphics/PersonArmsOnHips.svg';

const styles = theme => ({
  root: {
    minHeight: '100vh',
    minWidth: '100vw',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    textAlign: 'center',
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
    userSelect: 'none',
  },

  message: {
    maxWidth: 280,
  },

  graphic: {
    userSelect: 'none',
    userDrag: 'none',
    width: 60,
    marginBottom: theme.spacing(1),
  },

  button: { margin: theme.spacing(4) },
});

/**
 * Renders a 404 page.
 */
const FourOhFour = ({ classes, history }) => (
  <Grid container className={classes.root} justify="center" alignItems="center">
    <Grid item>
      <img src={graphic} alt="2hats" className={classes.graphic} />
      <Typography variant="h6" className={classes.message}>
        Hmm… we can’t seem to find this page
      </Typography>
      <Button
        color="primary"
        className={classes.button}
        onClick={() => {
          history.push(DASHBOARD);
        }}
      >
        Go to Dashboard
        <GoIcon />
      </Button>
    </Grid>
  </Grid>
);

FourOhFour.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(FourOhFour));
