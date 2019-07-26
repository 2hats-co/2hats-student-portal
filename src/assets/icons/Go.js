import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/styles';
import GoIcon from '@material-ui/icons/KeyboardArrowRight';

const useStyles = makeStyles(() => ({
  root: {
    marginLeft: 4,
    'svg&': { marginLeft: '4px !important', },
  },
}));

const Go = ({ className, style }) => {
  const classes = useStyles();
  return (
    <GoIcon
      className={clsx(classes.root, className)}
      style={style}
      color="inherit"
    />
  );
};

Go.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
};

export default Go;
