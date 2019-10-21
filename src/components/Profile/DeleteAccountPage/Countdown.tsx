import React, { useState, useEffect } from 'react';
import moment from 'moment';

import { AccountDeletedComponentProps } from 'containers/AccountDeletedContainer';

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
  const [duration, setDuration] = useState<moment.Duration>(moment.duration());

  useEffect(() => {
    if (!userDeleteRequestDoc) return;

    const countdown = setInterval(() => {
      const deleteDt = moment(userDeleteRequestDoc.requestedAt.toDate())
        .startOf('day')
        .hours(12)
        .add(2, 'weeks');

      setDuration(moment.duration(deleteDt.diff(moment())));
    }, 1000);

    return () => {
      clearInterval(countdown);
    };
  }, [userDeleteRequestDoc]);

  if (!userDeleteRequestDoc) return <>can still</>;

  return (
    <>
      have {duration.days()} days, {duration.hours()} hours,{' '}
      {duration.minutes()} minutes, and {duration.seconds()} seconds to
    </>
  );
};

export default Countdown;
