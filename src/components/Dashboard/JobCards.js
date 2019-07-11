import React, { useContext } from 'react';

import CardGrid from 'components/CardGrid';

import UserContext from 'contexts/UserContext';
import useCollection from 'hooks/useCollection';
import { prioritiseJobListings, generateJobCard } from 'utilities/cards';
import * as ROUTES from 'constants/routes';
import { COLLECTIONS } from '@bit/twohats.common.constants';

const DISPATCH_PROPS = {
  ONGOING: user => ({
    path: `${COLLECTIONS.users}/${user.id}/${COLLECTIONS.jobs}`,
    sort: { field: 'updatedAt', direction: 'desc' },
    filters: [{ field: 'outcome', operator: '==', value: 'pending' }],
    limit: 5,
  }),
  ALL: () => ({
    path: COLLECTIONS.jobs,
    sort: { field: 'closingDate', direction: 'desc' },
    filters: [{ field: 'published', operator: '==', value: true }],
  }),
  COMPLETED: user => ({
    path: `${COLLECTIONS.users}/${user.id}/${COLLECTIONS.jobs}`,
    sort: [
      { field: 'outcome', direction: 'desc' },
      { field: 'updatedAt', direction: 'desc' },
    ],
    filters: [{ field: 'outcome', operator: '<', value: 'pending' }],
    limit: 5,
  }),
};

/**
 * Same as [`AssessmentCards`](#assessmentcards)
 *
 * ### Priority:
 *
 * 1. Ongoing job applications (no feedback)
 * 2. All other jobs, prioritised by industry and sorted by `closingDate`
 *    (open jobs, ascending *then* closed jobs, descending)
 * 3. Completed job applications
 */
const JobCards = () => {
  const { user } = useContext(UserContext);

  const [ongoingState] = useCollection(DISPATCH_PROPS.ONGOING(user));
  const ongoingCards = ongoingState.documents;

  const [allState, allDispatch] = useCollection();
  const allCards = prioritiseJobListings(allState.documents, user);

  const [completedState, completedDispatch] = useCollection();
  const completedCards = completedState.documents;

  const combinedCards = [...ongoingCards, ...allCards, ...completedCards];

  // Set loading to last used query, unless if it doesn't load enough cards
  let loading = ongoingState.loading;
  // Call extra queries here, if needed
  if (combinedCards.length < 5) {
    loading = true;
    if (!ongoingState.loading && !allState.path)
      allDispatch(DISPATCH_PROPS.ALL());
    else if (!allState.loading && !completedState.path) {
      completedDispatch(DISPATCH_PROPS.COMPLETED(user));
      loading = completedState.loading;
    }
  }

  return (
    <CardGrid
      key="jobs-card-grid"
      header="Jobs"
      hideCount
      loading={loading}
      route={ROUTES.JOBS}
      cardProps={combinedCards.map(x => generateJobCard(x, { user }))}
      LoadingCardProps={{ hideMedia: true }}
    />
  );
};

export default JobCards;
