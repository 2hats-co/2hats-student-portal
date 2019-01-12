import React from 'react';
import PropTypes from 'prop-types';

import Slide from '@material-ui/core/Slide';

import withNavigation from '../components/withNavigation';
import ContainerHeader from '../components/ContainerHeader';

const CoursesContainer = props => {
  const { isMobile } = props;

  return (
    <Slide direction="up" in>
      <ContainerHeader
        title="Courses"
        subtitle="Can we call this courses instead of Education? Education kept on confusing me"
        isMobile={isMobile}
      />
    </Slide>
  );
};

CoursesContainer.propTypes = {
  isMobile: PropTypes.bool.isRequired,
};

export default withNavigation(CoursesContainer);
