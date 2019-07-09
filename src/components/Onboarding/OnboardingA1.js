import React, { useContext } from 'react';

import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';

import Graphic from 'assets/images/graphics/Rocket.svg';

import PrioritisedIndustries from './PrioritisedIndustries';
import OnboardingCta from './OnboardingCta';
import UserContext from 'contexts/UserContext';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
  },

  img: {
    margin: theme.spacing(6, 0),
  },
}));

const OnboardingA1 = props => {
  const classes = useStyles();
  const { user } = useContext(UserContext);

  return (
    <main className={classes.root}>
      <Typography variant="h6" component="h1" color="primary">
        Let’s get started{user.firstName && ', '}
        {user.firstName}!
      </Typography>

      <img src={Graphic} alt="Rocket" width="120" className={classes.img} />

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
        Get qualified for your ideal job by showing off your skills through real
        work simulations (assessments). Pick at least one of the fields below to
        start.
      </Typography>

      <PrioritisedIndustries handleSave={data => console.log(data)} />

      <OnboardingCta action="Bring it on" />
    </main>
  );
};

export default OnboardingA1;
