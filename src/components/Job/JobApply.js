import React from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import ArrowForwardIcon from '@material-ui/icons/ArrowForwardOutlined';
import ErrorIcon from '@material-ui/icons/ErrorOutlineOutlined';
import CheckIcon from '@material-ui/icons/CheckOutlined';

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
    maxWidth: 150,

    margin: theme.spacing.unit / 2,
    marginLeft: theme.spacing.unit,
  },
});

const JobApply = props => {
  const { classes, onClick, data, skillsNotAchieved, loading, big } = props;

  if (skillsNotAchieved.length > 0)
    return (
      <Tooltip
        title={
          <Grid container alignItems="center">
            <Grid item className={classes.tooltipIconWrapper}>
              <ErrorIcon />
            </Grid>
            <Grid item xs className={classes.tooltipText}>
              You need {skillsNotAchieved.length} more of the required skills to
              apply
            </Grid>
          </Grid>
        }
      >
        <div>
          <Button
            variant="contained"
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
      variant="contained"
      color="primary"
      className={big ? classes.applyBig : classes.apply}
      size={big ? 'large' : 'medium'}
      onClick={onClick}
      disabled={!!data.jobId || loading}
    >
      {loading && <CircularProgress className={classes.loading} size={32} />}
      {data.jobId ? (
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

export default withStyles(styles)(JobApply);
