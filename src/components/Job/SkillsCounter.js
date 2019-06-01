import React from 'react';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';

import green from '@material-ui/core/colors/green';

const styles = theme => ({
  root: {
    fontSize: '1rem',
    backgroundColor: theme.palette.text.primary,
    color: theme.palette.background.paper,

    borderRadius: '500px',
    margin: theme.spacing(1),
    padding: `${theme.spacing(0.5)}px ${theme.spacing(1.25)}px`,

    userSelect: 'none',
  },

  orange: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.main,
  },
  green: {
    backgroundColor: green[100],
    color: green[800],
  },
});

const SkillsCounter = props => {
  const { classes, skillsNotAchieved, skillsRequired } = props;

  return (
    <span
      className={classNames(
        classes.root,
        skillsNotAchieved.length === 0 ? classes.green : classes.orange
      )}
    >
      {skillsRequired.length - skillsNotAchieved.length} of{' '}
      {skillsRequired.length} achieved
    </span>
  );
};

export default withStyles(styles)(SkillsCounter);
