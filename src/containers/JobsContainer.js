import React from 'react';
import PropTypes from 'prop-types';

import Slide from '@material-ui/core/Slide';

import withNavigation from '../components/withNavigation';
import ContainerHeader from '../components/ContainerHeader';

const JobsContainer = props => {
  const { className, isMobile } = props;

  return (
    <Slide direction="up" in>
      <div className={className}>
        <ContainerHeader
          title="Jobs"
          subtitle="Here are our currently available jobs"
          isMobile={isMobile}
        />
      </div>
    </Slide>
  );
};

JobsContainer.propTypes = {
  className: PropTypes.string,
  isMobile: PropTypes.bool.isRequired,
};

export default withNavigation(JobsContainer);
