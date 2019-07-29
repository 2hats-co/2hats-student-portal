import React, { useContext, useState, useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import {
  makeStyles,
  createStyles,
  Container,
  Button,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Divider,
} from '@material-ui/core';

import AssessmentHeader from './AssessmentHeader';
import AssessmentBriefing from './AssessmentBriefing';
import AssessmentSubmission from './AssessmentSubmission';
import AssessmentFeedback from './AssessmentFeedback';
import AssessmentRelated from './AssessmentRelated';
import LoadingScreen from 'components/LoadingScreen';
import CompletionDelight from './CompletionDelight';

import GoIcon from 'assets/icons/Go';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import UserContext from 'contexts/UserContext';
import {
  DocWithId,
  AssessmentsDoc,
  UsersAssessmentsDoc,
} from '@bit/twohats.common.db-types';
import { copyAssessment, markViewedFeedback } from 'utilities/assessments';

const useStyles = makeStyles(theme =>
  createStyles({
    centered: { textAlign: 'center' },

    expansionPanel: {
      boxShadow: 'none',
      backgroundColor: 'transparent',
      '&::before': { display: 'none' },

      '&$expansionPanelExpanded': { margin: 0 },
    },
    expansionPanelExpanded: {},

    expansionPanelSummary: {
      padding: 0,
      '&$expansionPanelSummaryExpanded': { minHeight: 48 },
    },
    expansionPanelSummaryExpanded: {},
    expansionPanelSummaryExpandIcon: { right: theme.spacing(-1.75) },
    expansionPanelSummaryContent: {
      '&$expansionPanelSummaryExpanded': {
        margin: '12px 0',
      },
    },
    expansionPanelDetails: {
      flexDirection: 'column',
      padding: 0,
    },
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
  const { user } = useContext(UserContext);

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
        <ExpansionPanel
          classes={{
            root: classes.expansionPanel,
            expanded: classes.expansionPanelExpanded,
          }}
        >
          <ExpansionPanelSummary
            expandIcon={
              <ExpandMoreIcon
                className={classes.expansionPanelSummaryExpandIcon}
              />
            }
            classes={{
              root: classes.expansionPanelSummary,
              expanded: classes.expansionPanelSummaryExpanded,
              content: classes.expansionPanelSummaryContent,
            }}
          >
            <Typography variant="overline" component="h2">
              Assessment Details
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.expansionPanelDetails}>
            {/* Briefing */}
            <AssessmentBriefing
              assessmentData={assessmentData}
              previewInstructionsOnly={!isUserSubmission}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <Divider />
        <ExpansionPanel
          classes={{
            root: classes.expansionPanel,
            expanded: classes.expansionPanelExpanded,
          }}
        >
          <ExpansionPanelSummary
            expandIcon={
              <ExpandMoreIcon
                className={classes.expansionPanelSummaryExpandIcon}
              />
            }
            classes={{
              root: classes.expansionPanelSummary,
              expanded: classes.expansionPanelSummaryExpanded,
              content: classes.expansionPanelSummaryContent,
            }}
          >
            <Typography variant="overline" component="h2">
              Your Submission
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.expansionPanelDetails}>
            {/* Submission */}
            <AssessmentSubmission assessmentData={assessmentData} />
          </ExpansionPanelDetails>
        </ExpansionPanel>
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
              Let’s Do It
              <GoIcon />
            </Button>
          </section>
        )}
      </>
    );

  return (
    <main>
      <Container maxWidth="sm" component="article">
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
