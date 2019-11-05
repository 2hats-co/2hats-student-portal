import React, { useState, useEffect } from 'react';
import moment from 'moment';

import { makeStyles, createStyles } from '@material-ui/core';
import { AccountDeletedComponentProps } from 'containers/AccountDeletedContainer';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      fontFeatureSettings: '"tnum" 1',
    },
  })
);

/**
 * A basic component to render the countdown. Every second, it calculates the
 * difference to the delete datetime using Moment. This is somewhat inefficient
 * and there should be a better way to do this.
 *
 * Note that since the countdown is initially set in an effect depending on
 * `userDeleteRequestDoc`, it will initially flash with 0 seconds.
 */
const Countdown: React.FunctionComponent<AccountDeletedComponentProps> = ({
  userDeleteRequestDoc,
}) => {
  const classes = useStyles();
  const [duration, setDuration] = useState<moment.Duration>(moment.duration());

  useEffect(() => {
    if (!userDeleteRequestDoc) return;

    const countdown = setInterval(() => {
      let deleteDt = moment(userDeleteRequestDoc.requestedAt.toDate())
        .startOf('day')
        .hours(12)
        .add(2, 'weeks');

      // If we passed the originally scheduled delete date, set to delete
      // at the next 12:00 (pm), in case of error
      if (deleteDt < moment()) {
        deleteDt = moment()
          .startOf('day')
          .hours(12);

        if (deleteDt < moment()) deleteDt.add(1, 'day');
      }

      setDuration(moment.duration(deleteDt.diff(moment())));
    }, 1000);

    return () => {
      clearInterval(countdown);
    };
  }, [userDeleteRequestDoc]);

  if (!userDeleteRequestDoc) return <>can still</>;

  return (
    <span className={classes.root}>
      have {duration.days()} days, {duration.hours()} hours,{' '}
      {duration.minutes()} minutes, and {duration.seconds()} seconds to
    </span>
  );
};

export default Countdown;
