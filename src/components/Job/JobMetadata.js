import React from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

import IndustryIcon from '@material-ui/icons/BusinessRounded';
import TimeIcon from '@material-ui/icons/AccessTimeRounded';
import PayIcon from '@material-ui/icons/AttachMoneyRounded';
import EventIcon from '@material-ui/icons/EventRounded';

const styles = theme => ({
  subtitle: {
    textTransform: 'capitalize',
    color: theme.palette.primary.main,
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 1.5,

    '& $adornmentIcon': {
      verticalAlign: 'sub',
      color: theme.palette.primary.main,
    },
  },
  meta: {
    marginBottom: theme.spacing.unit,
    display: 'flex',
  },
  adornmentIcon: {
    verticalAlign: 'bottom',
    marginRight: theme.spacing.unit,
    color: theme.palette.text.secondary,
  },
});

const JobMetadata = props => {
  const { classes, data } = props;

  return (
    <>
      <Typography variant="subtitle1" className={classes.subtitle}>
        <IndustryIcon className={classes.adornmentIcon} />
        {data.industry}
      </Typography>

      <Typography variant="body1" className={classes.meta}>
        <TimeIcon className={classes.adornmentIcon} />
        {data.commitment}
      </Typography>
      <Typography variant="body1" className={classes.meta}>
        <PayIcon className={classes.adornmentIcon} />
        {data.payRate}/{data.payUnits}
      </Typography>
      <Typography variant="body1" className={classes.meta}>
        <EventIcon className={classes.adornmentIcon} />
        Closing {data.closingDate}
      </Typography>
    </>
  );
};

JobMetadata.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default withStyles(styles)(JobMetadata);
