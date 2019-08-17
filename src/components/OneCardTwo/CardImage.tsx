import React from 'react';
import clsx from 'clsx';

import { makeStyles, createStyles, CardMedia } from '@material-ui/core';

import { MEDIA_HEIGHT } from 'constants/cards';
import { getIndustryGradient } from 'utilities/cards';
import { INDUSTRIES } from '@bit/twohats.common.constants';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      height: MEDIA_HEIGHT,

      position: 'relative',

      // Use pseudo-elements for duotone effect
      '&::before, &::after': {
        content: '""',
        display: 'block',
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      },

      backgroundImage: ({ gradient }: any) =>
        `linear-gradient(120deg, ${
          gradient.colors.length > 1
            ? gradient.colors.join(', ')
            : gradient.colors[0] + ', ' + gradient.colors[0]
        })`,

      '&::after': {
        backgroundColor: ({ gradient }: any) => gradient.baseColor,
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
  })
);

export interface CardImageProps {
  /** Optional style override for the root component */
  className?: string;
  /** Image URL */
  src: string;
  /** Industry as a string or array of strings */
  industry: INDUSTRIES | INDUSTRIES[];
}

/**
 * Displays a 16:9 image on the top of the card using
 * [`CardMedia`](https://material-ui.com/api/card-media/).
 *
 * Uses `industry` prop to get correct gradient colours with
 * `getIndustryGradient` utility for duotone effect.
 */
const CardImage: React.FC<CardImageProps> = ({ className, src, industry }) => {
  const gradient = getIndustryGradient(industry);
  const classes = useStyles({ gradient });

  return (
    <div className={clsx(classes.root, className)}>
      <CardMedia image={src} className={classes.img} />
    </div>
  );
};

export default CardImage;
