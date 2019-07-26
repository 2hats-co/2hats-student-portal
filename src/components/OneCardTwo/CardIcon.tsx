import React from 'react';

import { makeStyles, createStyles, Avatar } from '@material-ui/core';

import { INDUSTRIES, INDUSTRY_ICONS } from 'constants/cards';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      width: 48,
      height: 48,
      position: 'relative',
    },

    colorDefault: {
      backgroundColor: 'transparent',
      color: theme.palette.text.secondary,
      marginRight: theme.spacing(-1.5),
      overflow: 'visible',
    },

    img: {
      backgroundColor: theme.palette.common.white,
      // Dark theme
      opacity: theme.palette.type === 'dark' ? 0.75 : 1,
    },

    icon1: {
      position: 'absolute',
      bottom: 6,
      left: 0,
      zIndex: 0,

      backgroundColor: theme.palette.background.paper,
      boxShadow: `0 0 0 1px ${theme.palette.background.paper}`,
      borderRadius: theme.shape.borderRadius,
    },
    icon2: {
      position: 'absolute',
      top: 6,
      right: 12,
      zIndex: -1,

      color: theme.palette.text.disabled,
    },
  })
);

export interface CardIconProps {
  /** Supply `'industry'` to show industry icon or an image URL */
  icon?: 'industry' | string;
  industry?: INDUSTRIES | INDUSTRIES[];
}

/**
 * Displays an image (typically company logo) cropped into a circle or the
 * corresponding industry icon.
 *
 * Fixed size: 48x48
 *
 * If there are multiple industries, the primary industry (`industry[0]`)
 * overlaps the secondary.
 */
const CardIcon: React.FC<CardIconProps> = ({ icon, industry }) => {
  const classes = useStyles();

  // Show industry icon
  if (icon === 'industry' && industry) {
    let icons = null;
    if (!Array.isArray(industry)) {
      const Icon = INDUSTRY_ICONS[industry];
      icons = <Icon />;
    } else if (industry.length === 1) {
      const Icon = INDUSTRY_ICONS[industry[0]];
      icons = <Icon />;
    } else {
      const Icon1 = INDUSTRY_ICONS[industry[0]];
      const Icon2 = INDUSTRY_ICONS[industry[1]];
      icons = (
        <>
          <Icon1 className={classes.icon1} />
          <Icon2 className={classes.icon2} />
        </>
      );
    }

    return (
      <Avatar
        classes={{ root: classes.root, colorDefault: classes.colorDefault }}
      >
        {icons}
      </Avatar>
    );
  }

  // Show logo
  return (
    <Avatar
      classes={{
        root: classes.root,
        colorDefault: classes.colorDefault,
        img: classes.img,
      }}
      src={icon}
    />
  );
};

export default CardIcon;
