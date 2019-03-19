import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import IndustryIcon from '@material-ui/icons/BusinessOutlined';
import WarningIcon from '@material-ui/icons/ErrorOutlineOutlined';

const styles = theme => ({
  subtitle: {
    textAlign: 'center',
    textTransform: 'capitalize',
    color: theme.palette.text.primary,

    marginTop: theme.spacing.unit,
    marginBottom: `${theme.spacing.unit * 3}px !important`,
    display: 'block',

    '& $adornmentIcon': {
      verticalAlign: 'baseline',
      color: theme.palette.text.primary,
      marginBottom: -4,
    },
  },

  grid: {
    textAlign: 'center',
    marginTop: theme.spacing.unit,
  },
  gridItem: {
    paddingTop: '0 !important',
    paddingBottom: '0 !important',
  },

  meta: {
    fontWeight: 500,
    marginBottom: 0,

    '& small': {
      verticalAlign: 'text-top',
      fontSize: '.75em',
    },
  },
  adornmentIcon: {
    verticalAlign: 'bottom',
    marginRight: theme.spacing.unit,
    color: theme.palette.text.secondary,
  },

  warningIcon: {
    fontSize: 28,
    verticalAlign: 'text-bottom',
    marginLeft: -theme.spacing.unit / 2,
    marginRight: theme.spacing.unit,
  },
});

const JobMetadata = props => {
  const { classes, data, isXs, small } = props;

  const closed =
    moment.unix(data.closingDate.seconds).diff(moment(), 'days') < 0;

  const closingSoon =
    moment.unix(data.closingDate.seconds).diff(moment(), 'days') < 3;

  return (
    <>
      <Typography
        variant={isXs || small ? 'subtitle1' : 'h6'}
        className={classes.subtitle}
      >
        <IndustryIcon className={classes.adornmentIcon} />
        {data.industry}
      </Typography>

      <Grid container className={classes.grid} spacing={16} justify="center">
        <Grid item xs={4} className={classes.gridItem}>
          <Typography
            variant={isXs || small ? 'h6' : 'h5'}
            className={classes.meta}
          >
            {data.commitment}
          </Typography>
          <Typography variant={isXs || small ? 'body2' : 'body1'}>
            {data.commitmentUnits}
          </Typography>
        </Grid>
        <Grid item xs={4} className={classes.gridItem}>
          <Typography
            variant={isXs || small ? 'h6' : 'h5'}
            className={classes.meta}
          >
            <small>$</small>
            {data.payRate}
          </Typography>
          <Typography variant={isXs || small ? 'body2' : 'body1'}>
            {data.payUnits}
          </Typography>
        </Grid>
        <Grid item xs={4} className={classes.gridItem}>
          {closed ? (
            <>
              <Typography
                variant={isXs || small ? 'h6' : 'h5'}
                className={classes.meta}
              >
                Closed
              </Typography>
              <Typography variant={isXs || small ? 'body2' : 'body1'}>
                for applications
              </Typography>
            </>
          ) : (
            <>
              <Typography
                variant={isXs || small ? 'h6' : 'h5'}
                className={classes.meta}
                color={closingSoon ? 'primary' : 'textPrimary'}
              >
                {closingSoon && <WarningIcon className={classes.warningIcon} />}
                {moment.unix(data.closingDate.seconds).fromNow(true)}
              </Typography>
              <Typography variant={isXs || small ? 'body2' : 'body1'}>
                remaining
              </Typography>
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
};

JobMetadata.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  isXs: PropTypes.bool,
  small: PropTypes.bool,
};

export default withStyles(styles)(JobMetadata);
