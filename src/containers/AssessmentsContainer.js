import React from 'react';

import withNavigation from '../components/withNavigation';
import ContainerHeader from '../components/ContainerHeader';

const AssessmentsContainer = () => {
  return (
    <ContainerHeader
      title="Assessments"
      subtitle="Get yourself certified with these assessments"
    />
  );
};

export default withNavigation(AssessmentsContainer);
