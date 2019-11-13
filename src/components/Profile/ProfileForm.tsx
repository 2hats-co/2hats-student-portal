import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Formik, Field, FieldProps, Form } from 'formik';
import ScrollableAnchor from 'react-scrollable-anchor';

import {
  makeStyles,
  createStyles,
  Typography,
  Grid,
  MenuItem,
} from '@material-ui/core';

import StyledTextField from 'components/FormikFields/StyledTextField';
import StartDateField from 'components/FormikFields/StartDateField';
import WorkRestrictionField from 'components/FormikFields/WorkRestrictionField';
import SliderField from 'components/FormikFields/SliderField';
import MobileNumberField from 'components/FormikFields/MobileNumberField';
import WorkCultureSlidersField from 'components/FormikFields/WorkCultureSlidersField';
import ResumeField from 'components/FormikFields/ResumeField';
import PortfolioFileField from 'components/FormikFields/PortfolioFileField';
import LocationField from 'components/FormikFields/LocationField';

import CuriousThing from 'components/CuriousThing';
import PrioritisedIndustries from './PrioritisedIndustries';

import ProfileFormAutosave from './ProfileFormAutosave';
import HeadingTitle from '@bit/twohats.common.components.heading-title';
import HeadingCaps from '@bit/twohats.common.components.heading-caps';

import { ProfileComponentProps } from 'containers/ProfileContainer';
import { useUser } from 'contexts/UserContext';
import { ProfileFormSchema } from 'constants/profile';
import { UNIVERSITIES } from '@bit/twohats.common.constants';
import * as ROUTES from 'constants/routes';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      marginTop: theme.spacing(4),

      '& section': { marginBottom: theme.spacing(4) },
      '& .field-wrapper': { marginBottom: theme.spacing(2) },
    },

    nameFieldsWrapper: {
      [theme.breakpoints.down('xs')]: {
        '& > div:first-of-type': { paddingBottom: 0 },
        '& > div:last-of-type': { paddingTop: 0 },
      },
    },
  })
);

interface IProfileFormProps
  extends RouteComponentProps,
    ProfileComponentProps {}

/**
 * The Formik form allowing the user to update their information.
 *
 * Autosaving and updating the relevant documents is handled by
 * [`ProfileFormAutosave`](#profileformautosave)
 *
 * TODO: Remove this component & merge with [`Profile`](#profile)
 * TODO: Remove `ProfileFormAutosave`
 */
const ProfileForm: React.FunctionComponent<IProfileFormProps> = ({
  profileData,
}) => {
  const classes = useStyles();
  const { user } = useUser();

  // Temporarily cast profile while bit dbTypes are broken
  // TODO: Remove this workaround
  const _profile = profileData as { [key: string]: any };

  const initialValues = {
    firstName: user!.firstName,
    lastName: user!.lastName,

    currentUniversity: profileData.currentUniversity,
    currentDegree: profileData.currentDegree,
    workRestriction: profileData.workRestriction || '',

    jobAvailabilityStartDate: profileData.jobAvailabilityStartDate
      ? profileData.jobAvailabilityStartDate.toDate()
      : undefined,
    availableDays: profileData.availableDays,

    mobileNumber: profileData.mobileNumber,

    bio: profileData.bio,

    workCultureSliders: profileData.workCultureSliders,

    resume: profileData.resume,
    portfolioFile: profileData.portfolioFile,
    portfolioExternal: profileData.portfolioExternal || '',

    locationWork: _profile.locationWork || [],
    locationHome: _profile.locationHome || '',
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        // does nothing, just sets submitting to false again
        actions.setSubmitting(false);
      }}
      validationSchema={ProfileFormSchema}
      render={({ values, errors }) => (
        <Form className={classes.root}>
          <ProfileFormAutosave
            values={values}
            errors={errors}
            profileData={profileData}
          />

          <section>
            <HeadingTitle>Personal Info</HeadingTitle>

            <Grid container spacing={3} className={classes.nameFieldsWrapper}>
              <Grid item xs={12} sm={6}>
                <Field
                  name="firstName"
                  component={StyledTextField}
                  label="First Name"
                  inputProps={{ autoComplete: 'given-name' }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Field
                  name="lastName"
                  component={StyledTextField}
                  label="Last Name"
                  inputProps={{ autoComplete: 'family-name' }}
                />
              </Grid>
            </Grid>

            <Field
              name="currentUniversity"
              component={StyledTextField}
              label="Current University"
              select
              aria-label="Current University"
              SelectProps={{ displayEmpty: true }}
            >
              <MenuItem value="" disabled>
                <Typography color="textSecondary">
                  Choose a university…
                </Typography>
              </MenuItem>
              {UNIVERSITIES.map((x: string) => (
                <MenuItem key={x} value={x.split('\u2063')[0]}>
                  {x}
                </MenuItem>
              ))}
            </Field>

            <Field
              name="currentDegree"
              component={StyledTextField}
              label="Current Degree"
              placeholder="Bachelor of … or Master of …"
            />

            <Field name="workRestriction" component={WorkRestrictionField} />

            <Field
              name="jobAvailabilityStartDate"
              id="field-jobAvailabilityStartDate"
              component={(fieldProps: FieldProps<Date>) => (
                <StartDateField {...fieldProps} />
              )}
            />

            <Field
              name="availableDays"
              component={SliderField}
              label="Available Days / Week"
              min={1}
              max={5}
              step={0.5}
              marks={[1, 2, 3, 4, 5].map(x => ({ value: x }))}
              valueLabelDisplay="auto"
              rightValueFormat={(val: number) =>
                `${typeof val === 'number' ? val.toFixed(1) : '—'} days/week`
              }
            />

            <Field name="mobileNumber" component={MobileNumberField} />
          </section>

          <section>
            <HeadingTitle>About Me</HeadingTitle>

            <Field
              name="bio"
              component={StyledTextField}
              label="My Bio"
              multiline
              placeholder="e.g. Currently a curious computer science student. Interested in front-end web development, UI/UX design, and blockchain technology. I love sci-fi, cats, wine, yoga, and wine."
              rows="4"
            />

            <Field
              name="workCultureSliders"
              component={WorkCultureSlidersField}
            />

            <CuriousThing profileData={profileData} />

            <Field name="resume" component={ResumeField} />

            <Field name="portfolioFile" component={PortfolioFileField} />

            <Field
              name="portfolioExternal"
              component={StyledTextField}
              label="Link to Your Work (Online Portfolio, GitHub, etc.)"
              placeholder="https://www."
            />
          </section>

          <section>
            <HeadingTitle>My Application Profile</HeadingTitle>

            <ScrollableAnchor id={ROUTES.PROFILE_PREFERRED_INDUSTRIES}>
              <section>
                <HeadingCaps>Areas of Interest</HeadingCaps>
                <Typography variant="body1" color="textSecondary" paragraph>
                  Which of these sound like your future workplace? Pick at least
                  one of the fields to view the jobs and tasks that relate to
                  you!
                </Typography>
                <PrioritisedIndustries />
              </section>
            </ScrollableAnchor>

            <ScrollableAnchor id={ROUTES.PROFILE_LOCATION}>
              <section>
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
              </section>
            </ScrollableAnchor>
          </section>
        </Form>
      )}
    />
  );
};

export default withRouter(ProfileForm);
