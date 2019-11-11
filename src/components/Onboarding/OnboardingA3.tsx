import React from 'react';
import { Formik, Field, Form } from 'formik';

import { makeStyles, createStyles, Grid, Typography } from '@material-ui/core';

import Graphic from 'assets/images/graphics/OnboardingA3.svg';

import Autosave from 'components/Form/Autosave';
import LocationField from 'components/FormikFields/LocationField';
import OnboardingCta from './OnboardingCta';

const useStyles = makeStyles(theme =>
  createStyles({
    center: { textAlign: 'center' },
    img: { margin: theme.spacing(3, 0) },
    resumeUploader: { marginTop: theme.spacing(3) },
  })
);

const OnboardingA3: React.FC = () => {
  const classes = useStyles();

  const handleSave = async (debouncedValue: string) => {
    return null;
  };

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

        <Formik
          onSubmit={(values, actions) => {
            // Does nothing, just sets submitting to false again
            actions.setSubmitting(false);
          }}
          // TODO: Hook this up to real profile
          initialValues={{ locationWork: [], locationHome: '' }}
          render={({ values }) => {
            console.log(values);

            return (
              <Form>
                <Autosave
                  valueToDebounce={JSON.stringify(values)}
                  callback={handleSave}
                />

                <Field
                  name="locationWork"
                  component={LocationField}
                  label="I Want to Work In"
                  multiple
                />
                <Field
                  name="locationHome"
                  component={LocationField}
                  label="I’m Currently In"
                />
              </Form>
            );
          }}
        />
      </Grid>

      <Grid item className={classes.center}>
        <OnboardingCta action="I’ll Decide Later" secondary />
        <OnboardingCta action="Continue" />
      </Grid>
    </>
  );
};

export default OnboardingA3;
