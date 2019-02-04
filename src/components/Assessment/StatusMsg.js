import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

import SubmittedIcon from '@material-ui/icons/SendRounded';
import PassedIcon from '@material-ui/icons/CheckCircleOutlined';
import FailedIcon from '@material-ui/icons/ErrorOutline';

import { getAssessmentCategoryLabel } from '@bit/sidney2hats.2hats.global.common-constants';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 3,

    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[24],
  },
  iconWrapper: {
    marginRight: theme.spacing.unit * 2,
    borderRadius: '50%',
    backgroundColor: theme.palette.divider,

    width: 48,
    height: 48,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '& svg': { fontSize: 32 },

    [theme.breakpoints.down('xs')]: { marginBottom: theme.spacing.unit },
  },
  title: { marginTop: theme.spacing.unit / 4 },

  passed: {
    '& $iconWrapper': {
      backgroundColor: green[100],
      color: green[800],
    },
  },
  failed: {
    '& $iconWrapper': {
      backgroundColor: red[100],
      color: red[800],
    },
  },
});

const StatusMsg = props => {
  const { classes, data, isXs } = props;

  let icon = null;
  let title = null;
  let body = null;

  if (data.submitted && !data.screened) {
    icon = <SubmittedIcon style={{ marginRight: -4 }} />;
    title = 'Submitted';
    body = 'We will review your submission shortly to assess your skills.';
  } else if (data.submitted && data.screened) {
    if (data.outcome === 'pass') {
      icon = <PassedIcon />;
      title = 'Passed';
      body = (
        <>
          Congratulations! You have earned the{' '}
          <b>{getAssessmentCategoryLabel(data.category)}</b> badge.
        </>
      );
    } else if (data.outcome === 'fail') {
      icon = <FailedIcon />;
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
