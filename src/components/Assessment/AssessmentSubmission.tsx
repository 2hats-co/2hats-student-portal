import React, { useEffect, useState } from 'react';
import ReactPixel from 'react-facebook-pixel';

import {
  makeStyles,
  createStyles,
  Grid,
  Button,
  Snackbar,
} from '@material-ui/core';
import {
  DocWithId,
  AssessmentsDoc,
  UsersAssessmentsDoc,
} from '@bit/twohats.common.db-types';

import CheckIcon from '@material-ui/icons/Check';
import GoIcon from '@bit/twohats.common.icons.go';

import AssessmentQuestion from './AssessmentQuestion';

import { useUser } from 'contexts/UserContext';
import {
  submitAssessment,
  saveAssessment,
  isSubmissionEmpty,
  checkSmartLink,
} from 'utilities/assessments';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {},
    section: { marginTop: theme.spacing(4) },

    loading: {
      marginTop: theme.spacing(3),
      backgroundColor: 'transparent',
    },

    actionButtons: {
      '@media print': { display: 'none' },
    },

    snackbar: {
      [theme.breakpoints.down('sm')]: { bottom: theme.spacing(8) },
      [theme.breakpoints.down('xs')]: { bottom: theme.spacing(7) },
    },
    savedTick: {
      verticalAlign: 'bottom',
      marginRight: theme.spacing(1),
    },
  })
);

interface IAssessmentSubmissionProps {
  assessmentData: DocWithId<AssessmentsDoc> | DocWithId<UsersAssessmentsDoc>;
}

/**
 * Handles logic for the assessment submission (particular to the user).
 * Actual display components are in `AssessmentQuestion`
 *
 * ### Invariant
 *
 * This component is only mounted for user seubmissions, i.e. doc has the
 * `assessmentId` field.
 *
 * The root `Assessment` component is responsible for creating the submissions
 * doc and redirecting to the correct URL
 *
 * ### Responsibilities
 *
 * - For IDEO submissions, ensures the smartlink is still valid
 * - Stores a local state for the user’s answers
 * - Save function (without submitting)
 * - Submit function (save + submit)
 */
const AssessmentSubmission: React.FunctionComponent<
  IAssessmentSubmissionProps
> = ({ assessmentData }) => {
  // TypeScript can't do runtime type checking, so we have to check for fields
  // individually like this – again, not very cashmoney
  if (!('submitted' in assessmentData))
    throw new Error('Assessment document is invalid');

  const { user } = useUser();
  const classes = useStyles();
  // Show/hide the "Saved" snackbar
  const [showSnackbar, setShowSnackbar] = useState(false);

  // Store a local state of answers here
  const [answers, setAnswers] = useState<any[]>(
    Array.isArray(assessmentData.submissionContent)
      ? assessmentData.submissionContent
      : []
  );
  // Reset assessment answers when submission changes
  useEffect(() => {
    setAnswers(
      Array.isArray(assessmentData.submissionContent)
        ? assessmentData.submissionContent
        : []
    );
  }, [assessmentData.id]);
  // Helper function to update answers
  const updateAnswers = (i: number) => (val: any) => {
    const newAnswers: any[] = [...answers];
    newAnswers[i] = val;
    setAnswers(newAnswers);
  };

  // Verify the smartlink still works
  useEffect(() => {
    if (assessmentData.assessmentId) checkSmartLink(assessmentData, user);
  }, []);

  // read-only if submitted
  const readOnly = assessmentData.submitted;

  // non-empty submission validation
  const disableSubmission = isSubmissionEmpty(assessmentData, answers);

  // Handle save with .then
  const handleSave = () => {
    saveAssessment(user.id, assessmentData.id, answers).then(() => {
      console.log('Saved');
      setShowSnackbar(true);
    });
  };

  // Handle submit with .then
  const handleSubmit = () => {
    submitAssessment(user.id, assessmentData.id, answers).then(() => {
      console.log('Submitted');
      ReactPixel.trackCustom('SubmitApplication');
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    });
  };

  return (
    <>
      {'copiedQuestions' in assessmentData &&
      !!assessmentData.copiedQuestions ? (
        assessmentData.copiedQuestions.map((x, i) => (
          <AssessmentQuestion
            key={i}
            questionNum={i + 1}
            questionText={x}
            mcEmail={assessmentData.mcEmail}
            submissionType={assessmentData.submissionType}
            answer={answers[i]}
            setAnswer={updateAnswers(i)}
            user={user}
            readOnly={readOnly}
          />
        ))
      ) : (
        <AssessmentQuestion
          questionNum={-1}
          questionText=""
          mcEmail={assessmentData.mcEmail} // Only available for 0 questions
          smartLink={assessmentData.smartLink} // Only available for 0 questions
          submissionType={assessmentData.submissionType}
          answer={answers[0]}
          setAnswer={updateAnswers(0)}
          user={user}
          readOnly={readOnly}
        />
      )}

      {assessmentData.submissionType !== 'ideo' && (
        <Grid
          container
          alignItems="baseline"
          justify="center"
          className={classes.actionButtons}
          spacing={3}
        >
          {!readOnly && (
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                onClick={handleSave}
                size="large"
                fullWidth
              >
                Save
                <GoIcon />
              </Button>
            </Grid>
          )}
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              size="large"
              fullWidth
              id={`submit-${!disableSubmission}`}
              disabled={disableSubmission || readOnly}
            >
              {readOnly ? 'Submitted' : 'Submit'}
              {readOnly ? <CheckIcon /> : <GoIcon />}
            </Button>
          </Grid>
        </Grid>
      )}

      <Snackbar
        className={classes.snackbar}
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
        message={
          <>
            <CheckIcon className={classes.savedTick} />
            Saved
          </>
        }
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      />
    </>
  );
};

export default AssessmentSubmission;
