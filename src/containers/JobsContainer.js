import React from 'react';
import PropTypes from 'prop-types';

import Slide from '@material-ui/core/Slide';

import withNavigation from '../components/withNavigation';
import ContainerHeader from '../components/ContainerHeader';

const JobsContainer = props => {
  const { isMobile } = props;

  return (
    <Slide direction="up" in>
      <ContainerHeader
        title="Jobs"
        subtitle="Here are our currently available jobs"
        isMobile={isMobile}
      />
    </Slide>
  );
};

JobsContainer.propTypes = {
  isMobile: PropTypes.bool.isRequired,
};

export default withNavigation(JobsContainer);
