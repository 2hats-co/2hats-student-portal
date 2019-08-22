import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';

import { makeStyles } from '@material-ui/styles';

import CardGrid from 'components/CardGrid';

import { useUser } from 'contexts/UserContext';
import useCollection from 'hooks/useCollection';
import { generateAssessmentCard } from 'utilities/cards';

import { COLLECTIONS } from '@bit/twohats.common.constants';
import * as ROUTES from 'constants/routes';
import LightbulbBrain from 'assets/images/graphics/LightbulbBrain.svg';

const useStyles = makeStyles(() => ({
  root: {
    // Prevent scrollbar appearing during card animations in Firefox on Windows
    overflow: 'hidden',
  },
}));

const DISPATCH_PROPS = {
  UNVIEWED_FEEDBACK: user => ({
    path: `${COLLECTIONS.users}/${user.id}/${COLLECTIONS.assessments}`,
    sort: { field: 'updatedAt', direction: 'desc' },
    filters: [
      { field: 'viewedFeedback', operator: '==', value: false },
      { field: 'screened', operator: '==', value: true },
    ],
  }),
  ONGOING: user => ({
    path: `${COLLECTIONS.users}/${user.id}/${COLLECTIONS.assessments}`,
    sort: { field: 'updatedAt', direction: 'desc' },
    filters: [{ field: 'submitted', operator: '==', value: false }],
  }),
  ALL: () => ({
    path: COLLECTIONS.assessments,
    sort: { field: 'createdAt', direction: 'desc' },
    filters: [{ field: 'published', operator: '==', value: true }],
  }),
  COMPLETED: user => ({
    path: `${COLLECTIONS.users}/${user.id}/${COLLECTIONS.assessments}`,
    sort: { field: 'updatedAt', direction: 'desc' },
    filters: [{ field: 'submitted', operator: '==', value: true }],
  }),
};

const AssessmentsContainer = ({ match, location }) => {
  const classes = useStyles();
  const { user } = useUser();

  // Change tab title
  useEffect(() => {
    if (match.params && match.params.filter) {
      switch (match.params.filter) {
        case 'ongoing':
          document.title = 'Ongoing Assessments – 2hats';
          break;
        case 'all':
          document.title = 'All Assessments – 2hats';
          break;
        case 'completed':
          document.title = 'Completed Assessments – 2hats';
          break;
        default:
          break;
      }
    } else document.title = 'Assessments – 2hats';
  }, [match]);

  // Set up empty useCollection queries to be filled in depending on match
  const [unviewedFeedbackState, unviewedFeedbackDispatch] = useCollection();
  const [ongoingState, ongoingDispatch] = useCollection();
  const [allState, allDispatch] = useCollection();
  const [completedState, completedDispatch] = useCollection();

  // Store CardGrids here
  const ongoingCardGrid = (
    <CardGrid
      key="ongoing-card-grid"
      header="Ongoing Assessments"
      route={ROUTES.ASSESSMENTS_ONGOING}
      cardProps={[
        ...unviewedFeedbackState.documents,
        ...ongoingState.documents,
      ]}
      cardGenerator={x => generateAssessmentCard(x, { showUpdatedAt: true })}
      loading={unviewedFeedbackState.loading || ongoingState.loading}
      loadMore={page => {
        unviewedFeedbackDispatch({ type: 'more' });
        ongoingDispatch({ type: 'more' });
      }}
      hasMore={
        unviewedFeedbackState.documents.length ===
          unviewedFeedbackState.limit ||
        ongoingState.documents.length === ongoingState.limit
      }
      hideIfEmpty
      LoadingCardProps={{ maxSkills: 0 }}
    />
  );
  const allCardGrid = (
    <CardGrid
      key="all-card-grid"
      header="All Assessments"
      route={ROUTES.ASSESSMENTS_ALL}
      cardProps={allState.documents}
      cardGenerator={x => generateAssessmentCard(x, { user })}
      loading={allState.loading}
      loadMore={page => {
        allDispatch({ type: 'more' });
      }}
      hasMore={allState.documents.length === allState.limit}
      animationOffset={1}
      filterIds={user.touchedAssessments}
      deprioritiseByIndustry
      LoadingCardProps={{ maxSkills: 0 }}
    />
  );
  const completedCardGrid = (
    <CardGrid
      key="completed-card-grid"
      header="Completed Assessments"
      route={ROUTES.ASSESSMENTS_COMPLETED}
      cardProps={completedState.documents}
      cardGenerator={x => generateAssessmentCard(x, { showUpdatedAt: true })}
      loading={completedState.loading}
      loadMore={page => {
        completedDispatch({ type: 'more' });
      }}
      hasMore={completedState.documents.length === completedState.limit}
      animationOffset={2}
      LoadingCardProps={{ maxSkills: 0 }}
      EmptyStateProps={{
        graphic: LightbulbBrain,
        graphicWidth: 100,
        message:
          'Show off your super-skills by completing assessments and they’ll appear here',
      }}
    />
  );

  // Show only one CardGrid if a match exists and don't query collections
  // not displayed, based on match
  let contents = null;
  if (match.params && match.params.filter) {
    switch (match.params.filter) {
      case 'ongoing':
        contents = ongoingCardGrid;
        if (!unviewedFeedbackState.path)
          unviewedFeedbackDispatch(DISPATCH_PROPS.UNVIEWED_FEEDBACK(user));
        if (!ongoingState.path) ongoingDispatch(DISPATCH_PROPS.ONGOING(user));
        break;
      case 'all':
        contents = allCardGrid;
        if (!allState.path) allDispatch(DISPATCH_PROPS.ALL());
        break;
      case 'completed':
        contents = completedCardGrid;
        if (!completedState.path)
          completedDispatch(DISPATCH_PROPS.COMPLETED(user));
        break;
      // Otherwise, this category does not exist.
      // It might be an assessment ID, so try to redirect to there.
      default:
        return (
          <Redirect
            to={location.pathname.replace(
              ROUTES.ASSESSMENTS,
              ROUTES.ASSESSMENT
            )}
          />
        );
    }
  } else {
    contents = [ongoingCardGrid, allCardGrid, completedCardGrid];
    if (!unviewedFeedbackState.path)
      unviewedFeedbackDispatch(DISPATCH_PROPS.UNVIEWED_FEEDBACK(user));
    if (!ongoingState.path) ongoingDispatch(DISPATCH_PROPS.ONGOING(user));
    if (!allState.path) allDispatch(DISPATCH_PROPS.ALL());
    if (!completedState.path) completedDispatch(DISPATCH_PROPS.COMPLETED(user));
  }

  return <main className={classes.root}>{contents}</main>;
};

AssessmentsContainer.propTypes = {
  /** From React Router. Used to show only a specific grid using the URL:
   * /assessments/:filter
   */
  match: PropTypes.object.isRequired,
};

export default withRouter(AssessmentsContainer);
