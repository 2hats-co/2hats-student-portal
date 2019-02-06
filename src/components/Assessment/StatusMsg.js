import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import PaddedIcon from '../PaddedIcon';
import SubmittedIcon from '@material-ui/icons/SendRounded';
import PassedIcon from '../../assets/icons/SkillAchieved';
import FailedIcon from '@material-ui/icons/ErrorOutline';

import { getAssessmentCategoryLabel } from '@bit/sidney2hats.2hats.global.common-constants';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 3,

    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadowsLight[24],

    userSelect: 'none',
  },
  paddedIcon: {
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.down('xs')]: { marginBottom: theme.spacing.unit },
  },
  title: {
    marginTop: theme.spacing.unit / 4,
    marginBottom: theme.spacing.unit / 2,
  },
});

const StatusMsg = props => {
  const { classes, data, isXs } = props;

  let icon = null;
  let title = null;
  let body = null;

  if (data.submitted && !data.screened) {
    icon = (
      <PaddedIcon className={classes.paddedIcon}>
        <SubmittedIcon style={{ marginRight: -4 }} />
      </PaddedIcon>
    );
    title = 'Submitted';
    body = 'Sit tight! We’ll review your submission shortly.';
  } else if (data.submitted && data.screened) {
    if (data.outcome === 'pass') {
      icon = (
        <PaddedIcon className={classes.paddedIcon} color="green">
          <PassedIcon />
        </PaddedIcon>
      );
      title = 'Passed';
      body = (
        <>
          Congratulations! You’ve earned the{' '}
          <b>{getAssessmentCategoryLabel(data.category)}</b> badge.
        </>
      );
    } else if (data.outcome === 'fail') {
      icon = (
        <PaddedIcon className={classes.paddedIcon} color="red">
          <FailedIcon />
        </PaddedIcon>
      );
      title = 'Failed';
      body = `You can make another submission below.`;
    }
  } else {
    return null;
  }

  return (
    <Grid
      container
      className={classNames(
        classes.root,
        title === 'Passed' && classes.passed,
        title === 'Failed' && classes.failed
      )}
      alignItems="flex-start"
      direction={isXs ? 'column' : 'row'}
    >
      <Grid item className={classes.iconWrapper}>
        {icon}
      </Grid>
      <Grid item xs>
        <Typography variant="h6" className={classes.title}>
          {title}
        </Typography>
        <Typography variant="body1">{body}</Typography>
      </Grid>
    </Grid>
  );
};

StatusMsg.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  isXs: PropTypes.bool,
};

export default withStyles(styles)(StatusMsg);
