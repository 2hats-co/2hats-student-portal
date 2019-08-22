import React, { useState, useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import {
  makeStyles,
  createStyles,
  Container,
  Button,
  Divider,
} from '@material-ui/core';

import AssessmentHeader from './AssessmentHeader';
import AssessmentBriefing from './AssessmentBriefing';
import AssessmentSubmission from './AssessmentSubmission';
import AssessmentFeedback from './AssessmentFeedback';
import AssessmentRelated from './AssessmentRelated';
import CompletionDelight from './CompletionDelight';
import JobProgress from './JobProgress';

import LoadingScreen from 'components/LoadingScreen';
import NakedExpansionPanel from '@bit/twohats.common.components.naked-expansion-panel';

import DownIcon from '@material-ui/icons/KeyboardArrowDown';

import { useUser } from 'contexts/UserContext';
import {
  DocWithId,
  AssessmentsDoc,
  UsersAssessmentsDoc,
} from '@bit/twohats.common.db-types';
import { copyAssessment, markViewedFeedback } from 'utilities/assessments';
import { NakedExpansionPanelStyles } from '@bit/twohats.common.styles';

const useStyles = makeStyles(theme =>
  createStyles({
    centered: { textAlign: 'center' },
    ...NakedExpansionPanelStyles(theme),
  })
);

interface IAssessmentProps extends RouteComponentProps {
  assessmentData: DocWithId<AssessmentsDoc> | DocWithId<UsersAssessmentsDoc>;
}

const Assessment: React.FunctionComponent<IAssessmentProps> = ({
  assessmentData,
  history,
  location,
}) => {
  const classes = useStyles();
  const { user } = useUser();

  // The assessmentData prop is definitely of type UsersAssessmentsDoc
  // if and only if it has the field assessmentId
  // assessmentId must be created when the user creates a submission
  const isUserSubmission = 'assessmentId' in assessmentData;

  // Function to create a new user assessment
  const [loading, setLoading] = useState(false);
  const handleNewSubmission = () => {
    setLoading(true);
    copyAssessment(assessmentData, user, history);
  };

  // Mark feedback as viewed if required
  useEffect(() => {
    markViewedFeedback(assessmentData, user.id);
  }, [assessmentData]);

  if (loading)
    return <LoadingScreen contained message="Creating submission…" />;

  // Show user delight screen if conditions met
  const showDelight =
    'submitted' in assessmentData &&
    assessmentData.submitted &&
    'screened' in assessmentData &&
    !assessmentData.screened &&
    'outcome' in assessmentData &&
    assessmentData.outcome === 'pending';

  let mainContent: React.ReactNode = null;
  // Collapse briefing & submission — can assume isUserSubmission === true
  if ('submitted' in assessmentData && assessmentData.submitted)
    mainContent = (
      <>
        {/* Conditionally show delight */}
        {showDelight && <CompletionDelight />}
        {/* Show briefing */}
        {'screened' in assessmentData && assessmentData.screened && (
          <AssessmentFeedback assessmentData={assessmentData} />
        )}

        <Divider />

        <NakedExpansionPanel header="Assessment Details">
          <AssessmentBriefing
            assessmentData={assessmentData}
            previewInstructionsOnly={!isUserSubmission}
          />
        </NakedExpansionPanel>

        <Divider />

        <NakedExpansionPanel header="Your Submission">
          <AssessmentSubmission assessmentData={assessmentData} />
        </NakedExpansionPanel>
      </>
    );
  else
    mainContent = (
      <>
        <AssessmentBriefing
          assessmentData={assessmentData}
          previewInstructionsOnly={!isUserSubmission}
        />

        {isUserSubmission ? (
          <AssessmentSubmission assessmentData={assessmentData} />
        ) : (
          <section className={classes.centered}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleNewSubmission}
            >
              Let’s Begin
              <DownIcon />
            </Button>
          </section>
        )}
      </>
    );

  return (
    <main>
      <Container maxWidth="sm" component="article">
        {/* Show progress towards completing assessments for a job */}
        {location.state && location.state.skillsRequired && <JobProgress />}

        <AssessmentHeader assessmentData={assessmentData} />

        {mainContent}
      </Container>

      <AssessmentRelated
        assessmentData={assessmentData}
        showDelight={showDelight}
      />
    </main>
  );
};

export default withRouter(Assessment);
