import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import PaddedIcon from '../components/PaddedIcon';
import JobsIcon from '@material-ui/icons/BusinessCenterOutlined';
import AssessmentsIcon from '@material-ui/icons/AssignmentOutlined';
import CoursesIcon from '@material-ui/icons/SchoolOutlined';

import withNavigation from '../components/withNavigation';
import ContainerHeader from '../components/ContainerHeader';
import WhatsNext from '../components/WhatsNext';
import Cards from '../components/Cards';

import useWindowSize from '../hooks/useWindowSize';
import { getNumCards, getCardsWidth } from '../components/Cards';
import * as ROUTES from '../constants/routes';
import { COLLECTIONS } from '@bit/sidney2hats.2hats.global.common-constants';

const styles = theme => ({
  root: { paddingBottom: theme.spacing.unit * 4 },

  secondaryWrapper: { margin: '0 auto' },
});

const DashboardContainer = props => {
  const { classes, isMobile, user } = props;

  const windowSize = useWindowSize();
  const cardsCols = getNumCards(windowSize.width, isMobile);

  useEffect(() => {
    document.title = '2hats – Dashboard';
  }, []);

  const primary = {
    title: 'Courses',
    mapping: 'course',
    cols: cardsCols > 1 ? cardsCols : 2,
    useCollectionInit: {
      path: COLLECTIONS.courses,
      limit: 3,
    },
    filterIds: user.touchedCourses,
    icon: <CoursesIcon />,
    route: ROUTES.COURSES,
  };
  const secondary = [
    {
      title: 'Assessments',
      mapping: 'assessment',
      cols: 2,
      useCollectionInit: {
        path: COLLECTIONS.assessments,
        limit: 2,
      },
      filterIds: user.touchedAssessments,
      icon: <AssessmentsIcon />,
      route: ROUTES.ASSESSMENTS,
    },
    {
      title: 'Jobs',
      mapping: 'job',
      cols: 1,
      useCollectionInit: {
        path: COLLECTIONS.jobs,
        limit: 1,
      },
      filterIds: user.touchedJobs,
      icon: <JobsIcon />,
      route: ROUTES.JOBS,
      noneLeftMsg: 'There are no more jobs available at the moment',
    },
  ];

  return (
    <div className={classes.root}>
      <ContainerHeader
        isMobile={isMobile}
        title={`Hi, ${user.firstName}!`}
        maxWidth={getCardsWidth(cardsCols)}
      />
      <WhatsNext user={user} width={getCardsWidth(cardsCols)} />

      <Cards {...primary} yourBackup={user.id} hideMore />

      <Grid
        container
        className={classes.secondaryWrapper}
        style={{ width: getCardsWidth(cardsCols) }}
        wrap="nowrap"
      >
        <Cards {...secondary[0]} yourBackup={user.id} hideMore />
        <Cards {...secondary[1]} yourBackup={user.id} hideMore />
      </Grid>
    </div>
  );
};

DashboardContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  isMobile: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};

export default withNavigation(withStyles(styles)(DashboardContainer));
