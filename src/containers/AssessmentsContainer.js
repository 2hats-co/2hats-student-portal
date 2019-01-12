import React from 'react';

import Slide from '@material-ui/core/Slide';

import withNavigation from '../components/withNavigation';
import ContainerHeader from '../components/ContainerHeader';

const AssessmentsContainer = () => {
  return (
    <Slide direction="up" in>
      <ContainerHeader
        title="Assessments"
        subtitle="Get yourself certified with these assessments"
      />
    </Slide>
  );
};

export default withNavigation(AssessmentsContainer);
