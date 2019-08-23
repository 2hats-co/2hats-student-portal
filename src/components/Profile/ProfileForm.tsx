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

import { ProfileComponentProps } from 'containers/ProfileContainer';
import { useUser } from 'contexts/UserContext';
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

  const ProfileFormSchema = Yup.object().shape({
    bio: Yup.string().required('Required'),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, actions) => {
        console.log('FORM SUBMISSION', values);
      }}
      validationSchema={ProfileFormSchema}
      render={({ errors, touched, values }) => {
        console.log(values, errors, touched);
        return (
          <Form className={classes.root}>
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
            >
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
              placeholder="0412345678"
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
              placeholder="Description of why I am a good fit for this position…"
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
        );
      }}
    />
  );
};

export default withRouter(ProfileForm);
