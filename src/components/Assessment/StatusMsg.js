import React from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import PaddedIcon from '../PaddedIcon';
import SubmittedIcon from '@material-ui/icons/SendRounded';
import PassedIcon from '../../assets/icons/SkillAchieved';
import FailedIcon from '@material-ui/icons/ErrorOutline';
import DisqualifyIcon from '@material-ui/icons/CancelOutlined';

import Feedback from './Feedback';

const styles = theme => ({
  root: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(3),

    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadowsLight[24],
  },
  paddedIcon: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('xs')]: { marginBottom: theme.spacing(1) },
  },
  title: {
    marginTop: theme.spacing(0.25),
    marginBottom: theme.spacing(0.5),
  },
});

const StatusMsg = props => {
  const { classes, data, isXs } = props;

  let icon = null;
  let title = null;
  let body = null;
  let extra = null;

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
          Congratulations! You’ve earned the <b>{data.title}</b> badge.
        </>
      );
      extra = <Feedback data={data} />;
    } else if (data.outcome === 'fail') {
      icon = (
        <PaddedIcon className={classes.paddedIcon} color="red">
          <FailedIcon />
        </PaddedIcon>
      );
      title = 'Unsuccessful';
      body = 'Your submission did not meet our standards.';
      extra = <Feedback data={data} />;
    } else if (data.outcome === 'disqualify') {
      icon = (
        <PaddedIcon className={classes.paddedIcon} color="red">
          <DisqualifyIcon />
        </PaddedIcon>
      );
      title = 'Disqualified';
      body = 'Your submission was disqualified.';
      extra = <Feedback data={data} />;
    }
  } else {
    return null;
  }

  return (
    <Grid
      container
      className={classes.root}
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
        {extra}
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
