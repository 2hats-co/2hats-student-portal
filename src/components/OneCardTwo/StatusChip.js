import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';
import { Chip } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: theme.shape.borderRadius,
    height: 21,
    cursor: 'inherit',

    ...theme.typography.overline,

    backgroundColor: props => {
      switch (props.variant) {
        case 'fail':
          return theme.palette.text.primary;
        case 'pass':
          return theme.palette.primary.main;
        case 'submitted':
          return theme.palette.primary[300];
        case 'new':
          return theme.palette.primary.light;
        case 'ongoing':
          return theme.palette.grey[500];
        case 'closed':
        default:
          return theme.palette.action.disabledBackground;
      }
    },
    color: props => {
      switch (props.variant) {
        case 'fail':
        case 'pass':
        case 'submitted':
        case 'ongoing':
          return theme.palette.background.paper;
        case 'new':
          return theme.palette.primary.main;
        case 'closed':
        default:
          return theme.palette.text.disabled;
      }
    },
  },
  label: {
    padding: theme.spacing(0, 1.5),
  },
}));

/**
 * Displays a customised [`Chip`](https://material-ui.com/components/chips/)
 * showing the status of the card.
 */
const StatusChip = ({ label, variant }) => {
  const classes = useStyles({ variant });

  // If no label, still return a div for correct positioning of action button
  if (!label) return <div />;

  return <Chip size="small" label={label} classes={classes} />;
};

StatusChip.propTypes = {
  label: PropTypes.node,
  /** Different presentational styles */
  variant: PropTypes.oneOf([
    'fail',
    'pass',
    'submitted',
    'new',
    'ongoing',
    'closed',
  ]),
};

export default StatusChip;
