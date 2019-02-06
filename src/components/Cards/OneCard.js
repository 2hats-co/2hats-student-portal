import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';

import withStyles from '@material-ui/core/styles/withStyles';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// import Grid from '@material-ui/core/Grid';

// import ArrowForwardIcon from '@material-ui/icons/ArrowForwardOutlined';

export const CARD_WIDTH = 320;
export const CARD_PADDING = 16;
const MEDIA_HEIGHT = CARD_WIDTH * 0.5625;

const styles = theme => ({
  root: {
    margin: CARD_PADDING / 2,
    width: CARD_WIDTH,

    transition: theme.transitions.create(['box-shadow', 'transform']),
    // boxShadow: `0 0 0 1px ${theme.palette.divider}`,
    boxShadow: `0 10px 30px rgba(0,0,0,.14)`,
    // boxShadow: theme.shadows[10],

    '&:hover': {
      boxShadow: theme.shadows[24],
      transform: 'translateY(-4px)',

      '& $media:not($video)': { opacity: 0.9 },
    },
    '&:active': {
      transform: 'translateY(0) scale(0.95)',
      boxShadow: `0 10px 30px rgba(0,0,0,.14)`,
      transitionDuration: '.2s',
    },
  },

  cardActionArea: {
    textAlign: 'right',
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
      marginLeft: theme.spacing.unit / 4,
      verticalAlign: 'bottom',
    },
  },

  media: {
    width: '100%',
    // height: MEDIA_HEIGHT,
    height: 0,
    paddingBottom: '33.33%',
    position: 'relative',
    transition: theme.transitions.create('opacity'),
  },
  video: { paddingBottom: '56.25%' },
  iframe: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  gradient: {
    width: '100%',
    // height: MEDIA_HEIGHT,
    height: 0,
    paddingBottom: '56.25%',
    backgroundImage: `linear-gradient(-15deg, #fa0, ${
      theme.palette.primary.main
    })`,
  },

  titleWithIndicator: { paddingRight: theme.spacing.unit * 6 },

  indicator: {
    display: 'inline-block',
    height: theme.spacing.unit * 6,
    padding: theme.spacing.unit * 1.5,
    boxSizing: 'border-box',
    position: 'absolute',
    top: MEDIA_HEIGHT - theme.spacing.unit * 3,
    right: theme.spacing.unit,
    zIndex: 1,
    boxShadow: theme.shadows[4],

    borderRadius: theme.spacing.unit * 3,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },

  stretchGrid: {
    height: '100%',
    paddingTop: MEDIA_HEIGHT,
    marginTop: -MEDIA_HEIGHT,
  },
  cardContent: {
    textAlign: 'left',
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
  primaryButton: {
    '&:hover': { backgroundColor: 'transparent' },
  },
});

function OneCard(props) {
  const {
    classes,
    title,
    secondaryText,
    // primaryAction,
    route,
    indicator,
    banner,
    tertiaryIndicator,
    image,
    video,
    gradient,
    history,
  } = props;

  let media;
  if (video) {
    media = (
      <div className={classNames(classes.media, classes.video)}>
        <iframe
          src={video}
          className={classes.iframe}
          title={title + ' video'}
          frameBorder="none"
          allow="accelerometer; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      </div>
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
        id={title.replace(/\W/g, '')}
        component="div"
        onClick={() => {
          history.push(route);
        }}
        classes={{ root: classes.cardActionArea }}
        focusVisibleClassName={classes.focusVisible}
        disableRipple
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

        {/* {indicator && (
          <div
            className={classes.indicator}
            style={!indicator ? { visibility: 'hidden' } : {}}
          >
            {indicator}
          </div>
        )} */}

        {/* <Grid
          container
          direction="column"
          className={classes.stretchGrid}
          wrap="nowrap"
        >
          <Grid item xs> */}
        <CardContent classes={{ root: classes.cardContent }}>
          <Typography
            gutterBottom
            variant="h6"
            className={indicator ? classes.titleWithIndicator : ''}
          >
            {title}
          </Typography>
          {typeof secondaryText === 'string' ? (
            <Typography component="p" className={classes.secondaryText}>
              {secondaryText}
            </Typography>
          ) : (
            secondaryText
          )}
        </CardContent>
        {/* </Grid> */}

        {/* <Grid item>
            <CardActions className={classes.cardActions}>
              <Button
                color="primary"
                id={`button-${title}`}
                className={classes.primaryButton}
                disableRipple
              >
                {primaryAction}
                <ArrowForwardIcon className={classes.arrowForwardIcon} />
              </Button>
            </CardActions>
          </Grid> */}
        {/* </Grid> */}
      </CardActionArea>
    </Card>
  );
}

OneCard.propTypes = {
  classes: PropTypes.object.isRequired,

  title: PropTypes.string,
  secondaryText: PropTypes.node,
  // primaryAction: PropTypes.string,
  route: PropTypes.string,

  newTab: PropTypes.bool,
  indicator: PropTypes.node,
  banner: PropTypes.string,
  tertiaryIndicator: PropTypes.node,

  image: PropTypes.string,
  video: PropTypes.string,
  gradient: PropTypes.string,
};

export default withRouter(withStyles(styles)(OneCard));
