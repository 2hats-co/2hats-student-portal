import React from 'react';
import PropTypes from 'prop-types';

import Slide from '@material-ui/core/Slide';

import withNavigation from '../components/withNavigation';
import ContainerHeader from '../components/ContainerHeader';

const CoursesContainer = props => {
  const { className, isMobile } = props;

  return (
    <Slide direction="up" in>
      <div className={className}>
        <ContainerHeader
          title="Courses"
          subtitle="Can we call this courses instead of Education? Education kept on confusing me"
          isMobile={isMobile}
        />
      </div>
    </Slide>
  );
};

CoursesContainer.propTypes = {
  className: PropTypes.string,
  isMobile: PropTypes.bool.isRequired,
};

export default withNavigation(CoursesContainer);
