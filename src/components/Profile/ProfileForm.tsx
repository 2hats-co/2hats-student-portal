import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Formik, Field, FieldProps, Form } from 'formik';
import * as Yup from 'yup';

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
import WorkCultureSlidersField from 'components/FormikFields/WorkCultureSlidersField';
import PortfolioFileField from 'components/FormikFields/PortfolioFileField';
import ResumeField from 'components/FormikFields/ResumeField';

import ProfileFormAutosave from './ProfileFormAutosave';

import { ProfileComponentProps } from 'containers/ProfileContainer';
import { useUser } from 'contexts/UserContext';
import { ProfileFormSchema } from 'constants/profile';
import { UNIVERSITIES } from '@bit/twohats.common.constants';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      marginTop: theme.spacing(4),

      '& > div': { marginBottom: theme.spacing(2) },
      '& > div > label': {
        display: 'block',
        marginBottom: theme.spacing(0.5),
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
 */
const ProfileForm: React.FunctionComponent<IProfileFormProps> = ({
  profileData,
}) => {
  const classes = useStyles();
  const { user } = useUser();

  const initialValues = {
    firstName: user.firstName,
    lastName: user.lastName,

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

          <Typography
            variant="h6"
            component="h1"
            color="textSecondary"
            gutterBottom
          >
            Personal Info
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Field
                name="firstName"
                component={StyledTextField}
                label="First Name"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Field
                name="lastName"
                component={StyledTextField}
                label="Last Name"
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
            label="Minimum Available Days / Week"
            min={1}
            max={5}
            step={0.5}
            marks={[1, 2, 3, 4, 5].map(x => ({ value: x }))}
            valueLabelDisplay="auto"
            rightValueFormat={(val: number) => `${val.toFixed(1)} days/week`}
          />

          <Field
            name="mobileNumber"
            component={StyledTextField}
            label="Mobile Number"
            placeholder="e.g. 0412 345 678"
          />

          <Typography
            variant="h6"
            component="h1"
            color="textSecondary"
            gutterBottom
          >
            About Me
          </Typography>

          <Field
            name="bio"
            component={StyledTextField}
            label="My Bio"
            multiline
            placeholder="Your bio goes here…"
            rows="4"
          />

          <Field
            name="workCultureSliders"
            component={WorkCultureSlidersField}
          />

          {/** CURIOUS THING GOES HERE */}

          <Field name="resume" component={ResumeField} />

          <Field name="portfolioFile" component={PortfolioFileField} />

          <Field
            name="portfolioExternal"
            component={StyledTextField}
            label="Link to Your Work (Online Portfolio, GitHub, etc.)"
            placeholder="https://www."
          />
        </Form>
      )}
    />
  );
};

export default withRouter(ProfileForm);
