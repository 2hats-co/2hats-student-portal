import React, { useContext } from 'react';

import { makeStyles, createStyles, Grid, Typography } from '@material-ui/core';

import Graphic from 'assets/images/graphics/Rocket.svg';

import PrioritisedIndustries from '../Profile/PrioritisedIndustries';
import OnboardingCta from './OnboardingCta';

import UserContext from 'contexts/UserContext';
import { saveDeprioritisedIndustries } from 'utilities/profile';

const useStyles = makeStyles(theme =>
  createStyles({
    center: { textAlign: 'center' },
    img: { margin: theme.spacing(4, 0) },
  })
);

const OnboardingA1: React.FC = () => {
  const classes = useStyles();
  const { user } = useContext(UserContext);

  const handleSavePrioritisedIndustries = (data: string[]) =>
    saveDeprioritisedIndustries(user.id, data)
      .then((data: any) =>
        console.log('Saved user deprioritised industries', data)
      )
      .catch((e: any) =>
        console.error('Failed to save user deprioritised industries' + e)
      );

  return (
    <>
      <Grid item className={classes.center}>
        <Typography variant="h6" component="h1" color="primary">
          Let’s get started{user.firstName && ', '}
          {user.firstName}!
        </Typography>
      </Grid>

      <Grid item className={classes.center}>
        <img
          src={Graphic}
          alt="Rocket"
          width={120}
          height={112}
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

        <PrioritisedIndustries handleSave={handleSavePrioritisedIndustries} />
      </Grid>

      <Grid item className={classes.center}>
        <OnboardingCta action="Bring it on" />
      </Grid>
    </>
  );
};

export default OnboardingA1;
