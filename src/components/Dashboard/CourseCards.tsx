import React from 'react';

import CardGrid from 'components/CardGrid';

import { useUser } from 'contexts/UserContext';
import useCollection from 'hooks/useCollection';
import { getPrioritisedCards, generateCourseCard } from 'utilities/cards';
import * as ROUTES from 'constants/routes';
import { COLLECTIONS } from '@bit/twohats.common.constants';
import { DocWithId, UsersDoc } from '@bit/twohats.common.db-types';

const DISPATCH_PROPS = {
  ONGOING: (user: DocWithId<UsersDoc>) => ({
    path: `${COLLECTIONS.users}/${user.id}/${COLLECTIONS.courses}`,
    sort: { field: 'updatedAt', direction: 'desc' },
    filters: [{ field: 'completed', operator: '==', value: false }],
    limit: 5,
  }),
  ALL: () => ({
    path: COLLECTIONS.courses,
    sort: { field: 'createdAt', direction: 'desc' },
    filters: [{ field: 'published', operator: '==', value: true }],
  }),
  COMPLETED: (user: DocWithId<UsersDoc>) => ({
    path: `${COLLECTIONS.users}/${user.id}/${COLLECTIONS.courses}`,
    sort: { field: 'updatedAt', direction: 'desc' },
    filters: [{ field: 'completed', operator: '==', value: true }],
    limit: 5,
  }),
};

/**
 * Same as [`AssessmentCards`](#assessmentcards)
 *
 * ### Priority:
 *
 * 1. Ongoing courses
 * 2. All other courses, prioritised by industry
 * 3. Completed courses
 */
const CourseCards: React.FunctionComponent = () => {
  const { user } = useUser();

  const [ongoingState] = useCollection(DISPATCH_PROPS.ONGOING(user));
  const ongoingCards = ongoingState.documents;

  const [allState, allDispatch] = useCollection();
  const allCards = getPrioritisedCards(allState.documents, user).sortedCards;

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
      key="courses-card-grid"
      header="Courses"
      hideCount
      loading={loading}
      route={ROUTES.COURSES}
      cardProps={combinedCards}
      cardGenerator={x => generateCourseCard(x)}
      LoadingCardProps={{ maxSkills: 1 }}
    />
  );
};

export default CourseCards;
