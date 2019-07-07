import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Grid,
  Typography,
  Button,
} from '@material-ui/core';

import GoIcon from '@material-ui/icons/KeyboardArrowRight';

import CardImage from './CardImage';
import VideoPopup from './VideoPopup';
import CardIcon from './CardIcon';
import CardDescription from './CardDescription';
import SkillsList from './SkillsList';
import StatusChip from './StatusChip';

import { CARD_WIDTH, CARD_SPACING } from 'constants/cards';
import { getIndustryDisplayName } from 'utilities/cards';

const useStyles = makeStyles(theme => ({
  root: {
    width: CARD_WIDTH,
    margin: CARD_SPACING / 2,

    // On smaller widths, take up as much space as possible
    [`@media (max-width: ${CARD_WIDTH + CARD_SPACING - 1}px)`]: {
      width: `calc(100% - ${CARD_SPACING}px)`,
    },

    // Fix Link default styling
    display: 'block',
    textDecoration: 'none',

    transition: theme.transitions.create(['box-shadow', 'transform']),

    // Stay above app bar when not scrolled down
    position: 'relative',
    zIndex: 1,

    '&:hover': {
      boxShadow: theme.shadows[8],
      transform: 'translateY(-8px) scale(1)',
      '@media (prefers-reduced-motion: reduce)': { transform: 'none' },
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      transform: 'translateY(2px) scale(0.99)',
      transitionDuration: theme.transitions.duration.shortest,
      '@media (prefers-reduced-motion: reduce)': { transform: 'none' },
    },
  },

  content: { paddingTop: theme.spacing(1.5) },

  metaGrid: { marginBottom: theme.spacing(0.25) },
  meta: {
    lineHeight: 16 / 12,
    color: theme.palette.text.disabled,
  },

  titleGrid: {
    height: 56,
    marginBottom: theme.spacing(1),
  },
  title: { lineHeight: '24px' },

  cardActions: {
    boxSizing: 'border-box',
    height: 50,
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1, 0, 2),
  },
  actionButton: {
    backgroundColor: 'transparent !important',
    '& svg': { marginLeft: theme.spacing(0.25) },
  },

  animatedActionButton: {
    animationName: '$bounce-alpha',
    animationDuration: '1.6s',
    animationIterationCount: 'infinite',
    animationTimingFunction: theme.transitions.easing.easeInOut,
  },
  '@keyframes bounce-alpha': {
    '0%': { opacity: 1, transform: ' translateX(0px) scale(1)' },
    '25%': { opacity: 0, transform: 'translateX(10px) scale(0.9)' },
    '26%': { opacity: 0, transform: 'translateX(-10px) scale(0.9)' },
    '55%': { opacity: 1, transform: ' translateX(0px) scale(1)' },
  },
}));

const getIndustry = industry => {
  if (Array.isArray(industry))
    return industry.map(x => getIndustryDisplayName(x)).join(' / ');
  return getIndustryDisplayName(industry);
};

const OneCardTwo = ({
  className,
  style,
  title,
  industry,
  time,
  description,
  skills,
  skillsHeader,
  maxSkills,
  status,
  media,
  icon,
  route,
  action,
  animatedActionButton,
}) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} style={style} elevation={3}>
      {/* Card video - stays outside CardActionArea */}
      {media && media.type === 'video' && (
        <VideoPopup
          src={media.src}
          title={title}
          route={route}
          action={action}
        />
      )}

      <CardActionArea component={Link} to={route}>
        {/* Card image */}
        {media && media.type === 'image' && (
          <CardImage src={media.src} industry={industry} />
        )}

        <CardContent className={classes.content}>
          {/* Meta */}
          <Grid
            container
            justify="space-between"
            wrap="nowrap"
            className={classes.metaGrid}
          >
            <Typography variant="overline" className={classes.meta}>
              {getIndustry(industry)}
            </Typography>
            <Typography variant="overline" className={classes.meta}>
              {time}
            </Typography>
          </Grid>

          {/* Title */}
          <Grid
            container
            wrap="nowrap"
            spacing={1}
            className={classes.titleGrid}
            alignItems="center"
          >
            <Grid item xs>
              <Typography variant="h6" component="h2" className={classes.title}>
                {title}
              </Typography>
            </Grid>
            <Grid item>
              <CardIcon icon={icon} industry={industry} />
            </Grid>
          </Grid>

          {/* Description */}
          <CardDescription description={description} />

          {/* Skills list */}
          {Array.isArray(skills) && (
            <SkillsList
              skills={skills}
              skillsHeader={skillsHeader}
              maxSkills={maxSkills}
            />
          )}
        </CardContent>

        {/* Status & Action */}
        <CardActions className={classes.cardActions}>
          <StatusChip {...status} />
          <Button
            size="small"
            color="primary"
            disableRipple
            component="div"
            className={classes.actionButton}
          >
            {action}
            <GoIcon
              className={clsx(
                animatedActionButton && classes.animatedActionButton
              )}
            />
          </Button>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

OneCardTwo.propTypes = {
  /** Optional override to card root */
  className: PropTypes.string,
  /** Optional override to card root */
  styles: PropTypes.object,

  title: PropTypes.node.isRequired,

  /** Supply a single industry or an array of industries.
   * Used to display the correct gradient(s) and icon(s).
   */
  industry: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  /** Used to display approximate duration or closing date */
  time: PropTypes.node.isRequired,

  /** Shows the description as plain text. Strips HTML tags */
  description: PropTypes.node.isRequired,

  /** Use an empty array [] to still show the correct spacing */
  skills: PropTypes.arrayOf(
    PropTypes.shape({
      /** Assessment/skill ID */
      id: PropTypes.string.isRequired,
      /** Assessment/skill title to prevent querying for this information */
      title: PropTypes.string.isRequired,
    })
  ),
  /** String appended to [`SkillsList`](#skillslist) header */
  skillsHeader: PropTypes.node,
  /** Show single-height SkillsList with `maxSkills={1}` */
  maxSkills: PropTypes.number,

  /** Used to display [`StatusChip`](#statuschip) in bottom-left */
  status: PropTypes.shape({
    label: PropTypes.node.isRequired,
    /** Different presentational styles */
    variant: PropTypes.oneOf([
      'fail',
      'pass',
      'submitted',
      'new',
      'ongoing',
      'closed',
    ]),
  }),

  media: PropTypes.shape({
    /** Either `'image'` or `'video'` */
    type: PropTypes.oneOf(['image', 'video']).isRequired,
    /** Image src or video embed URL */
    src: PropTypes.string.isRequired,
  }),
  /** Supply `'industry'` to show industry icon or an image URL */
  icon: PropTypes.oneOfType([PropTypes.oneOf(['industry']), PropTypes.string]),

  /** Route to go to when card is clicked */
  route: PropTypes.string.isRequired,
  /** Label for bottom-right action button */
  action: PropTypes.node.isRequired,
  /** Animate action button go icon */
  animatedActionButton: PropTypes.bool,
};
OneCardTwo.defaultProps = {
  animatedActionButton: false,
};

export default OneCardTwo;