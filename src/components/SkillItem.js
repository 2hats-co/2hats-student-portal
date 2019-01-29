import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import SkillIcon from '@material-ui/icons/Star';
import MarketingIcon from '../assets/icons/Bullhorn';
import SalesIcon from '@material-ui/icons/AttachMoneyRounded';

import AchievedIcon from '@material-ui/icons/CheckCircleRounded';
import green from '@material-ui/core/colors/green';

import SkillBG from '../assets/images/SkillBG.svg';
import SkillBGSmall from '../assets/images/SkillBG-small.svg';
import {
  getSkillLabel,
  getSkillCategory,
} from '@bit/sidney2hats.2hats.global.common-constants';

import UserContext from '../contexts/UserContext';

const styles = theme => ({
  root: {
    display: 'inline-flex',
    width: 'auto',

    '& + &': {
      marginLeft: theme.spacing.unit * 2,
      marginTop: theme.spacing.unit * 2,
    },

    '&$small + &$small': {
      marginLeft: theme.spacing.unit,
      marginTop: theme.spacing.unit,
    },
  },
  small: {},
  skillIcon: {
    boxSizing: 'border-box',
    marginRight: theme.spacing.unit,
    width: theme.spacing.unit * 6,
    height: theme.spacing.unit * 6,

    backgroundImage: `url(${SkillBG})`,
    backgroundSize: 'cover',
    color: '#444',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',

    '$small &': {
      width: theme.spacing.unit * 3,
      height: theme.spacing.unit * 3,
      backgroundImage: `url(${SkillBGSmall})`,
      '& svg': { fontSize: 16 },
    },
  },

  achievedIcon: {
    position: 'absolute',
    // fontSize: theme.spacing.unit * 2.25,
    right: 0,
    bottom: 0,
    padding: 1,

    borderRadius: '50%',
    backgroundColor: theme.palette.background.paper,
    color: green[500],

    '$small &': {
      right: -theme.spacing.unit / 2,
      bottom: -theme.spacing.unit / 2,
    },
  },

  label: {
    lineHeight: '1.25',
  },
  header: {
    display: 'block',
    fontWeight: 500,
  },
});

const SkillItem = props => {
  const { classes, className, value, header, small } = props;

  const userContext = useContext(UserContext);

  const achieved =
    userContext.user.skills && userContext.user.skills.includes(value);

  let icon = <SkillIcon />;
  switch (getSkillCategory(value)) {
    case 'marketing':
      icon = <MarketingIcon />;
      break;

    case 'sales':
      icon = <SalesIcon />;
      break;

    default:
      icon = <SkillIcon />;
      break;
  }

  return (
    <Grid
      container
      className={classNames(classes.root, small && classes.small, className)}
      alignItems="center"
    >
      <Grid item className={classes.skillIcon}>
        {icon}
        {achieved && <AchievedIcon className={classes.achievedIcon} />}
      </Grid>
      <Grid item xs>
        <Typography variant="body1" className={classes.label}>
          <span className={classes.header}>{header}</span>
          {getSkillLabel(value)}
        </Typography>
      </Grid>
    </Grid>
  );
};

SkillItem.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  header: PropTypes.node,
  small: PropTypes.bool,
};

export default withStyles(styles)(SkillItem);
