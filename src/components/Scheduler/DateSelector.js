import React, { useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { emphasize } from '@material-ui/core/styles/colorManipulator';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import DownIcon from '@material-ui/icons/KeyboardArrowDown';
import { TODAY } from '../../utilities/Scheduler';

const buttonStyles = theme => ({
  root: {
    backgroundColor: theme.palette.grey[300],
    borderRadius: '50%',
    width: 64,
    height: 64,

    marginBottom: theme.spacing.unit / 2,
    marginRight: theme.spacing.unit / 2,

    '&:hover, &:focus': {
      backgroundColor: emphasize(theme.palette.grey[300], 0.08),
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(theme.palette.grey[300], 0.12),
    },
  },
  label: { flexDirection: 'column' },
  disabled: { opacity: 0.5 },

  date: {
    fontWeight: 500,
    marginTop: -theme.spacing.unit / 2,
  },

  containedPrimary: {
    backgroundColor: theme.palette.primary.main,

    '&:hover, &:focus': {
      backgroundColor: emphasize(theme.palette.primary.main, 0.08),
    },
    '&:active': {
      backgroundColor: emphasize(theme.palette.primary.main, 0.12),
    },
  },
});

const DateButton = withStyles(buttonStyles)(props => {
  const { classes, date, selected, onClick, disabled } = props;

  return (
    <Button
      classes={{
        root: classes.root,
        label: classes.label,
        disabled: classes.disabled,
        containedPrimary: classes.containedPrimary,
      }}
      variant={selected ? 'contained' : 'text'}
      color={selected ? 'primary' : 'default'}
      onClick={onClick}
      disabled={disabled || date <= TODAY}
      disableRipple
    >
      <Typography variant="body2" color="inherit">
        {date.format('ddd')}
      </Typography>
      <Typography variant="h5" color="inherit" className={classes.date}>
        {date.format('D')}
      </Typography>
    </Button>
  );
});

const DateSelector = props => {
  const { selectedDate, setSelectedDate, dates, timeslots } = props;

  const [showNextWeek, setShowNextWeek] = useState(false);
  const thisWeek = dates.slice(0, 5);
  const nextWeek = dates.slice(5, 10);

  return (
    <>
      {thisWeek.map((d, i) => (
        <DateButton
          key={d.inspect()}
          date={d}
          selected={d.isSame(selectedDate)}
          onClick={() => {
            setSelectedDate(d);
          }}
          disabled={timeslots[i].length === 0}
        />
      ))}
      <br />
      {showNextWeek ? (
        nextWeek.map((d, i) => (
          <DateButton
            key={d.inspect()}
            date={d}
            selected={d.isSame(selectedDate)}
            onClick={() => {
              setSelectedDate(d);
            }}
            disabled={timeslots[i + 5].length === 0}
          />
        ))
      ) : (
        <Button
          color="primary"
          onClick={() => {
            setShowNextWeek(true);
          }}
        >
          Next week
          <DownIcon />
        </Button>
      )}
    </>
  );
};

export default DateSelector;
