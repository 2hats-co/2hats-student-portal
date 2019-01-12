import React from 'react';

import Slide from '@material-ui/core/Slide';

import withNavigation from '../components/withNavigation';
import ContainerHeader from '../components/ContainerHeader';

const CoursesContainer = () => {
  return (
    <Slide direction="up" in>
      <ContainerHeader
        title="Courses"
        subtitle="Can we call this courses instead of Education? Education kept on confusing me"
      />
    </Slide>
  );
};

export default withNavigation(CoursesContainer);
