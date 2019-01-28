import React from 'react';

import { withRouter } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import BackIcon from '@material-ui/icons/ArrowBackRounded';

const BackButton = props => (
  <Button
    onClick={() => {
      props.history.push(props.location.pathName);
    }}
    color="primary"
    className={props.className}
  >
    <BackIcon style={{ marginLeft: 0, marginRight: 4 }} />
    Back
  </Button>
);

export default withRouter(BackButton);
