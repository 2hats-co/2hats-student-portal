import React from 'react';
import PropTypes from 'prop-types';

import Slide from '@material-ui/core/Slide';

import withNavigation from '../components/withNavigation';
import ContainerHeader from '../components/ContainerHeader';

const AssessmentsContainer = props => {
  const { isMobile } = props;

  return (
    <Slide direction="up" in>
      <ContainerHeader
        title="Assessments"
        subtitle="Get yourself certified with these assessments"
        isMobile={isMobile}
      />
    </Slide>
  );
};

AssessmentsContainer.propTypes = {
  isMobile: PropTypes.bool.isRequired,
};

export default withNavigation(AssessmentsContainer);
