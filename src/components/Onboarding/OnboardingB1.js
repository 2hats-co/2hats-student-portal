import React from 'react';
import Lottie from 'react-lottie';

import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';

import OnboardingCta from './OnboardingCta';
import animationB1 from 'assets/animations/onboardingB1.json';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
    overflow: 'hidden',
  },
}));

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationB1,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid meet',
  },
};

const OnboardingB1 = props => {
  const classes = useStyles();

  return (
    <main className={classes.root}>
      <Typography variant="h6" component="h1" color="primary">
        Sharpen and display your skills to employers!
      </Typography>

      <Lottie
        options={defaultOptions}
        // Need a larger width to make up for padding around animation
        width="150%"
        style={{ position: 'relative', left: '-25%', marginTop: -16 }}
      />

      <Typography variant="h6" component="p" color="textSecondary" gutterBottom>
        Show off your super-skills by completing assessments and shine like an
        enabled Apply button.
      </Typography>
      <Typography variant="h6" component="p" color="textSecondary" gutterBottom>
        That’s why it actually works on 2hats.
      </Typography>

      <OnboardingCta action="Piece of cake" />
    </main>
  );
};

export default OnboardingB1;
