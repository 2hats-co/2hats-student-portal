import React, { useState, useEffect } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';

const chipStyles = theme => ({
  root: {
    marginBottom: theme.spacing.unit,

    fontSize: '.9375rem',
    borderRadius: 200,

    width: 164,
    textAlign: 'center',

    '&:not(:last-of-type)': { marginRight: theme.spacing.unit * 0.75 },
  },
  label: {
    paddingLeft: theme.spacing.unit * 1.25,
    paddingRight: theme.spacing.unit * 1.25,
  },
});

const TimeButton = withStyles(chipStyles)(props => {
  const { classes, timeslot, selected, onClick } = props;

  return (
    <Chip
      classes={classes}
      color={selected ? 'primary' : 'default'}
      onClick={onClick}
      label={timeslot}
    />
  );
});

const TimeSelector = props => {
  const { selectedTime, setSelectedTime, timeslots } = props;

  if (!timeslots || timeslots.length < 0)
    return <Typography variant="subtitle1">No time slots available</Typography>;

  return timeslots.map(x => (
    <TimeButton
      key={x}
      timeslot={x}
      selected={x === selectedTime}
      onClick={() => {
        setSelectedTime(x);
      }}
    />
  ));
};

export default TimeSelector;
