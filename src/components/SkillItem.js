import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import SkillIcon from '../assets/icons/Skill';
import SkillOutlinedIcon from '@material-ui/icons/NewReleasesOutlined';
import AchievedIcon from '@material-ui/icons/Check';
import green from '@material-ui/core/colors/green';

import { getSkillLabel } from '@bit/sidney2hats.2hats.global.common-constants';

import UserContext from '../contexts/UserContext';

const styles = theme => ({
  root: {
    display: 'inline-flex',
    width: 'auto',

    borderRadius: theme.shape.borderRadius / 2,
    padding: `${theme.spacing.unit / 2}px 0`,
    paddingLeft: theme.spacing.unit * 1.25,
    paddingRight: theme.spacing.unit * 1.5,
    backgroundColor: theme.palette.divider,

    margin: theme.spacing.unit / 2,
  },
  achieved: {
    backgroundColor: green[100],
    color: green[700],
  },

  skillIcon: {
    position: 'relative',
    marginRight: theme.spacing.unit * 0.75,
    height: 24,
  },
  achievedIcon: {
    position: 'absolute',
    left: 4,
    top: 4,

    color: '#fff',
    fontSize: 16,
  },

  label: {
    lineHeight: '1.25',
    fontWeight: 500,
    '$achieved &': { color: green[900] },
  },
  header: {
    display: 'block',
    fontWeight: 500,
  },
});

const SkillItem = props => {
  const { classes, className, value, header } = props;

  const userContext = useContext(UserContext);

  const achieved =
    userContext.user.skills && userContext.user.skills.includes(value);

  return (
    <Grid
      container
      className={classNames(
        classes.root,
        achieved && classes.achieved,
        className
      )}
      alignItems="center"
    >
      <Grid item className={classes.skillIcon}>
        {achieved ? (
          <>
            <SkillIcon />
            <AchievedIcon className={classes.achievedIcon} />
          </>
        ) : (
          <SkillOutlinedIcon />
        )}
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
};

export default withStyles(styles)(SkillItem);
