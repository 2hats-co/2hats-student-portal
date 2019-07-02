import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';

import PersonArmsOnHips from 'assets/images/graphics/PersonArmsOnHips.svg';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(0, 3, 3),
    textAlign: 'center',
    userSelect: 'none',
  },

  graphic: {
    userDrag: 'none',
    width: ({ graphicWidth }) => graphicWidth,
    marginBottom: theme.spacing(1),
  },

  message: {
    maxWidth: 300,
    margin: '0 auto',
  },
}));

const EmptyState = ({ graphic, graphicWidth, message }) => {
  const classes = useStyles({ graphicWidth });

  return (
    <div className={classes.root}>
      <img src={graphic} alt="2hats" className={classes.graphic} />
      <Typography
        variant="body1"
        className={classes.message}
        color="textSecondary"
      >
        {message}
      </Typography>
    </div>
  );
};

EmptyState.propTypes = {
  /** URL to graphic image */
  graphic: PropTypes.string,
  /** Optionally, change the width */
  graphicWidth: PropTypes.number,
  /** Set the message to display underneath the graphic */
  message: PropTypes.node,
};

EmptyState.defaultProps = {
  graphic: PersonArmsOnHips,
  graphicWidth: 30,
  message: 'Hmm… there seems to be nothing here',
};

export default EmptyState;
