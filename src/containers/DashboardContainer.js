import React from 'react';
import PropTypes from 'prop-types';

import Slide from '@material-ui/core/Slide';

import withNavigation from '../components/withNavigation';
import OneCard from '../components/OneCard';

const DashboardContainer = props => {
  const { className } = props;

  return (
    <Slide direction="up" in>
      <div className={className} style={{ padding: 1 }}>
        <OneCard />
        <div>delet</div>
        <div>delet</div>
        <div>delet</div>
        <div>delet</div>
        <div>delet</div>
        <div>delet</div>
        <div>delet</div>
        <div>delet</div>
        <div>delet</div>
        <div>delet</div>
        <div>delet</div>
        <div>delet</div>
        <div>delet</div>
        <div>delet</div>
        <div>delet</div>
        <div>delet</div>
        <div>delet</div>
        <div>delet</div>
        <div>delet</div>
        <div>delet</div>
        <div>delet</div>
        <div>delet</div>
        <div>delet</div>
        <div>delet</div>
        <div>delet</div>
        <div>delet</div>
        <div>delet</div>
        <div>delet</div>
        <div>delet</div>
        <div>delet</div>
        <div>delet</div>
        <div>delet</div>
        <div>delet</div>
        <div>delet</div>
        <div>delet</div>
        <div>delet</div>
        <div>delet</div>
        <div>delet</div>
        <div>delet</div>
        <div>delet</div>
        <div>delet</div>
        <div>delet</div>
        <div>delet</div>
        <div>delet</div>
        <div>delet</div>
        <div>delet</div>
        <div>delet</div>
        <div>delet</div>
        <div>delet</div>
        <div>delet</div>
        <div>delet</div>
        <div>delet</div>
        <div>delet</div>
        <div>delet</div>
        <div>delet</div>
        <div>delet</div>
      </div>
    </Slide>
  );
};

DashboardContainer.propTypes = {
  className: PropTypes.string,
};

export default withNavigation(DashboardContainer);
