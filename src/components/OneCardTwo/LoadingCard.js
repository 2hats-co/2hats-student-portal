import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/styles';
import { Card, CardActions, CardContent, Typography } from '@material-ui/core';
import { fade } from '@material-ui/core/styles';

import { CARD_WIDTH, CARD_SPACING, MEDIA_HEIGHT } from 'constants/cards';

const useStyles = makeStyles(theme => ({
  root: {
    width: `calc(100% - ${CARD_SPACING}px)`,
    maxWidth: CARD_WIDTH,
    margin: CARD_SPACING / 2,

    userSelect: 'none',

    display: 'flex',
    flexDirection: 'column',

    animationName: '$fade-in',
    animationDuration: theme.transitions.duration.standard,
    animationTimingFunction: theme.transitions.easing.easeIn,
    animationFillMode: 'both',
  },
  '@keyframes fade-in': {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },

  animated: {
    backgroundColor: fade(theme.palette.divider, 0.04),
    backgroundImage: `linear-gradient(to right, ${fade(
      theme.palette.divider,
      0
    )} 0%, ${fade(theme.palette.divider, 0.06)} 15%, ${fade(
      theme.palette.divider,
      0
    )} 30%)`,
    backgroundSize: `800px auto`,

    animationName: '$loading-shimmer',
    animationDuration: '1.25s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'linear',
    animationFillMode: 'forwards',

    borderRadius: theme.shape.borderRadius,
  },
  '@keyframes loading-shimmer': {
    from: { backgroundPosition: '-468px 0' },
    to: { backgroundPosition: '468px 0' },
  },

  media: {
    height: MEDIA_HEIGHT,
    borderRadius: 0,
  },

  content: {
    paddingTop: theme.spacing(1.5),
    flex: 1,
  },

  meta: {
    lineHeight: 16 / 12,
    color: theme.palette.text.disabled,
  },

  titleGrid: {
    height: 56 - 6,
    marginBottom: theme.spacing(1),
  },
  title: { lineHeight: '24px' },

  skillsList: { marginTop: theme.spacing(2) },

  cardActions: {
    boxSizing: 'border-box',
    height: 50,
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1, 0, 2),
  },
}));

/**
 * Drop-in, metric-compatible replacement for
 * [`OneCardTwo`](#section-onecardtwo).
 * Used to show the card is loading. Fades into view.
 */
const LoadingCard = ({ className, style, hideMedia, maxSkills }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} style={style} elevation={3}>
      {/* Card image */}
      {!hideMedia && <div className={clsx(classes.media, classes.animated)} />}

      <CardContent className={classes.content}>
        {/* Meta */}
        <Typography
          variant="overline"
          component="div"
          gutterBottom
          className={clsx(classes.meta, classes.animated)}
          style={{ width: '40%' }}
        >
          &nbsp;
        </Typography>

        {/* Title */}
        <div className={classes.titleGrid}>
          <Typography
            variant="h6"
            component="div"
            className={clsx(classes.title, classes.animated)}
            style={{ width: '60%' }}
          >
            &nbsp;
          </Typography>
        </div>

        {/* Description */}
        <div style={{ height: 80 }}>
          <Typography
            variant="body2"
            component="div"
            gutterBottom
            className={classes.animated}
          >
            &nbsp;
          </Typography>
          <Typography
            variant="body2"
            component="div"
            gutterBottom
            className={classes.animated}
            style={{ width: '90%' }}
          >
            &nbsp;
          </Typography>
          <Typography
            variant="body2"
            component="div"
            className={classes.animated}
            style={{ width: '95%' }}
          >
            &nbsp;
          </Typography>
        </div>

        {/* Skills list */}
        {maxSkills > 0 && (
          <div
            className={classes.skillsList}
            style={{ height: maxSkills <= 1 ? 58 : 88 }}
          >
            <Typography
              variant="overline"
              component="div"
              gutterBottom
              className={clsx(classes.meta, classes.animated)}
              style={{ width: '45%' }}
            >
              &nbsp;
            </Typography>
            <Typography
              variant="body2"
              component="div"
              gutterBottom
              className={classes.animated}
              style={{ width: '50%' }}
            >
              &nbsp;
            </Typography>
          </div>
        )}
      </CardContent>

      {/* Status & Action */}
      <CardActions className={classes.cardActions}>
        <div
          className={classes.animated}
          style={{ width: '33%', height: 21 }}
        />
      </CardActions>
    </Card>
  );
};

LoadingCard.propTypes = {
  /** Optional override */
  className: PropTypes.string,
  /** Optional override */
  styles: PropTypes.object,
  /** Optionally, hide media */
  hideMedia: PropTypes.bool,
  /** Number of rows for skillsList */
  maxSkills: PropTypes.number,
};
LoadingCard.defaultProps = {
  hideMedia: false,
  maxSkills: 2,
};

export default LoadingCard;
