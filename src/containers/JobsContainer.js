import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/styles';

import CardGrid from 'components/CardGrid';

import UserContext from 'contexts/UserContext';
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

const JobsContainer = ({ match }) => {
  const classes = useStyles();
  const { user } = useContext(UserContext);

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
      cardProps={prioritiseJobListings(newState.documents, user).map(x =>
        generateJobCard(x, { user })
      )}
      filterIds={user.touchedJobs}
      loading={newState.loading}
      LoadingCardProps={{ hideMedia: true }}
      hideIfEmpty
    />
  );
  const yoursCardGrid = (
    <CardGrid
      key="yours-card-grid"
      header="Your Job Applications"
      route={ROUTES.JOBS_YOURS}
      cardProps={yoursState.documents.map(x =>
        generateJobCard(x, { showUpdatedAt: true, user })
      )}
      loading={yoursState.loading}
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
      cardProps={pastState.documents.map(x => generateJobCard(x, { user }))}
      loading={pastState.loading}
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
      // We shouldn't reach this default case.
      // match.params.filter would not be a key in match.params
      default:
        break;
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
