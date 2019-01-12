import React from 'react';

import Slide from '@material-ui/core/Slide';

import withNavigation from '../components/withNavigation';

const DashboardContainer = () => {
  return (
    <Slide direction="up" in>
      <div>delet</div>
    </Slide>
  );
};

export default withNavigation(DashboardContainer);
