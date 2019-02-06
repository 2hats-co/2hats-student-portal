import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import withNavigation from '../components/withNavigation';
import WhatsNext from '../components/WhatsNext';
import ContainerHeader from '../components/ContainerHeader';
import useWindowSize from '../hooks/useWindowSize';
import Cards, { getNumCards, getCardsWidth } from '../components/Cards';
import { COLLECTIONS } from '@bit/sidney2hats.2hats.global.common-constants';

const styles = theme => ({
  secondaryCardsWrapper: {
    margin: '0 auto',
  },
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
    cols: cardsCols,
    useCollectionInit: {
      path: COLLECTIONS.courses,
      limit: cardsCols + 1,
    },
  };
  const secondary = [
    {
      title: 'Jobs',
      mapping: 'job',
      cols: 1,
      useCollectionInit: {
        path: COLLECTIONS.jobs,
        limit: 2,
      },
      inline: true,
    },
    {
      title: 'Assessments',
      mapping: 'assessment',
      cols: 1,
      useCollectionInit: {
        path: COLLECTIONS.assessments,
        limit: 2,
      },
      inline: true,
    },
    {
      title: 'Events',
      mapping: 'event',
      cols: 1,
      useCollectionInit: {
        path: COLLECTIONS.events,
        limit: 2,
      },
      inline: true,
    },
  ];

  return (
    <div>
      <ContainerHeader
        isMobile={isMobile}
        title={`Hi, ${user.firstName}!`}
        maxWidth={getCardsWidth(cardsCols)}
      />
      <WhatsNext user={user} width={getCardsWidth(cardsCols)} />

      <Cards {...primary} />

      <Grid
        container
        alignItems="flex-start"
        justify="center"
        className={classes.secondaryCardsWrapper}
        style={{ width: getCardsWidth(cardsCols) }}
      >
        <Cards {...secondary[0]} />
        <Cards {...secondary[1]} />
        <Cards {...secondary[2]} />
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
