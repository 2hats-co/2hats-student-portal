import React from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import ArrowForwardIcon from '@material-ui/icons/ArrowForwardRounded';

const CARD_WIDTH = 320;
const MEDIA_HEIGHT = CARD_WIDTH * 0.5625;

const styles = theme => ({
  root: {
    transition: theme.transitions.create(['box-shadow', 'transform']),
    margin: theme.spacing.unit,
    width: CARD_WIDTH,

    '&:hover': {
      boxShadow: theme.shadows[24],
      transform: 'translateY(-4px)',
    },
  },

  cardActionArea: {
    height: '100%',
    transition: theme.transitions.create('background-color', {
      duration: theme.transitions.duration.shortest,
    }),
    '&:hover': { backgroundColor: 'transparent' },
  },
  focusVisible: {
    backgroundColor: theme.palette.action.hover,
  },

  banner: {
    display: 'block',
    width: 160,
    height: 28,
    background: theme.palette.primary.main,
    position: 'absolute',
    top: 30,
    left: -34,
    textAlign: 'center',
    transform: 'rotate(-45deg)',
  },
  bannerText: {
    color: theme.palette.common.white,
    lineHeight: '26px',
  },

  tertiaryIndicator: {
    position: 'absolute',
    top: theme.spacing.unit,
    right: theme.spacing.unit,

    backgroundColor: 'rgba(0,0,0,.54)',
    color: theme.palette.common.white,
    height: theme.spacing.unit * 4,
    borderRadius: theme.spacing.unit * 2,
    boxSizing: 'border-box',
    lineHeight: `${theme.spacing.unit * 4}px`,
    paddingLeft: theme.spacing.unit,

    '& svg': {
      margin: theme.spacing.unit / 2,
      verticalAlign: 'bottom',
    },
  },

  media: {
    width: '100%',
    height: MEDIA_HEIGHT,
  },
  gradient: {
    width: '100%',
    height: MEDIA_HEIGHT,
    backgroundImage: `linear-gradient(-15deg, #fa0, ${
      theme.palette.primary.main
    })`,
  },

  indicator: {
    margin: `${-theme.spacing.unit * 3}px ${theme.spacing.unit}px`,
    marginLeft: 'auto',
    width: theme.spacing.unit * 6,
    height: theme.spacing.unit * 6,
    padding: theme.spacing.unit * 1.5,
    boxSizing: 'border-box',
    position: 'relative',
    zIndex: 1,

    borderRadius: '50%',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },

  stretchGrid: {
    height: '100%',
    paddingTop: MEDIA_HEIGHT,
    marginTop: -MEDIA_HEIGHT - 24,
  },
  cardContent: {
    paddingBottom: theme.spacing.unit,
    '&:last-child': { paddingBottom: theme.spacing.unit },
  },

  secondaryText: {
    whiteSpace: 'pre-wrap',
  },
  tertiaryTextList: {
    padding: 0,
    paddingLeft: theme.spacing.unit * 2.5,
    marginTop: theme.spacing.unit,
    marginBottom: 0,
  },

  cardActions: {
    justifyContent: 'flex-end',
    paddingTop: 0,
    paddingRight: 0,
  },
  arrowForwardIcon: {
    marginRight: '0 !important',
    marginLeft: theme.spacing.unit / 2,
  },
});

function OneCard(props) {
  const {
    classes,
    title,
    secondaryText,
    primaryAction,
    route,
    indicator,
    tertiaryText,
    banner,
    tertiaryIndicator,
    image,
    video,
    gradient,
  } = props;

  let media;
  if (video) {
    media = (
      <iframe
        src={video.indexOf('youtube') > -1 ? `${video}` : video}
        className={classes.media}
        title={title + ' video'}
        frameBorder="none"
        allow="accelerometer; encrypted-media; picture-in-picture"
        allowFullScreen
      />
    );
  } else if (image) {
    media = <CardMedia className={classes.media} image={image} />;
  } else {
    media = (
      <div className={classes.gradient} style={{ backgroundImage: gradient }} />
    );
  }

  return (
    <Card classes={{ root: classes.root }}>
      <CardActionArea
        component="a"
        href={route}
        classes={{ root: classes.cardActionArea }}
        focusVisibleClassName={classes.focusVisible}
      >
        {media}

        {banner && (
          <div className={classes.banner}>
            <Typography variant="button" className={classes.bannerText}>
              {banner}
            </Typography>
          </div>
        )}

        {tertiaryIndicator && (
          <Typography variant="body2" className={classes.tertiaryIndicator}>
            {tertiaryIndicator}
          </Typography>
        )}

        <div
          className={classes.indicator}
          style={!indicator ? { visibility: 'hidden' } : {}}
          // indicator still needs to be rendered for layout
        >
          {indicator}
        </div>

        <Grid container direction="column" className={classes.stretchGrid}>
          <Grid item xs>
            <CardContent classes={{ root: classes.cardContent }}>
              <Typography gutterBottom variant="h6">
                {title}
              </Typography>
              <Typography component="p" className={classes.secondaryText}>
                {secondaryText}
              </Typography>
              {tertiaryText && (
                <ul className={classes.tertiaryTextList}>
                  {tertiaryText.map((x, i) => (
                    <li key={i}>
                      <Typography>{x}</Typography>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Grid>

          <Grid item>
            <CardActions className={classes.cardActions}>
              <Button color="primary" className={classes.primaryButton}>
                {primaryAction}
                <ArrowForwardIcon className={classes.arrowForwardIcon} />
              </Button>
            </CardActions>
          </Grid>
        </Grid>
      </CardActionArea>
    </Card>
  );
}

OneCard.propTypes = {
  classes: PropTypes.object.isRequired,

  title: PropTypes.string.isRequired,
  secondaryText: PropTypes.string.isRequired,
  primaryAction: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,

  indicator: PropTypes.node,
  tertiaryText: PropTypes.array,
  banner: PropTypes.string,
  tertiaryIndicator: PropTypes.node,

  image: PropTypes.string,
  video: PropTypes.string,
  gradient: PropTypes.string,
};

export default withStyles(styles)(OneCard);
