import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core';
import {
  useMediaQuery,
  Grid,
  Typography,
  Button,
  IconButton,
  Chip,
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { fade } from '@material-ui/core/styles';
import GoIcon from '@bit/twohats.common.icons.go';

import { CARD_COLS_MEDIA_QUERIES, CARD_SPACING } from 'constants/cards';
import { IS_MOBILE_QUERY } from 'constants/layout';
import { INITIAL_LIMIT } from 'hooks/useCollection';

const useStyles = makeStyles(theme => ({
  root: {
    userSelect: 'none',

    [IS_MOBILE_QUERY]: {
      position: 'sticky',
      top: 0,
      backgroundColor: fade(
        theme.palette.background.default,
        theme.palette.type === 'dark' ? 0.8 : 0.85
      ),

      backdropFilter: 'saturate(180%) blur(20px)',
      zIndex: 1,

      transition: theme.transitions.create('top', {
        duration: theme.transitions.duration.short,
      }),

      'body.mobilenav-show &': {
        // From MUI source code: https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/styles/createMixins.js
        top: 56,
        [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
          top: 48,
        },
        [theme.breakpoints.up('sm')]: {
          top: 64,
        },
      },
    },
  },

  grid: {
    ...theme.mixins.toolbar,

    textDecoration: 'none', // Fix for Link component
    color: theme.palette.text.primary, // Allows Typography to inherit color
  },

  content: {
    marginLeft: 'auto',
    marginRight: 'auto',

    // Align horizontally with card ends
    paddingLeft: theme.spacing(CARD_SPACING / 8 / 2),
  },

  // Styles for Link
  link: {
    color: theme.palette.text.primary,
    transition: theme.transitions.create('color', {
      duration: theme.transitions.duration.short,
    }),

    '&:hover': {
      color: theme.palette.primary.main,

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

  button: {},

  iconButtonGo: { 'svg&': { marginLeft: '0 !important' } }, // Stop Go icon from adding left padding

  header: { display: 'inline-block' },
  lengthChip: {
    minWidth: 24,
    height: 24,
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
  /** Whether or not cards are loading */
  loading?: boolean;
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
  loading = false,
}) => {
  const classes = useStyles();

  const showButtonLabel = useMediaQuery(CARD_COLS_MEDIA_QUERIES[2]);
  const showLink = showPreviewOnly && length > 0;

  if (loading)
    return (
      <header className={classes.root}>
        <Grid
          container
          alignItems="center"
          className={clsx(
            classes.grid,
            classes.content,
            'width-fixed-cards-cols'
          )}
        >
          <Skeleton width={120} />
        </Grid>
      </header>
    );

  return (
    <>
      <header className={classes.root}>
        <Grid
          container
          justify="space-between"
          alignItems="center"
          className={clsx(
            classes.grid,
            classes.content,
            'width-fixed-cards-cols',
            showLink && classes.link
          )}
          component={showLink ? Link : 'div'}
          to={showLink ? route : undefined}
        >
          <Grid item xs>
            <Typography
              variant="h6"
              component="h1"
              color="inherit"
              className={classes.header}
            >
              {header}
            </Typography>

            {length > 0 && !hideCount && !description && (
              <Chip
                label={`${length}${length === maxCount ? '+' : ''}`}
                size="small"
                className={classes.lengthChip}
              />
            )}
          </Grid>

          {showLink &&
            (showButtonLabel ? (
              <Button color="primary" className={classes.button}>
                {routeLabel || 'Show All'}
                <GoIcon />
              </Button>
            ) : (
              <IconButton
                color="primary"
                size="small"
                className={classes.button}
              >
                <GoIcon className={classes.iconButtonGo} />
              </IconButton>
            ))}
        </Grid>
      </header>

      {description && (
        <Typography
          variant="body2"
          color="textSecondary"
          paragraph
          className={clsx(classes.content, 'width-fixed-cards-cols')}
        >
          {description}
        </Typography>
      )}
    </>
  );
};

export default CardGridHeader;
