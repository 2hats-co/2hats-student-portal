import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';
import { CardMedia } from '@material-ui/core';

import { MEDIA_HEIGHT } from './index';
import { getIndustryGradient } from 'utilities/cards';

const useStyles = makeStyles(theme => ({
  root: {
    height: MEDIA_HEIGHT,

    position: 'relative',

    '&::before, &::after': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },

    backgroundImage: ({ gradient }) =>
      `linear-gradient(120deg, ${
        gradient.colors.length > 1
          ? gradient.colors.join(', ')
          : gradient.colors[0] + ', ' + gradient.colors[0]
      })`,

    '&::after': {
      backgroundColor: ({ gradient }) => gradient.baseColor,
      mixBlendMode: 'lighten',
    },

    // Dark theme
    opacity: theme.palette.type === 'dark' ? 0.75 : 1,
  },

  img: {
    mixBlendMode: 'multiply',
    filter: 'grayscale(100%)',

    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
}));

/**
 * Displays a 16:9 image on the top of the card using
 * [`CardMedia`](https://material-ui.com/api/card-media/).
 *
 * Uses `industry` prop to get correct gradient colours with
 * `getIndustryGradient` utility for duotone effect.
 */
const CardImage = ({ src, industry }) => {
  const gradient = getIndustryGradient(industry);
  const classes = useStyles({ gradient });

  return (
    <div className={classes.root}>
      <CardMedia image={src} className={classes.img} />
    </div>
  );
};

CardImage.propTypes = {
  src: PropTypes.string.isRequired,
  industry: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
};

export default CardImage;
