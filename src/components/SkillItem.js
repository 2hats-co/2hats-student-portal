import React from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import SkillIcon from '@material-ui/icons/Rowing';
import AchievedIcon from '@material-ui/icons/CheckCircleRounded';
import green from '@material-ui/core/colors/green';

import SkillBG from '../assets/images/SkillBG.svg';
import SKILLS from '../constants/skills';

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
});

const SkillItem = props => {
  const { classes, value, icon, achieved } = props;

  return (
    <Grid container className={classes.root} alignItems="center">
      <Grid item className={classes.skillIcon}>
        {icon || <SkillIcon />}
        {achieved && <AchievedIcon className={classes.achievedIcon} />}
      </Grid>
      <Grid item xs>
        <Typography variant="body1" className={classes.label}>
          {SKILLS.filter(x => x.value === value)[0].label}
        </Typography>
      </Grid>
    </Grid>
  );
};

SkillItem.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  icon: PropTypes.node,
  achieved: PropTypes.bool,
};

export default withStyles(styles)(SkillItem);
