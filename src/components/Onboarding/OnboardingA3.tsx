import React from 'react';

import {
  makeStyles,
  createStyles,
  Grid,
  Typography,
  TextField,
  MenuItem,
} from '@material-ui/core';

import Graphic from 'assets/images/graphics/OnboardingA3.svg';

import OnboardingCta from './OnboardingCta';

const useStyles = makeStyles(theme =>
  createStyles({
    center: { textAlign: 'center' },
    img: { margin: theme.spacing(3, 0) },
    resumeUploader: { marginTop: theme.spacing(3) },
  })
);

const CITIES = [
  { city: 'Sydney', country: 'AU' },
  { city: 'Melbourne', country: 'AU' },
];
const CITIES_OPTIONS = CITIES.map(item => ({
  value: [item.city, item.country],
  label: item.city,
}));

const OnboardingA3: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <Grid item className={classes.center}>
        <Typography variant="h6" component="h1" color="primary">
          You’re going places… aren’t you?
        </Typography>
      </Grid>

      <Grid item className={classes.center}>
        <img
          src={Graphic}
          alt="Skill light bulb octopus graphic"
          width={123}
          height={152}
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
          Tell us about the lucky city you want to work in. It helps us show you
          the most relevant positions for your future.
        </Typography>

        <TextField
          select
          label="I Want to Work In"
          // value={values.currency}
          // onChange={handleChange('currency')}
          variant="filled"
          fullWidth
        >
          {CITIES_OPTIONS.map(option => (
            <MenuItem key={JSON.stringify(option.value)} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      <Grid item className={classes.center}>
        <OnboardingCta action="I’ll Decide Later" secondary />
        <OnboardingCta action="Continue" />
      </Grid>
    </>
  );
};

export default OnboardingA3;
