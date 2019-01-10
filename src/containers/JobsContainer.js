import React from 'react';

import withNavigation from '../components/withNavigation';
import ContainerHeader from '../components/ContainerHeader';

const JobsContainer = () => {
  return (
    <ContainerHeader
      title="Jobs"
      subtitle="Here are our currently available jobs"
    />
  );
};

export default withNavigation(JobsContainer);
