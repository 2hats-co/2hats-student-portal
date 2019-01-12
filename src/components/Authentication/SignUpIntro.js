import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import womanGraphic from '../../assets/images/graphics/SignUpWoman.svg';
import Tick from '../../assets/images/graphics/Tick.svg';

const styles = theme => ({
  copy: {
    maxWidth: 400,
    marginRight: 60,
    '& *': {
      color: '#fff',
      textAlign: 'left',
    },
  },
  subtitle: {
    marginTop: 10,
    lineHeight: 1.3,
    fontWeight: 400,
  },
  womanGraphic: {
    width: 148,
    height: 148,
    marginRight: 20,
    marginLeft: -8,
  },
  tickGrid: {
    height: 148,
    '& > *': { width: '100%' },
  },
  tick: {
    height: 32,
    verticalAlign: 'bottom',
    marginRight: 5,
  },
  tickText: {
    display: 'inline',
    fontWeight: 400,
  },
});

function SignUpIntro(props) {
  const { classes } = props;

  return (
    <Grid item className={classes.copy}>
      <Typography variant="h4">
        We bridge the gap between startups and students
      </Typography>
      <Typography className={classes.subtitle} variant="h6">
        The simplest way to get access to meaningful work experience
      </Typography>

      <Grid container style={{ marginTop: 40 }}>
        <Grid item>
          <img
            src={womanGraphic}
            className={classes.womanGraphic}
            alt="2hats"
          />
        </Grid>
        <Grid item xs>
          <Grid container justify="space-between" className={classes.tickGrid}>
            <Grid item>
              <img src={Tick} className={classes.tick} alt="Tick" />
              <Typography className={classes.tickText} variant="h6">
                One-time signup
              </Typography>
            </Grid>
            <Grid item>
              <img src={Tick} className={classes.tick} alt="Tick" />
              <Typography className={classes.tickText} variant="h6">
                Resume review
              </Typography>
            </Grid>
            <Grid item>
              <img src={Tick} className={classes.tick} alt="Tick" />
              <Typography className={classes.tickText} variant="h6">
                Career guidance
              </Typography>
            </Grid>
            <Grid item>
              <img src={Tick} className={classes.tick} alt="Tick" />
              <Typography className={classes.tickText} variant="h6">
                Free for Uni students
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(SignUpIntro);
