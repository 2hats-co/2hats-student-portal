import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';

import Typography from '@material-ui/core/Typography';
import GoIcon from '@material-ui/icons/ArrowForward';

const styles = theme => ({
  root: {
    cursor: 'pointer',

    transition: theme.transitions.create(['color'], {
      duration: theme.transitions.duration.shortest,
    }),
    '& *': { color: 'inherit' },
    '&:hover, &:active': { color: theme.palette.primary.main },
    '&:active': { opacity: 0.5 },
  },

  value: { marginBottom: theme.spacing.unit },
  icon: {
    verticalAlign: 'baseline',
    position: 'relative',
    top: 3,

    marginLeft: theme.spacing.unit / 2,
    transitionDuration: '0 ms',
    opacity: 0.87,
  },

  title: {
    whiteSpace: 'pre-line',
    lineHeight: 1.25,
  },
  goIcon: {
    verticalAlign: 'bottom',
    marginLeft: theme.spacing.unit / 4,

    opacity: 0.87,
    fontSize: 18,
  },
});

const MilestoneItem = props => {
  const { classes, isXs, history, val, Icon, title, route } = props;

  return (
    <div
      className={classes.root}
      onClick={() => {
        history.push(route);
      }}
    >
      <Typography variant={isXs ? 'h4' : 'h3'} className={classes.value}>
        {val}
        <Icon className={classes.icon} />
      </Typography>
      <Typography variant={isXs ? 'body2' : 'body1'} className={classes.title}>
        {title}
        <GoIcon className={classes.goIcon} />
      </Typography>
    </div>
  );
};

MilestoneItem.propTypes = {
  classes: PropTypes.object.isRequired,
  isXs: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  val: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  Icon: PropTypes.func,
  title: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
};

export default withRouter(
  withStyles(styles, { withTheme: true })(MilestoneItem)
);
