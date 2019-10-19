import React from 'react';

import { makeStyles, createStyles, LinearProgress } from '@material-ui/core';
import HeadingCaps from '@bit/twohats.common.components.heading-caps';

import AssessmentOutcome from './AssessmentOutcome';
import AssessmentFeedbackItem from './AssessmentFeedbackItem';
import NewSubmissionPrompt from './NewSubmissionPrompt';

import { DocWithId, UsersAssessmentsDoc } from '@bit/twohats.common.db-types';
import { useUser } from 'contexts/UserContext';
import useCollection from 'hooks/useCollection';
import { COLLECTIONS } from '@bit/twohats.common.constants';
import { getSubmissionsRemaining } from 'utilities/assessments';

const useStyles = makeStyles(theme =>
  createStyles({
    root: { marginTop: theme.spacing(2) },

    outcome: { fontWeight: 500 },

    feedbackList: {
      listStyleType: 'none',
      paddingLeft: theme.spacing(4),
    },

    linearProgress: { margin: theme.spacing(6, 0) },
  })
);

interface IAssessmentFeedbackProps {
  assessmentData: DocWithId<UsersAssessmentsDoc>;
}

/**
 * Displays the feedback the user received for this assessment.
 *
 * Also checks if they can continue to make submissions to show Resubmit button.
 * (max. 3 submissions in 6 months PLUS manual override from admin portal)
 */
const AssessmentFeedback: React.FunctionComponent<IAssessmentFeedbackProps> = ({
  assessmentData,
}) => {
  const classes = useStyles();
  const { user } = useUser();

  // Query for all submissions for this assessment
  const [submissionsState] = useCollection({
    path: `${COLLECTIONS.users}/${user!.id}/${COLLECTIONS.assessments}`,
    filters: [
      {
        field: 'assessmentId',
        operator: '==',
        value: assessmentData.assessmentId,
      },
    ],
    sort: { field: 'createdAt', direction: 'desc' },
  });

  // Show loading bar while we await for query results
  if (submissionsState.loading)
    return <LinearProgress className={classes.linearProgress} />;

  // Unsubscribe once we get query results, since we don't need a listener
  if (submissionsState.unsubscribe && !submissionsState.loading)
    submissionsState.unsubscribe();

  // Don't display if there is no feedback to display
  const validFeedback =
    Array.isArray(assessmentData.feedback) &&
    assessmentData.feedback.length > 0;
  if (!validFeedback && assessmentData.outcome === 'pass') return null;

  // Get the number of submissions remaining
  const submissionsRemaining = getSubmissionsRemaining(
    assessmentData,
    submissionsState.documents
  );

  return (
    <section className={classes.root}>
      <HeadingCaps>Feedback</HeadingCaps>

      <AssessmentOutcome
        assessmentData={assessmentData}
        submissionsRemaining={submissionsRemaining}
      />

      {validFeedback && Array.isArray(assessmentData.feedback) && (
        <ul className={classes.feedbackList}>
          {assessmentData.feedback.map((x, i) => (
            <AssessmentFeedbackItem key={i} feedbackData={x} />
          ))}
        </ul>
      )}

      {/* Show resubmission button if not pass */}
      {assessmentData.outcome !== 'pass' && (
        <NewSubmissionPrompt
          assessmentData={assessmentData}
          allSubmissions={submissionsState.documents}
          submissionsRemaining={submissionsRemaining}
        />
      )}
    </section>
  );
};

export default AssessmentFeedback;
