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
import { fade } from '@material-ui/core/styles';
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

  // Styles for Link
  link: {
    '& a': {
      color: theme.palette.text.primary,
      textDecoration: 'none',

      transition: theme.transitions.create('color', {
        duration: theme.transitions.duration.short,
      }),
    },
    '&:hover': {
      '& a': { color: theme.palette.primary.main },
      // Show the same thing as button hover
      '& $button': {
        backgroundColor: fade(
          theme.palette.primary.main,
          theme.palette.action.hoverOpacity
        ),
      },

      '& $lengthChip': {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.main,
      },
    },
  },

  button: {
    'a&': {
      color: theme.palette.primary.main,
      transition: theme.transitions.create('background-color', {
        duration: theme.transitions.duration.short,
      }),
    },
  },

  iconButton: { margin: '-3px 0' }, // Stop IconButton making header larger
  iconButtonGo: { 'svg&': { marginLeft: '0 !important' } }, // Stop Go icon from adding left padding

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
          !showButtonLabel && classes.hideButtonLabel,
          showLink && classes.link
        )}
      >
        <Grid item xs component={showLink ? Link : 'div'} to={route}>
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
            <Button
              color="primary"
              component={Link}
              to={route}
              className={classes.button}
            >
              {routeLabel || 'Show All'}
              <GoIcon />
            </Button>
          ) : (
            <IconButton
              color="primary"
              component={Link}
              to={route}
              size="small"
              className={clsx(classes.button, classes.iconButton)}
            >
              <GoIcon className={classes.iconButtonGo} />
            </IconButton>
          ))}
      </Grid>
    </header>
  );
};

export default CardGridHeader;
