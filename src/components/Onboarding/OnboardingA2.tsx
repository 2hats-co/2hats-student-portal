import React, { useState } from 'react';

import { makeStyles, createStyles, Grid, Typography } from '@material-ui/core';

import Graphic from 'assets/images/graphics/OnboardingA2.svg';

import ResumeUploader from 'components/Profile/ResumeUploader';
import OnboardingCta from './OnboardingCta';

const useStyles = makeStyles(theme =>
  createStyles({
    center: { textAlign: 'center' },
    img: { margin: theme.spacing(3, 0) },
    resumeUploader: { marginTop: theme.spacing(3) },
  })
);

const OnboardingA2: React.FC = () => {
  const classes = useStyles();
  const [disableCta, setDisableCta] = useState(true);

  return (
    <>
      <Grid item className={classes.center}>
        <Typography variant="h6" component="h1" color="primary">
          It all starts with a… résumé!
        </Typography>
      </Grid>

      <Grid item className={classes.center}>
        <img
          src={Graphic}
          alt="Résumé graphic"
          width={140}
          height={140}
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
          We know… but this is just the tip of the iceberg. Your potential and
          abilities count at 2hats—not your background. Your résumé will only
          make it easy for us to see your interests and reach out.
        </Typography>

        <ResumeUploader
          className={classes.resumeUploader}
          onUpload={() => setDisableCta(false)}
        />
      </Grid>

      <Grid item className={classes.center}>
        <OnboardingCta action="I’ll Procrastinate" secondary />
        <OnboardingCta action="Continue" disabled={disableCta} />
      </Grid>
    </>
  );
};

export default OnboardingA2;
