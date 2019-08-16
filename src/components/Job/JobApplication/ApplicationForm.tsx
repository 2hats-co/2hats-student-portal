import React, { useContext, MouseEvent } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Formik, Field, FieldProps, Form } from 'formik';
import { TextField } from 'formik-material-ui';
import isEmpty from 'ramda/es/isEmpty';

import {
  makeStyles,
  createStyles,
  FormLabel,
  Typography,
  MenuItem,
  LinearProgress,
  Grid,
  Button,
} from '@material-ui/core';

import DialogPrompt from '@bit/twohats.common.components.dialog-prompt';
import HelpPopup from '@bit/twohats.common.components.help-popup';
import GoIcon from '@bit/twohats.common.icons.go';

import StartDateField from './StartDateField';
import PaySliderField from './PaySliderField';
import WorkCultureSlidersField from './WorkCultureSlidersField';
import PortfolioFileField from './PortfolioFileField';
import ResumeField from './ResumeField';

import { DocWithId, JobsDoc, UsersJobsDoc } from '@bit/twohats.common.db-types';
import UserContext from 'contexts/UserContext';
import {
  COLLECTIONS,
  WORK_RESTRICTIONS,
  WORK_RESTRICTIONS_LABELS,
} from '@bit/twohats.common.constants';
import useDocument from 'hooks/useDocument';
import { JOB } from 'constants/routes';

import { JobApplicationSchema } from 'constants/jobApplication';
import { submitJobApplication } from 'utilities/jobs';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      marginTop: theme.spacing(4),

      '& > div': { marginBottom: theme.spacing(4) },
      '& > div > label': {
        display: 'block',
        marginBottom: theme.spacing(0.5),
      },
    },

    progress: { margin: theme.spacing(4, 0, 16) },

    submitButton: {
      display: 'flex',
      margin: '0 auto',
      marginBottom: theme.spacing(4),
    },
  })
);

interface IApplicationFormProps extends RouteComponentProps {
  jobData: DocWithId<JobsDoc> | DocWithId<UsersJobsDoc>;
}

const ApplicationForm: React.FunctionComponent<IApplicationFormProps> = ({
  jobData,
  history,
  location,
}) => {
  const classes = useStyles();

  // Get profile document to get already inputted data
  const { user } = useContext(UserContext);
  const [profileState] = useDocument({
    path: `${COLLECTIONS.profiles}/${user.id}`,
  });
  const profile = profileState.doc;

  // Show loading screen while profile is loading
  if (!profile || profileState.loading)
    return <LinearProgress className={classes.progress} />;

  const initialValues = {
    jobAvailabilityStartDate: profile.jobAvailabilityStartDate
      ? profile.jobAvailabilityStartDate.toDate()
      : null,
    workRestriction: profile.workRestriction || '',
    coverLetter: '',
    pay: 100,
    workCultureSliders: profile.workCultureSliders,
    resume: profile.resume,
    portfolioFile: profile.portfolioFile,
    portfolioExternal: profile.portfolioExternal || '',
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, actions) => {
        console.log('FORM SUBMISSION', values);
        const jobApplicationId = await submitJobApplication(
          user,
          values,
          jobData
        );
        console.log('JOB APPLICATION ID', jobApplicationId);
        actions.setSubmitting(false);
        actions.setStatus('submitted');
        history.replace({
          pathname: `${JOB}/${jobApplicationId}?yours=true`,
          state: { ...location.state, preventDoubleSubmissionCheck: false },
        });
      }}
      validationSchema={JobApplicationSchema}
      render={({ errors, submitForm, dirty, isSubmitting, status }) => (
        <Form className={classes.root}>
          <Field
            name="jobAvailabilityStartDate"
            component={(fieldProps: FieldProps<Date>) => (
              <StartDateField {...fieldProps} />
            )}
          />

          <div>
            <FormLabel htmlFor="field-coverLetter">
              <Typography variant="overline" color="textSecondary">
                About Me
              </Typography>
            </FormLabel>
            <Field
              name="coverLetter"
              id="field-coverLetter"
              component={TextField}
              variant="filled"
              multiline
              fullWidth
              hiddenLabel
              margin="none"
              placeholder="Description of why I am a good fit for this position…"
              rows="4"
              error={errors.coverLetter}
            />
          </div>

          <div>
            <FormLabel htmlFor="field-workRestriction">
              <Grid container alignItems="center">
                <Typography variant="overline" color="textSecondary">
                  Work Condition
                </Typography>
                <HelpPopup
                  variant="besideOverline"
                  message="We do not judge job applications based on working conditions or restrictions. "
                />
              </Grid>
            </FormLabel>
            <Field
              name="workRestriction"
              inputProps={{ id: 'field-workRestriction' }}
              component={TextField}
              variant="filled"
              select
              fullWidth
              hiddenLabel
              margin="none"
              aria-label="Work Condition"
              error={errors.workRestriction}
              SelectProps={{
                displayEmpty: true,
                renderValue: (value: string) =>
                  WORK_RESTRICTIONS_LABELS[value] || (
                    <Typography color="textSecondary">Choose one…</Typography>
                  ),
              }}
            >
              {WORK_RESTRICTIONS.map((x: string) => (
                <MenuItem key={x} value={x}>
                  {WORK_RESTRICTIONS_LABELS[x]}
                </MenuItem>
              ))}
            </Field>
          </div>

          <Field name="pay" component={PaySliderField} jobData={jobData} />

          <Field
            name="workCultureSliders"
            component={WorkCultureSlidersField}
          />

          {(!profile.resume || !profile.resume.name || !profile.resume.url) && (
            <Field name="resume" component={ResumeField} />
          )}

          <Field name="portfolioFile" component={PortfolioFileField} />

          <div>
            <FormLabel htmlFor="field-portfolio-external">
              <Typography variant="overline" color="textSecondary">
                Link to Your Work (Online Portfolio, GitHub, etc.)
              </Typography>
            </FormLabel>

            <Field
              name="portfolioExternal"
              inputProps={{ id: 'field-portfolio-external' }}
              component={TextField}
              variant="filled"
              fullWidth
              hiddenLabel
              margin="none"
              placeholder="https://www."
            />
          </div>

          <Button
            onClick={(event: MouseEvent) => {
              if (!isSubmitting) submitForm();
            }}
            color="primary"
            variant="contained"
            type="submit"
            size="large"
            className={classes.submitButton}
            disabled={isSubmitting}
          >
            Submit
            <GoIcon />
          </Button>

          {isSubmitting && <LinearProgress />}

          {!isEmpty(errors) && (
            <Typography variant="body2" align="center" color="error">
              There’s something missing in your submission. Scroll up to
              complete your submission.
            </Typography>
          )}

          {dirty && status !== 'submitted' && <DialogPrompt />}
        </Form>
      )}
    />
  );
};

export default withRouter(ApplicationForm);
