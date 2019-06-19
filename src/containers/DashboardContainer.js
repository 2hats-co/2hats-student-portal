import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import JobsIcon from '@material-ui/icons/BusinessCenterOutlined';
import AssessmentsIcon from '@material-ui/icons/AssignmentOutlined';
import CoursesIcon from '@material-ui/icons/SchoolOutlined';

import ContainerHeader from '../components/ContainerHeader';
// import Milestones from '../components/Milestones';
import WhatsNext from '../components/WhatsNext';
import Announcement from '../components/Announcement';
import Cards from '../components/Cards';

import useWindowSize from '../hooks/useWindowSize';
import UserContext from 'contexts/UserContext';
import { getNumCards, getCardsWidth } from '../components/Cards';
import * as ROUTES from '../constants/routes';
import { COLLECTIONS } from '@bit/sidney2hats.2hats.global.common-constants';

const styles = theme => ({
  root: { paddingBottom: theme.spacing(4) },

  wrapper: {
    margin: '0 auto',
    maxWidth: '100vw',
  },
});

const DashboardContainer = props => {
  const { classes, isMobile } = props;

  const { user } = useContext(UserContext);

  const windowSize = useWindowSize();
  const cardsCols = getNumCards(windowSize.width, isMobile);

  useEffect(() => {
    document.title = '2hats – Dashboard';
  }, []);

  const cards = (interest, numberOfCards) => {
    switch (interest) {
      case 'courses':
        return {
          title: 'Courses',
          mapping: 'course',
          cols:
            numberOfCards > 1
              ? cardsCols > 1
                ? Math.min(numberOfCards, cardsCols)
                : 2
              : 1,
          useCollectionInit: {
            path: COLLECTIONS.courses,
            limit: numberOfCards,
            sort: { field: 'ranking', direction: 'asc' },
            filters: [{ field: 'published', operator: '==', value: true }],
          },
          filterIds: user.touchedCourses,
          Icon: CoursesIcon,
          route: ROUTES.COURSES,
          noneLeftMsg: 'There are no more courses available at the moment',
        };
      case 'assessments':
        return {
          title: 'Tasks',
          mapping: 'assessment',
          cols:
            numberOfCards > 1
              ? cardsCols > 1
                ? Math.min(numberOfCards, cardsCols)
                : 2
              : 1,
          useCollectionInit: {
            path: COLLECTIONS.assessments,
            limit: numberOfCards,
            sort: { field: 'createdAt', direction: 'desc' },
            filters: [{ field: 'published', operator: '==', value: true }],
          },
          filterIds: user.touchedAssessments,
          Icon: AssessmentsIcon,
          route: ROUTES.ASSESSMENTS,
          noneLeftMsg: 'There are no more tasks available at the moment',
        };
      case 'jobs':
      default:
        return {
          title: 'Jobs',
          mapping: 'job',
          cols:
            numberOfCards > 1
              ? cardsCols > 1
                ? Math.min(numberOfCards, cardsCols)
                : 2
              : 1,
          useCollectionInit: {
            path: COLLECTIONS.jobs,
            limit: numberOfCards,
            sort: { field: 'createdAt', direction: 'desc' },
            filters: [{ field: 'published', operator: '==', value: true }],
          },
          filterIds: user.touchedJobs,
          Icon: JobsIcon,
          route: ROUTES.JOBS,
          noneLeftMsg: 'There are no more jobs available at the moment',
        };
    }
  };

  let primary;
  let secondary;

  switch (user.interest) {
    case 'courses':
      primary = cards(user.interest, 3);
      secondary = [cards('assessments', 2), cards('jobs', 1)];
      break;

    case 'assessments':
      primary = cards(user.interest, 3);
      secondary = [cards('courses', cardsCols === 2 ? 1 : 2), cards('jobs', 1)];
      break;

    case 'jobs':
    default:
      primary = cards('jobs', 3);
      secondary = [cards('assessments', 2), cards('courses', 1)];
      break;
  }

  return (
    <div className={classes.root}>
      <ContainerHeader
        isMobile={isMobile}
        title={`Hi, ${user.firstName.trim()}!`}
        maxWidth={getCardsWidth(cardsCols)}
      />
      {/* <Milestones
        user={user}
        width={getCardsWidth(cardsCols)}
        isMobile={isMobile}
      /> */}
      {/* <Announcement width={getCardsWidth(cardsCols)} /> */}
      {/* <WhatsNext user={user} width={getCardsWidth(cardsCols)} /> */}

      <div
        style={{ width: getCardsWidth(cardsCols) }}
        className={classes.wrapper}
      >
        <Cards
          {...primary}
          // yourBackup={user.id}
          hideMore
          extra
        />
      </div>

      <Grid
        container
        className={classes.wrapper}
        style={{ width: getCardsWidth(cardsCols) }}
        direction={cardsCols < 2 ? 'column' : 'row'}
        wrap="nowrap"
      >
        <Cards
          {...secondary[0]}
          //yourBackup={user.id}
          hideMore
        />
        <Cards
          {...secondary[1]}
          //yourBackup={user.id}
          hideMore
        />
      </Grid>
    </div>
  );
};

DashboardContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  isMobile: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};

export default withStyles(styles)(DashboardContainer);
