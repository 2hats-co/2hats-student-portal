import React from 'react';
import PropTypes from 'prop-types';

// import Grid from '@material-ui/core/Grid';
import Slide from '@material-ui/core/Slide';

import withNavigation from '../components/withNavigation';
import ContainerHeader from '../components/ContainerHeader';
import useWindowSize from '../hooks/useWindowSize';
import Cards, { getNumCards } from '../components/Cards';

const DashboardContainer = props => {
  const { className, isMobile } = props;

  const windowSize = useWindowSize();
  const cardsCols = getNumCards(windowSize.width, isMobile);

  return (
    <Slide direction="up" in>
      <div className={className}>
        <ContainerHeader isMobile={isMobile} title="Dashboard" />
        <Cards cols={cardsCols} title="Test cards" />
      </div>
    </Slide>
  );
};

DashboardContainer.propTypes = {
  className: PropTypes.string,
  isMobile: PropTypes.bool.isRequired,
};

export default withNavigation(DashboardContainer);
