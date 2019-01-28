import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import SkillIcon from '@material-ui/icons/Star';
import AchievedIcon from '@material-ui/icons/CheckCircleRounded';
import green from '@material-ui/core/colors/green';

import SkillBG from '../assets/images/SkillBG.svg';
import { SKILLS } from '@bit/sidney2hats.2hats.global.common-constants';

import UserContext from '../contexts/UserContext';

const styles = theme => ({
  root: {
    display: 'inline-flex',
    width: 'auto',

    '& + &': {
      marginLeft: theme.spacing.unit * 2,
      marginTop: theme.spacing.unit * 2,
    },
  },
  skillIcon: {
    boxSizing: 'border-box',
    width: theme.spacing.unit * 6,
    height: theme.spacing.unit * 6,
    marginRight: theme.spacing.unit,

    backgroundImage: `url(${SkillBG})`,
    backgroundSize: 'cover',
    color: '#444',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
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
  const { classes, className, value, icon, header } = props;

  const userContext = useContext(UserContext);

  const achieved =
    userContext.user.skills && userContext.user.skills.includes(value);

  return (
    <Grid
      container
      className={classNames(classes.root, className)}
      alignItems="center"
    >
      <Grid item className={classes.skillIcon}>
        {icon || <SkillIcon />}
        {achieved && <AchievedIcon className={classes.achievedIcon} />}
      </Grid>
      <Grid item xs>
        <Typography variant="body1" className={classes.label}>
          <span className={classes.header}>{header}</span>
          {SKILLS.filter(x => x.value === value)[0].label}
        </Typography>
      </Grid>
    </Grid>
  );
};

SkillItem.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  icon: PropTypes.node,
  header: PropTypes.node,
};

export default withStyles(styles)(SkillItem);
