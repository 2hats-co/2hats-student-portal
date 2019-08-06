import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core';
import {
  Grid,
  Typography,
  Button,
  IconButton,
  Chip,
  useMediaQuery,
} from '@material-ui/core';
import GoIcon from '@bit/twohats.common.icons.go';

import { CARD_SPACING, CARD_COLS_MEDIA_QUERIES } from 'constants/cards';
import { INITIAL_LIMIT } from 'hooks/useCollection';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: 36, // Height of Show All button

    // Align horizontally with card ends
    paddingLeft: theme.spacing(CARD_SPACING / 8 / 2),
    marginBottom: theme.spacing(0.5),

    userSelect: 'none',
  },

  grid: {
    textDecoration: 'none', // Fix for Link component
    color: theme.palette.text.primary, // Allows Typography to inherit color
  },
  hideButtonLabel: {
    marginBottom: theme.spacing(-0.75), // Optically align icon button & header
  },

  header: { display: 'inline-block' },
  lengthChip: {
    marginLeft: theme.spacing(1.5),
    verticalAlign: 'bottom',
    fontWeight: theme.typography.fontWeightMedium,
    cursor: 'inherit',
    backgroundColor: theme.palette.divider,

    transition: theme.transitions.create(['background-color', 'color'], {
      duration: theme.transitions.duration.short,
    }),
  },
}));

export interface ICardGridHeaderProps {
  /** Header text for the card */
  header: React.ReactNode;
  /** Route used as link for Show All button */
  route: string;
  /** Optionally, override the route label */
  routeLabel?: React.ReactNode;
  /** Calculated in CardGrid. Used to show the Show All button */
  showPreviewOnly: boolean;
  /** Optional description text for the card */
  description?: React.ReactNode;
  /** Number of cards total. If `length === 0`, also hide Show All button */
  length: number;
  /** Optionally, hide the count */
  hideCount?: boolean;
  /** Number at which the count will show + at the end */
  maxCount?: number;
}

const CardGridHeader: React.FunctionComponent<ICardGridHeaderProps> = ({
  header,
  route,
  routeLabel,
  showPreviewOnly,
  description,
  length,
  hideCount,
  maxCount = INITIAL_LIMIT,
}) => {
  const classes = useStyles();

  const showButtonLabel = useMediaQuery(CARD_COLS_MEDIA_QUERIES[2]);

  if (description)
    return (
      <header className={classes.root}>
        <Typography variant="h6" component="h1" color="inherit" gutterBottom>
          {header}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {description}
        </Typography>
      </header>
    );

  const showLink = showPreviewOnly && length > 0;

  return (
    <header className={classes.root}>
      <Grid
        container
        justify="space-between"
        alignItems={showButtonLabel ? 'baseline' : 'center'}
        className={clsx(
          classes.grid,
          !showButtonLabel && classes.hideButtonLabel
        )}
      >
        <Grid item>
          <Typography
            variant="h6"
            component="h1"
            color="inherit"
            className={classes.header}
          >
            {header}
          </Typography>
          {length > 0 && !hideCount && (
            <Chip
              label={`${length}${length === maxCount ? '+' : ''}`}
              size="small"
              className={classes.lengthChip}
            />
          )}
        </Grid>
        {showLink &&
          (showButtonLabel ? (
            <Button color="primary" component={Link} to={route}>
              {routeLabel || 'Show All'}
              <GoIcon />
            </Button>
          ) : (
            <IconButton color="primary" component={Link} to={route}>
              <GoIcon />
            </IconButton>
          ))}
      </Grid>
    </header>
  );
};

export default CardGridHeader;
