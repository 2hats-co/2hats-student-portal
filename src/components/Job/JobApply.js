import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import ArrowForwardIcon from '@material-ui/icons/ArrowForwardOutlined';
import ErrorIcon from '@material-ui/icons/ErrorOutlineOutlined';
import CheckIcon from '@material-ui/icons/CheckOutlined';

import UserContext from '../../contexts/UserContext';

const styles = theme => ({
  apply: {
    marginTop: theme.spacing.unit * 2,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2.5}px`,
    '& svg': {
      marginLeft: theme.spacing.unit / 2,
      marginRight: -theme.spacing.unit / 2,
    },
  },
  applyBig: {
    display: 'flex',
    margin: '0 auto',
    borderRadius: 200,

    '& svg': {
      marginLeft: theme.spacing.unit / 2,
      marginRight: -theme.spacing.unit / 2,
      position: 'relative',
      top: 1,
    },
  },

  tooltipIconWrapper: { height: 24 },
  tooltipText: {
    fontSize: '.875rem',
    lineHeight: 1.25,

    margin: theme.spacing.unit / 2,
    marginLeft: theme.spacing.unit,
  },

  loading: {
    position: 'absolute',
    '& svg': {
      margin: 0,
      position: 'static',
    },
  },
});

const JobApply = props => {
  const { classes, onClick, data, skillsNotAchieved, loading, big } = props;

  const closed =
    moment.unix(data.closingDate.seconds).diff(moment(), 'days') < 0;

  const userContext = useContext(UserContext);
  const { user } = userContext;

  const hasApplied =
    !!data.jobId ||
    (user.touchedJobs && user.touchedJobs.indexOf(data.id) > -1);

  if (closed & !hasApplied)
    return (
      <Tooltip
        title={
          <Grid container alignItems="center">
            <Grid item className={classes.tooltipIconWrapper}>
              <ErrorIcon />
            </Grid>
            <Grid
              item
              xs
              className={classes.tooltipText}
              style={{ maxWidth: 175 }}
            >
              We are no longer accepting applications for this job
            </Grid>
          </Grid>
        }
      >
        <div>
          <Button
            variant="outlined"
            color="primary"
            className={big ? classes.applyBig : classes.apply}
            size={big ? 'large' : 'medium'}
            onClick={onClick}
            disabled
          >
            Applications Closed
            <ErrorIcon />
          </Button>
        </div>
      </Tooltip>
    );

  if (skillsNotAchieved.length > 0)
    return (
      <Tooltip
        title={
          <Grid container alignItems="center">
            <Grid item className={classes.tooltipIconWrapper}>
              <ErrorIcon />
            </Grid>
            <Grid
              item
              xs
              className={classes.tooltipText}
              style={{ maxWidth: 150 }}
            >
              You need {skillsNotAchieved.length} more of the required skills to
              apply
            </Grid>
          </Grid>
        }
      >
        <div>
          <Button
            variant="outlined"
            color="primary"
            className={big ? classes.applyBig : classes.apply}
            size={big ? 'large' : 'medium'}
            onClick={onClick}
            disabled
          >
            Apply
            <ArrowForwardIcon />
          </Button>
        </div>
      </Tooltip>
    );

  return (
    <Button
      variant={!!data.jobId || loading ? 'outlined' : 'contained'}
      color="primary"
      className={big ? classes.applyBig : classes.apply}
      size={big ? 'large' : 'medium'}
      onClick={onClick}
      disabled={loading || hasApplied}
    >
      {loading && <CircularProgress className={classes.loading} size={32} />}
      {hasApplied ? (
        <>
          Applied
          <CheckIcon />
        </>
      ) : (
        <>
          Apply
          <ArrowForwardIcon />
        </>
      )}
    </Button>
  );
};

JobApply.propTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  skillsNotAchieved: PropTypes.array,
  loading: PropTypes.bool,
  big: PropTypes.bool,
};

export default withStyles(styles)(JobApply);
