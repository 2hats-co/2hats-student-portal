import React from 'react';

import { makeStyles, createStyles, Typography } from '@material-ui/core';

import AssessmentOutcome from './AssessmentOutcome';
import AssessmentFeedbackItem from './AssessmentFeedbackItem';
import NewSubmissionPrompt from './NewSubmissionPrompt';

import { DocWithId, UsersAssessmentsDoc } from '@bit/twohats.common.db-types';

const useStyles = makeStyles(theme =>
  createStyles({
    root: { marginTop: theme.spacing(2) },

    outcome: { fontWeight: 500 },

    feedbackList: {
      listStyleType: 'none',
      paddingLeft: theme.spacing(4),
    },
  })
);

interface IAssessmentFeedbackProps {
  assessmentData: DocWithId<UsersAssessmentsDoc>;
}

const AssessmentFeedback: React.FunctionComponent<IAssessmentFeedbackProps> = ({
  assessmentData,
}) => {
  const classes = useStyles();

  const validFeedback =
    Array.isArray(assessmentData.feedback) &&
    assessmentData.feedback.length > 0;

  if (!validFeedback && assessmentData.outcome === 'pass') return null;

  return (
    <section className={classes.root}>
      <Typography variant="overline" color="textSecondary" component="h2">
        Feedback
      </Typography>

      <AssessmentOutcome assessmentData={assessmentData} />

      {validFeedback && Array.isArray(assessmentData.feedback) && (
        <ul className={classes.feedbackList}>
          {assessmentData.feedback.map((x, i) => (
            <AssessmentFeedbackItem key={i} feedbackData={x} />
          ))}
        </ul>
      )}

      {/* Show resubmission button if not pass */}
      {assessmentData.outcome !== 'pass' && (
        <NewSubmissionPrompt assessmentData={assessmentData} />
      )}
    </section>
  );
};

export default AssessmentFeedback;
