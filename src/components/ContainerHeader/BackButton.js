import React from 'react';

import { withRouter } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import BackIcon from '@material-ui/icons/ArrowBackIos';

const BackButton = props => {
  const { className, history, location, label } = props;

  return (
    <Button
      onClick={() => {
        history.push(location.pathname);
      }}
      color="primary"
      className={className}
      style={{ textTransform: 'capitalize' }}
    >
      <BackIcon style={{ margin: 0 }} />
      {label || location.pathname.replace('/', '')}
    </Button>
  );
};

export default withRouter(BackButton);
