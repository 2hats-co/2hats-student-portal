import React, { useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';

import {
  makeStyles,
  createStyles,
  LinearProgress,
  Button,
} from '@material-ui/core';

import DialogPrompt from '@bit/twohats.common.components.dialog-prompt';
import GoIcon from '@bit/twohats.common.icons.go';

import StartDateField from 'components/FormikFields/StartDateField';
import StyledTextField from 'components/FormikFields/StyledTextField';
import WorkRestrictionField from 'components/FormikFields/WorkRestrictionField';
import PaySliderField from './PaySliderField';
import WorkCultureSlidersField from 'components/FormikFields/WorkCultureSlidersField';
import PortfolioFileField from 'components/FormikFields/PortfolioFileField';
import ResumeField from 'components/FormikFields/ResumeField';
import ErrorDialog from './ErrorDialog';

import { DocWithId, JobsDoc, UsersJobsDoc } from '@bit/twohats.common.db-types';
import { useUser } from 'contexts/UserContext';
import { JOB } from 'constants/routes';

import {
  JobApplicationSchema,
  jobApplicationFormDisplayLabels,
} from 'constants/jobApplication';
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

/**
 * The Formik Values type. Need to Omit jobAvailabilityStartDate and
 * replace with JS Date object or null, since we don’t use Firebase Timestamp
 * objects directly in the front end.
 */
export type ApplicationFormValues = Partial<
  Omit<UsersJobsDoc['submissionContent'], 'jobAvailabilityStartDate'> & {
    jobAvailabilityStartDate: Date | null;
  }
>;

/**
 * The Formik-based application form for applying for jobs.
 *
 * When the component is mounted, it will get the user’s Profile document and
 * store it in state. (The listener is unsubscribed to since Formik won’t
 * update the fields when Profile changes)
 */
const ApplicationForm: React.FunctionComponent<IApplicationFormProps> = ({
  jobData,
  history,
  location,
}) => {
  const classes = useStyles();

  // Show error dialog when the user clicks Submit and there are errors
  const [openErrorDialog, setOpenErrorDialog] = useState(false);
  const handleCloseErrorDialog = () => setOpenErrorDialog(false);

  // Get profile document to get already inputted data
  const { user, profile } = useUser();

  // Show loading screen while profile is loading
  if (!profile) return <LinearProgress className={classes.progress} />;

  const initialValues = {
    jobAvailabilityStartDate: profile.jobAvailabilityStartDate
      ? profile.jobAvailabilityStartDate.toDate()
      : null,
    workRestriction: profile.workRestriction || undefined,
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
      onSubmit={async (values: ApplicationFormValues, actions) => {
        console.log('FORM SUBMISSION', values);
        const jobApplicationId = await submitJobApplication(
          user!,
          values,
          jobData
        );
        console.log('JOB APPLICATION ID', jobApplicationId);
        actions.setSubmitting(false);
        actions.setStatus('submitted');
        history.replace({
          pathname: `${JOB}/${jobApplicationId}`,
          search: '?yours=true',
          state: { ...location.state, preventDoubleSubmissionCheck: false },
        });
      }}
      validationSchema={JobApplicationSchema}
      render={({
        errors,
        submitForm,
        dirty,
        isSubmitting,
        status,
        isValid,
      }) => (
        <Form className={classes.root}>
          <Field name="jobAvailabilityStartDate" component={StartDateField} />

          <Field
            name="coverLetter"
            component={StyledTextField}
            label="About Me"
            multiline
            placeholder="Description of why I am a good fit for this position…"
            rows="4"
          />

          <Field name="workRestriction" component={WorkRestrictionField} />

          <Field name="pay" component={PaySliderField} jobData={jobData} />

          <Field
            name="workCultureSliders"
            component={WorkCultureSlidersField}
          />

          {(!profile.resume || !profile.resume.name || !profile.resume.url) && (
            <Field name="resume" component={ResumeField} />
          )}

          <Field name="portfolioFile" component={PortfolioFileField} />

          <Field
            name="portfolioExternal"
            component={StyledTextField}
            label="Link to Your Work (Online Portfolio, GitHub, etc.)"
            placeholder="https://www."
          />

          <Button
            onClick={() => {
              if (!isValid) setOpenErrorDialog(true);
              else if (!isSubmitting) submitForm();
            }}
            color="primary"
            variant="contained"
            type="submit"
            size="large"
            className={classes.submitButton}
            disabled={isSubmitting}
            endIcon={<GoIcon />}
          >
            Submit
          </Button>

          {isSubmitting && <LinearProgress />}

          <ErrorDialog
            open={openErrorDialog}
            handleClose={handleCloseErrorDialog}
            erroredFields={Object.keys(errors).map(
              x => jobApplicationFormDisplayLabels[x]
            )}
          />

          {dirty && status !== 'submitted' && <DialogPrompt />}
        </Form>
      )}
    />
  );
};

export default withRouter(ApplicationForm);
