import React, { useState, useEffect } from 'react';
import { Formik, Field, Form } from 'formik';

import {
  makeStyles,
  createStyles,
  Grid,
  Typography,
  LinearProgress,
} from '@material-ui/core';

import Autosave from 'components/Form/Autosave';
import ResumeField from 'components/FormikFields/ResumeField';
import { DROPZONE_HEIGHT } from '@bit/twohats.common.components.styled-dropzone';
import OnboardingCta from './OnboardingCta';
import Graphic from 'assets/images/graphics/OnboardingA2.svg';

import { useUser } from 'contexts/UserContext';
import { updateDoc } from 'utilities/firestore';
import { COLLECTIONS } from '@bit/twohats.common.constants';

const useStyles = makeStyles(theme =>
  createStyles({
    center: { textAlign: 'center' },
    img: { margin: theme.spacing(3, 0) },

    loadingWrapper: {
      height: DROPZONE_HEIGHT,
      margin: theme.spacing(1, 0), // Optical adjustment
    },
    loadingBar: { width: '100%' },
  })
);

/**
 * Gets the user to upload their résumé.
 */
const OnboardingA2: React.FC = () => {
  const classes = useStyles();
  const [disableCta, setDisableCta] = useState(true);

  const { UID, profile } = useUser();

  // Handle autosaving the user’s résumé
  const handleSave = async (debouncedValue: string) => {
    const values = JSON.parse(debouncedValue);

    const fileNotEmpty =
      values.resume && values.resume.url && values.resume.name;

    const differentFile =
      // No prior resume
      !profile ||
      !profile.resume ||
      !profile.resume.url ||
      !profile.resume.name ||
      // File is different from prior resume
      (profile.resume.url !== values.resume.url ||
        profile.resume.name !== values.resume.name);

    if (fileNotEmpty && differentFile) {
      await updateDoc(COLLECTIONS.profiles, UID!, { resume: values.resume });
      return { success: true };
    }

    return null;
  };

  // Update `disableCta` state based on profile
  useEffect(() => {
    if (!profile) return;

    // Calculate new state based on data stored in user profile
    const newDisableCtaState =
      !profile.resume || !profile.resume.url || !profile.resume.name;
    // Update local state if needed—prevents unnecessary re-renders
    if (disableCta !== newDisableCtaState) setDisableCta(newDisableCtaState);
  }, [profile, disableCta]);

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

        {profile ? (
          <Formik
            onSubmit={(values, actions) => {
              // Does nothing, just sets submitting to false again
              actions.setSubmitting(false);
            }}
            initialValues={{ resume: profile.resume }}
            render={({ values }) => (
              <Form>
                <Autosave
                  valueToDebounce={JSON.stringify(values)}
                  callback={handleSave}
                  delay={0}
                />

                <Field
                  name="resume"
                  component={ResumeField}
                  label=""
                  description=""
                  disableBottomMargin
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
        <OnboardingCta action="I’ll Procrastinate" secondary />
        <OnboardingCta action="Continue" disabled={disableCta} />
      </Grid>
    </>
  );
};

export default OnboardingA2;
