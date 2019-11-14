import React, { useState, useEffect } from 'react';
import { Formik, Field, Form } from 'formik';
import isEmpty from 'ramda/es/isEmpty';

import {
  makeStyles,
  createStyles,
  Grid,
  Typography,
  LinearProgress,
} from '@material-ui/core';

import Graphic from 'assets/images/graphics/OnboardingA3.svg';

import Autosave from 'components/Form/Autosave';
import LocationField from 'components/FormikFields/LocationField';
import OnboardingCta from './OnboardingCta';

import { useUser } from 'contexts/UserContext';
import { updateDoc } from 'utilities/firestore';
import { COLLECTIONS } from '@bit/twohats.common.constants';

const useStyles = makeStyles(theme =>
  createStyles({
    center: { textAlign: 'center' },
    img: { margin: theme.spacing(3, 0) },

    form: {
      '& .field-wrapper': { marginBottom: theme.spacing(2) },
    },

    loadingWrapper: { height: 172 },
    loadingBar: { width: '100%' },
  })
);

/**
 * Gets the user to state where they want to work and where they currently live.
 */
const OnboardingA3: React.FC = () => {
  const classes = useStyles();
  const [disableCta, setDisableCta] = useState(true);

  const { UID, profile } = useUser();

  // Handle autosaving the user’s location
  const handleSave = async (debouncedValue: string) => {
    const values = JSON.parse(debouncedValue);

    // Check if new values are different before writing to Firestore
    if (
      !profile ||
      JSON.stringify(values.locationWork) !==
        JSON.stringify(profile.locationWork) ||
      JSON.stringify(values.locationHome) !==
        JSON.stringify(profile.locationHome)
    ) {
      await updateDoc(COLLECTIONS.profiles, UID!, JSON.parse(debouncedValue));
      return { success: true };
    }
    // Ensure no snackbar is displayed when the component is first rendered
    return null;
  };

  // Update `disableCta` state based on profile
  useEffect(() => {
    if (!profile) return;

    // Calculate new state based on data stored in user profile
    const newDisableCtaState =
      isEmpty(profile.locationWork) || isEmpty(profile.locationHome);
    // Update local state if needed—prevents unnecessary re-renders
    if (disableCta !== newDisableCtaState) setDisableCta(newDisableCtaState);
  }, [profile, disableCta]);

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
          paragraph
        >
          Tell us about the lucky city you want to work in. It helps us show you
          the most relevant positions for your future.
        </Typography>

        {profile ? (
          <Formik
            onSubmit={(values, actions) => {
              // Does nothing, just sets submitting to false again
              actions.setSubmitting(false);
            }}
            initialValues={{
              locationWork: profile.locationWork || [],
              locationHome: profile.locationHome || '',
            }}
            render={({ values }) => (
              <Form className={classes.form}>
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
            )}
          />
        ) : (
          <Grid
            container
            alignItems="center"
            className={classes.loadingWrapper}
          >
            <LinearProgress className={classes.loadingBar} />
          </Grid>
        )}
      </Grid>

      <Grid item className={classes.center}>
        <OnboardingCta action="I’ll Decide Later" secondary />
        <OnboardingCta action="Continue" disabled={disableCta} />
      </Grid>
    </>
  );
};

export default OnboardingA3;
