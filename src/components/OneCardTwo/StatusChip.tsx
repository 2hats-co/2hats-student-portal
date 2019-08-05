import React from 'react';

import { makeStyles, createStyles, Chip } from '@material-ui/core';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      borderRadius: theme.shape.borderRadius,
      height: 21,
      cursor: 'inherit',

      ...theme.typography.overline,
      lineHeight: 'inherit',

      backgroundColor: (props: any) => {
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
      color: (props: any) => {
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
      padding: theme.spacing(0, 1.2, 0, 1.5),
    },
  })
);

export interface StatusChipProps {
  label?: React.ReactNode;
  /** Different presentational styles */
  variant?: 'fail' | 'pass' | 'submitted' | 'new' | 'ongoing' | 'closed';
}

/**
 * Displays a customised [`Chip`](https://material-ui.com/components/chips/)
 * showing the status of the card.
 */
const StatusChip: React.FC<StatusChipProps> = ({ label, variant }) => {
  const classes = useStyles({ variant });

  // If no label, still return a div for correct positioning of action button
  if (!label) return <div />;

  return <Chip size="small" label={label} classes={classes} />;
};

export default StatusChip;
