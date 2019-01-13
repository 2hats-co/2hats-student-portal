import React from 'react';
import PropTypes from 'prop-types';

import Slide from '@material-ui/core/Slide';

import withNavigation from '../components/withNavigation';
import ContainerHeader from '../components/ContainerHeader';

const AssessmentsContainer = props => {
  const { className, isMobile } = props;

  return (
    <Slide direction="up" in>
      <div className={className}>
        <ContainerHeader
          title="Assessments"
          subtitle="Get yourself certified with these assessments"
          isMobile={isMobile}
        />
      </div>
    </Slide>
  );
};

AssessmentsContainer.propTypes = {
  className: PropTypes.string,
  isMobile: PropTypes.bool.isRequired,
};

export default withNavigation(AssessmentsContainer);
