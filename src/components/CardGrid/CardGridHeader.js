import React from 'react';
import PropTypes from 'prop-types';
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
import GoIcon from 'assets/icons/Go';

import { CARD_SPACING, CARD_COLS_MEDIA_QUERIES } from 'constants/cards';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: 36, // Height of Show All button

    // Align horizontally with card ends
    paddingLeft: theme.spacing(CARD_SPACING / 8 / 2),
    marginBottom: theme.spacing(0.5),

    userSelect: 'none',
  },

  // Styles for Link
  link: {
    transition: theme.transitions.create('color', {
      duration: theme.transitions.duration.short,
    }),
    '&:hover': {
      color: theme.palette.primary.main,

      '& $lengthChip': {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.main,
      },
    },
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

const CardGridHeader = ({
  header,
  route,
  routeLabel,
  showPreviewOnly,
  description,
  length,
  hideCount,
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
        component={showLink ? Link : 'div'}
        to={route}
        className={clsx(
          classes.grid,
          showLink && classes.link,
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
            <Chip label={length} size="small" className={classes.lengthChip} />
          )}
        </Grid>
        {showLink &&
          (showButtonLabel ? (
            <Button color="primary">
              {routeLabel || 'Show All'}
              <GoIcon />
            </Button>
          ) : (
            <IconButton color="primary" className={classes.iconButton}>
              <GoIcon />
            </IconButton>
          ))}
      </Grid>
    </header>
  );
};

CardGridHeader.propTypes = {
  /** Header text for the card */
  header: PropTypes.node.isRequired,
  /** Route used as link for Show All button */
  route: PropTypes.string.isRequired,
  /** Optionally, override the route label */
  routeLabel: PropTypes.node,
  /** Calculated in CardGrid. Used to show the Show All button */
  showPreviewOnly: PropTypes.bool.isRequired,
  /** Optional description text for the card */
  description: PropTypes.node,
  /** Number of cards total. If `length === 0`, also hide Show All button */
  length: PropTypes.number.isRequired,
  /** Optionally, hide the count */
  hideCount: PropTypes.bool,
};

export default CardGridHeader;
