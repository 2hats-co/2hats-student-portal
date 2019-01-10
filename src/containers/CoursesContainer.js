import React from 'react';

import withNavigation from '../components/withNavigation';
import ContainerHeader from '../components/ContainerHeader';

const CoursesContainer = () => {
  return (
    <ContainerHeader
      title="Courses"
      subtitle="Can we call this courses instead of Education? Education kept on confusing me"
    />
  );
};

export default withNavigation(CoursesContainer);
