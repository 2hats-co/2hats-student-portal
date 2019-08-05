import React, { useContext } from 'react';

import CardGrid from 'components/CardGrid';
import LightbulbBrain from 'assets/images/graphics/LightbulbBrain.svg';

import UserContext from 'contexts/UserContext';
import useCollection from 'hooks/useCollection';
import { getPrioritisedCards, generateAssessmentCard } from 'utilities/cards';
import * as ROUTES from 'constants/routes';
import { COLLECTIONS } from '@bit/twohats.common.constants';

const DISPATCH_PROPS = {
  UNVIEWED_FEEDBACK: user => ({
    path: `${COLLECTIONS.users}/${user.id}/${COLLECTIONS.assessments}`,
    sort: { field: 'updatedAt', direction: 'desc' },
    filters: [
      { field: 'viewedFeedback', operator: '==', value: false },
      { field: 'screened', operator: '==', value: true },
    ],
    limit: 5,
  }),
  ONGOING: user => ({
    path: `${COLLECTIONS.users}/${user.id}/${COLLECTIONS.assessments}`,
    sort: { field: 'updatedAt', direction: 'desc' },
    filters: [{ field: 'submitted', operator: '==', value: false }],
    limit: 5,
  }),
  ALL: () => ({
    path: COLLECTIONS.assessments,
    sort: { field: 'createdAt', direction: 'desc' },
    filters: [{ field: 'published', operator: '==', value: true }],
    // limit: 5,
    // Cannot have limit here, otherwise deprioritisation by industry will not
    // work
  }),
  COMPLETED: user => ({
    path: `${COLLECTIONS.users}/${user.id}/${COLLECTIONS.assessments}`,
    sort: { field: 'updatedAt', direction: 'desc' },
    filters: [{ field: 'submitted', operator: '==', value: true }],
    limit: 5,
  }),
};

/**
 * Displays a [`CardGrid`](#section-cardgrid) with a maximum of five cards,
 * but requires exactly five to display.
 *
 * ### Priority:
 *
 * 1. Assessments with unviewed feedback
 * 2. Ongoing assessments
 * 3. All other assessments, prioritised by industry
 * 4. Completed assessments
 *
 * ### Optimisation
 *
 * Start with `unviewedFeedback` query, then keep adding via dispatch until we
 * have all five cards. So it will only add more queries when there aren’t
 * enough cards to display
 */
const AssessmentCards = () => {
  const { user } = useContext(UserContext);

  const [unviewedFeedbackState] = useCollection(
    DISPATCH_PROPS.UNVIEWED_FEEDBACK(user)
  );
  const unviewedFeedbackCards = unviewedFeedbackState.documents;

  const [ongoingState, ongoingDispatch] = useCollection();
  const ongoingCards = ongoingState.documents;

  const [allState, allDispatch] = useCollection();
  const allCards = getPrioritisedCards(allState.documents, user).sortedCards;

  const [completedState, completedDispatch] = useCollection();
  const completedCards = completedState.documents;

  const combinedCards = [
    ...unviewedFeedbackCards,
    ...ongoingCards,
    ...allCards,
    ...completedCards,
  ];

  // Set loading to last used query, unless if it doesn't load enough cards
  let loading = unviewedFeedbackState.loading;
  // Call extra queries here, if needed
  if (combinedCards.length < 5) {
    loading = true;
    if (!unviewedFeedbackState.loading && !ongoingState.path)
      ongoingDispatch(DISPATCH_PROPS.ONGOING(user));
    else if (!ongoingState.loading && !allState.path)
      allDispatch(DISPATCH_PROPS.ALL());
    else if (!allState.loading && !completedState.path) {
      completedDispatch(DISPATCH_PROPS.COMPLETED(user));
      loading = completedState.loading;
    }
  }

  return (
    <CardGrid
      key="assessments-card-grid"
      header="Assessments"
      hideCount
      loading={loading}
      route={ROUTES.ASSESSMENTS}
      cardProps={combinedCards}
      cardGenerator={x => generateAssessmentCard(x)}
      LoadingCardProps={{ maxSkills: 0 }}
      EmptyStateProps={{
        graphic: LightbulbBrain,
        graphicWidth: 100,
        message:
          'Show off your super-skills by completing assessments and they’ll appear here',
      }}
    />
  );
};

export default AssessmentCards;
