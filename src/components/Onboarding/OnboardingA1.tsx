import React from 'react';

import { makeStyles, createStyles, Grid, Typography } from '@material-ui/core';

import Graphic from 'assets/images/graphics/OnboardingA1.svg';

import PrioritisedIndustries from '../Profile/PrioritisedIndustries';
import OnboardingCta from './OnboardingCta';

import { useUser } from 'contexts/UserContext';

const useStyles = makeStyles(theme =>
  createStyles({
    center: { textAlign: 'center' },
    img: { margin: theme.spacing(4, 0) },
  })
);

const OnboardingA1: React.FC = () => {
  const classes = useStyles();
  const { user } = useUser();

  return (
    <>
      <Grid item className={classes.center}>
        <Typography variant="h6" component="h1" color="primary">
          Let’s get started{user!.firstName && ', '}
          {user!.firstName}!
        </Typography>
      </Grid>

      <Grid item className={classes.center}>
        <img
          src={Graphic}
          alt="Skill plant graphic"
          width={78}
          height={144}
          className={classes.img}
        />
      </Grid>

      <Grid item xs>
        <Typography
          variant="subtitle1"
          component="p"
          color="textSecondary"
          align="left"
          gutterBottom
        >
          Drumroll… Which of these sound like your future workplace?
        </Typography>
        <Typography
          variant="subtitle1"
          component="p"
          color="textSecondary"
          align="left"
          gutterBottom
        >
          Get qualified for your ideal job by showing off your skills through
          real work simulations (assessments). Pick at least one of the fields
          below to start.
        </Typography>

        <PrioritisedIndustries centred />
      </Grid>

      <Grid item className={classes.center}>
        <OnboardingCta action="Bring it on" />
      </Grid>
    </>
  );
};

export default OnboardingA1;
