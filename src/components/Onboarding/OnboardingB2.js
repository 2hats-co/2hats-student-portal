import React from 'react';
import Lottie from 'react-lottie';

import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';

import OnboardingCta from './OnboardingCta';
import animationB2 from 'assets/animations/onboardingB2.json';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
    overflow: 'hidden',
  },
}));

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationB2,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid meet',
  },
};

const OnboardingB2 = props => {
  const classes = useStyles();

  return (
    <main className={classes.root}>
      <Typography variant="h6" component="h1" color="primary">
        Let’s begin with an assessment!
      </Typography>

      <Lottie
        options={defaultOptions}
        // Need a larger width to make up for padding around animation
        width="125%"
        style={{ position: 'relative', left: '-12.5%', marginTop: -16 }}
      />

      <Typography variant="h6" component="p" color="textSecondary" gutterBottom>
        Completed assessments make your skills counted, so we know you’re going
        to rock at your new workplace.
      </Typography>
      <Typography variant="h6" component="p" color="textSecondary" gutterBottom>
        Start with one and get to your first job interview sooner than you
        think.
      </Typography>

      <OnboardingCta action="Here we go!" />
    </main>
  );
};

export default OnboardingB2;
