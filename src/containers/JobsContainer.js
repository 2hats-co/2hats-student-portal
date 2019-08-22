import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';

import { makeStyles } from '@material-ui/styles';

import CardGrid from 'components/CardGrid';

import { useUser } from 'contexts/UserContext';
import useCollection from 'hooks/useCollection';
import { generateJobCard, prioritiseJobListings } from 'utilities/cards';

import { COLLECTIONS } from '@bit/twohats.common.constants';
import * as ROUTES from 'constants/routes';

const useStyles = makeStyles(() => ({
  root: {
    // Prevent scrollbar appearing during card animations in Firefox on Windows
    overflow: 'hidden',
  },
}));

const DISPATCH_PROPS = {
  NEW: () => ({
    path: COLLECTIONS.jobs,
    sort: { field: 'closingDate', direction: 'asc' },
    filters: [
      { field: 'published', operator: '==', value: true },
      // Can't have filters on *both* createdAt and closingDate
      // {
      //   field: 'createdAt',
      //   operator: '>=',
      //   value: moment()
      //     .subtract(2, 'weeks')
      //     .toDate(),
      // },
      { field: 'closingDate', operator: '>', value: new Date() },
    ],
  }),
  YOURS: user => ({
    path: `${COLLECTIONS.users}/${user.id}/${COLLECTIONS.jobs}`,
    sort: { field: 'updatedAt', direction: 'desc' },
    //filters: [{ field: 'completed', operator: '==', value: false }],
  }),
  PAST: () => ({
    path: COLLECTIONS.jobs,
    sort: [
      { field: 'closingDate', direction: 'desc' },
      { field: 'createdAt', direction: 'desc' },
    ],
    filters: [
      { field: 'published', operator: '==', value: true },
      { field: 'closingDate', operator: '<=', value: new Date() },
    ],
  }),
};

const JobsContainer = ({ match, location }) => {
  const classes = useStyles();
  const { user } = useUser();

  // Change tab title
  useEffect(() => {
    if (match.params && match.params.filter) {
      switch (match.params.filter) {
        case 'new':
          document.title = 'New Jobs – 2hats';
          break;
        case 'yours':
          document.title = 'Your Job Applications – 2hats';
          break;
        case 'past':
          document.title = 'Past Jobs – 2hats';
          break;
        default:
          break;
      }
    } else document.title = 'Jobs – 2hats';
  }, [match]);

  // Set up empty useCollection queries to be filled in depending on match
  const [newState, newDispatch] = useCollection();
  const [yoursState, yoursDispatch] = useCollection();
  const [pastState, pastDispatch] = useCollection();

  // Store CardGrids here
  const newCardGrid = (
    <CardGrid
      key="new-card-grid"
      header="New Jobs"
      route={ROUTES.JOBS_NEW}
      cardProps={prioritiseJobListings(newState.documents, user)}
      cardGenerator={x => generateJobCard(x, { user })}
      filterIds={user.touchedJobs}
      loading={newState.loading}
      loadMore={page => {
        newDispatch({ type: 'more' });
      }}
      hasMore={newState.documents.length === newState.limit}
      LoadingCardProps={{ hideMedia: true }}
      hideIfEmpty
    />
  );
  const yoursCardGrid = (
    <CardGrid
      key="yours-card-grid"
      header="Your Job Applications"
      route={ROUTES.JOBS_YOURS}
      cardProps={yoursState.documents}
      cardGenerator={x => generateJobCard(x, { showUpdatedAt: true, user })}
      loading={yoursState.loading}
      loadMore={page => {
        yoursDispatch({ type: 'more' });
      }}
      hasMore={yoursState.documents.length === yoursState.limit}
      LoadingCardProps={{ hideMedia: true }}
      animationOffset={2}
      hideIfEmpty
    />
  );
  const pastCardGrid = (
    <CardGrid
      key="past-card-grid"
      header="Past Jobs"
      route={ROUTES.JOBS_PAST}
      cardProps={pastState.documents}
      cardGenerator={x => generateJobCard(x, { user })}
      loading={pastState.loading}
      loadMore={page => {
        pastDispatch({ type: 'more' });
      }}
      hasMore={pastState.documents.length === pastState.limit}
      LoadingCardProps={{ hideMedia: true }}
      animationOffset={1}
      filterIds={user.touchedJobs}
      deprioritiseByIndustry
    />
  );

  // Show only one CardGrid if a match exists and don't query collections
  // not displayed, based on match
  let contents = null;
  if (match.params && match.params.filter) {
    switch (match.params.filter) {
      case 'new':
        contents = newCardGrid;
        if (!newState.path) newDispatch(DISPATCH_PROPS.NEW(user));
        break;
      case 'yours':
        contents = yoursCardGrid;
        if (!yoursState.path) yoursDispatch(DISPATCH_PROPS.YOURS(user));
        break;
      case 'past':
        contents = pastCardGrid;
        if (!pastState.path) pastDispatch(DISPATCH_PROPS.PAST());
        break;
      // Otherwise, this category does not exist.
      // It might be an assessment ID, so try to redirect to there.
      default:
        return (
          <Redirect to={location.pathname.replace(ROUTES.JOBS, ROUTES.JOB)} />
        );
    }
  } else {
    contents = [newCardGrid, yoursCardGrid, pastCardGrid];
    if (!newState.path) newDispatch(DISPATCH_PROPS.NEW(user));
    if (!yoursState.path) yoursDispatch(DISPATCH_PROPS.YOURS(user));
    if (!pastState.path) pastDispatch(DISPATCH_PROPS.PAST());
  }

  return <main className={classes.root}>{contents}</main>;
};

JobsContainer.propTypes = {
  /** From React Router. Used to show only a specific grid using the URL:
   * /courses/:filter
   */
  match: PropTypes.object.isRequired,
};

export default withRouter(JobsContainer);
