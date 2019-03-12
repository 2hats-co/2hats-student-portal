import React from 'react';

import { withRouter } from 'react-router-dom';

import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';
import withTheme from '@material-ui/core/styles/withTheme';
import Button from '@material-ui/core/Button';
import BackIcon from '@material-ui/icons/ArrowBackIos';

const BackButton = props => {
  const { theme, className, history, location, route, label } = props;

  const isLg = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <Button
      id="back"
      onClick={() => {
        history.push(route || location.pathname);
      }}
      color="primary"
      className={className}
      style={{
        textTransform: 'capitalize',
        position: isLg ? 'fixed' : 'relative',
      }}
    >
      <BackIcon style={{ margin: 0 }} />
      {label || 'Back'}
    </Button>
  );
};

export default withRouter(withTheme()(BackButton));
