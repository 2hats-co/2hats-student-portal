import React from 'react';

import Slide from '@material-ui/core/Slide';

import withNavigation from '../components/withNavigation';
import ContainerHeader from '../components/ContainerHeader';

const JobsContainer = () => {
  return (
    <Slide direction="up" in>
      <ContainerHeader
        title="Jobs"
        subtitle="Here are our currently available jobs"
      />
    </Slide>
  );
};

export default withNavigation(JobsContainer);
