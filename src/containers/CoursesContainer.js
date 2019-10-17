import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import CardGrid from 'components/CardGrid';

import { useUser } from 'contexts/UserContext';
import useCollection from 'hooks/useCollection';
import { generateCourseCard } from 'utilities/cards';

import { COLLECTIONS } from '@bit/twohats.common.constants';
import * as ROUTES from 'constants/routes';

const DISPATCH_PROPS = {
  ONGOING: user => ({
    path: `${COLLECTIONS.users}/${user.id}/${COLLECTIONS.courses}`,
    sort: { field: 'updatedAt', direction: 'desc' },
    filters: [{ field: 'completed', operator: '==', value: false }],
  }),
  ALL: () => ({
    path: COLLECTIONS.courses,
    sort: { field: 'createdAt', direction: 'desc' },
    filters: [{ field: 'published', operator: '==', value: true }],
  }),
  COMPLETED: user => ({
    path: `${COLLECTIONS.users}/${user.id}/${COLLECTIONS.courses}`,
    sort: { field: 'updatedAt', direction: 'desc' },
    filters: [{ field: 'completed', operator: '==', value: true }],
  }),
};

const CoursesContainer = ({ match }) => {
  const { user } = useUser();

  // Change tab title
  useEffect(() => {
    if (match.params && match.params.filter) {
      switch (match.params.filter) {
        case 'ongoing':
          document.title = 'Ongoing Courses – 2hats';
          break;
        case 'all':
          document.title = 'All Courses – 2hats';
          break;
        case 'completed':
          document.title = 'Completed Courses – 2hats';
          break;
        default:
          break;
      }
    } else document.title = 'Courses – 2hats';
  }, [match]);

  // Set up empty useCollection queries to be filled in depending on match
  const [ongoingState, ongoingDispatch] = useCollection();
  const [allState, allDispatch] = useCollection();
  const [completedState, completedDispatch] = useCollection();

  // Store CardGrids here
  const ongoingCardGrid = (
    <CardGrid
      key="ongoing-card-grid"
      header="Ongoing Courses"
      route={ROUTES.COURSES_ONGOING}
      cardProps={ongoingState.documents}
      cardGenerator={x => generateCourseCard(x, { showUpdatedAt: true })}
      LoadingCardProps={{ maxSkills: 1 }}
      loading={ongoingState.loading}
      loadMore={page => {
        ongoingDispatch({ type: 'more' });
      }}
      hasMore={ongoingState.documents.length === ongoingState.limit}
      hideIfEmpty
    />
  );
  const allCardGrid = (
    <CardGrid
      key="all-card-grid"
      header="All Courses"
      route={ROUTES.COURSES_ALL}
      cardProps={allState.documents}
      cardGenerator={x => generateCourseCard(x)}
      loading={allState.loading}
      loadMore={page => {
        allDispatch({ type: 'more' });
      }}
      hasMore={allState.documents.length === allState.limit}
      animationOffset={1}
      LoadingCardProps={{ maxSkills: 1 }}
      filterIds={user.touchedCourses}
      deprioritiseByIndustry
    />
  );
  const completedCardGrid = (
    <CardGrid
      key="completed-card-grid"
      header="Completed Courses"
      route={ROUTES.COURSES_COMPLETED}
      cardProps={completedState.documents}
      cardGenerator={x => generateCourseCard(x, { showUpdatedAt: true })}
      loading={completedState.loading}
      loadMore={page => {
        completedDispatch({ type: 'more' });
      }}
      hasMore={completedState.documents.length === completedState.limit}
      LoadingCardProps={{ maxSkills: 1 }}
      animationOffset={2}
      hideIfEmpty
    />
  );

  // Show only one CardGrid if a match exists and don't query collections
  // not displayed, based on match
  let contents = null;
  if (match.params && match.params.filter) {
    switch (match.params.filter) {
      case 'ongoing':
        contents = ongoingCardGrid;
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
      // We shouldn't reach this default case.
      // match.params.filter would not be a key in match.params
      default:
        break;
    }
  } else {
    contents = [ongoingCardGrid, allCardGrid, completedCardGrid];
    if (!ongoingState.path) ongoingDispatch(DISPATCH_PROPS.ONGOING(user));
    if (!allState.path) allDispatch(DISPATCH_PROPS.ALL());
    if (!completedState.path) completedDispatch(DISPATCH_PROPS.COMPLETED(user));
  }

  return <main>{contents}</main>;
};

CoursesContainer.propTypes = {
  /** From React Router. Used to show only a specific grid using the URL:
   * /courses/:filter
   */
  match: PropTypes.object.isRequired,
};

export default withRouter(CoursesContainer);
