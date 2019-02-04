import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import IndustryIcon from '@material-ui/icons/BusinessOutlined';

const styles = theme => ({
  subtitle: {
    textAlign: 'center',
    textTransform: 'capitalize',
    color: theme.palette.primary.main,

    marginTop: theme.spacing.unit,
    marginBottom: `${theme.spacing.unit * 3}px !important`,
    display: 'block',

    '& $adornmentIcon': {
      verticalAlign: 'sub',
      color: theme.palette.primary.main,
    },
  },

  grid: {
    textAlign: 'center',
    marginTop: theme.spacing.unit,
  },
  gridItem: {
    paddingTop: '0 !important',
    paddingBottom: '0 !important',
    '& + &': { borderLeft: `1px solid ${theme.palette.divider}` },
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
});

const JobMetadata = props => {
  const { classes, data, isXs, small } = props;

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
            days per week
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
            per {data.payUnits}
          </Typography>
        </Grid>
        <Grid item xs={4} className={classes.gridItem}>
          <Typography
            variant={isXs || small ? 'h6' : 'h5'}
            className={classes.meta}
          >
            {moment(data.closingDate, 'DD/MM/YYYY').fromNow(true)}
          </Typography>
          <Typography variant={isXs || small ? 'body2' : 'body1'}>
            remaining
          </Typography>
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
