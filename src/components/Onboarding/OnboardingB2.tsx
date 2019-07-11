import React from 'react';
import Lottie from 'react-lottie';

import { makeStyles, createStyles, Grid, Typography } from '@material-ui/core';

import OnboardingCta from './OnboardingCta';
import { getLottieOptions } from 'utilities/onboarding';
import animationB2 from 'assets/animations/onboardingB2.json';

const useStyles = makeStyles(() =>
  createStyles({
    center: { textAlign: 'center' },
    animationB2: {
      // position: 'relative',
      // left: '-12.5%',
      marginTop: -16,
    },
  })
);

const OnboardingB2: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <Grid item className={classes.center}>
        <Typography variant="h6" component="h1" color="primary">
          Let’s begin with an assessment!
        </Typography>
      </Grid>

      <Grid item className={classes.center}>
        <Lottie
          options={getLottieOptions({
            animationData: animationB2,
            rendererSettings: { className: classes.animationB2 },
          })}
          // Need a larger width to make up for padding around animation
          // width="125%"
        />
      </Grid>

      <Grid item className={classes.center} xs>
        <Typography
          variant="h6"
          component="p"
          color="textSecondary"
          gutterBottom
        >
          Completed assessments make your skills counted, so we know you’re
          going to rock at your new workplace.
        </Typography>
        <Typography
          variant="h6"
          component="p"
          color="textSecondary"
          gutterBottom
        >
          Start with one and get to your first job interview sooner than you
          think.
        </Typography>
      </Grid>

      <Grid item className={classes.center}>
        <OnboardingCta action="Here we go!" />
      </Grid>
    </>
  );
};

export default OnboardingB2;
