import React from 'react';

import { withRouter } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import BackIcon from '@material-ui/icons/ArrowBackRounded';

const BackButton = props => (
  <Button
    onClick={() => {
      props.history.goBack();
    }}
    color="primary"
    className={props.className}
  >
    <BackIcon />
    Back
  </Button>
);

export default withRouter(BackButton);
