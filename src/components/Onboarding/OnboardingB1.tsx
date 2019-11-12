import React from 'react';
import Lottie from 'react-lottie';

import { makeStyles, createStyles, Grid, Typography } from '@material-ui/core';

import OnboardingCta from './OnboardingCta';
import { getLottieOptions } from 'utilities/onboarding';
import animationB1 from 'assets/animations/onboardingB1.json';

const useStyles = makeStyles(() =>
  createStyles({
    center: { textAlign: 'center' },
    animationB1: {
      // position: 'relative',
      // left: '-25%',
      marginTop: -16,
    },
  })
);

/**
 * Explains assessments
 */
const OnboardingB1: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <Grid item className={classes.center}>
        <Typography variant="h6" component="h1" color="primary">
          Sharpen and display your skills to employers!
        </Typography>
      </Grid>

      <Grid item className={classes.center}>
        <Lottie
          options={getLottieOptions({
            animationData: animationB1,
            rendererSettings: { className: classes.animationB1 },
          })}
          // Need a larger width to make up for padding around animation
          // width="150%"
        />
      </Grid>

      <Grid item className={classes.center} xs>
        <Typography variant="h6" component="p" color="textSecondary" paragraph>
          Show off your super-skills by completing assessments and shine like an
          enabled Apply button.
        </Typography>
        <Typography
          variant="h6"
          component="p"
          color="textSecondary"
          gutterBottom
        >
          That’s why it actually works on 2hats.
        </Typography>
      </Grid>

      <Grid item className={classes.center}>
        <OnboardingCta action="Piece of cake" />
      </Grid>
    </>
  );
};

export default OnboardingB1;
