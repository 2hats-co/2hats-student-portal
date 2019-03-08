import moment from 'moment';

export const TODAY = moment().startOf('day');

export const computeDates = () => {
  const dates = [];

  // Get start of week (Monday)
  // If Fri/Sat/Sun then start selection from next Monday
  if (TODAY.isoWeekday() >= 5)
    dates.push(
      TODAY.clone()
        .add(1, 'week')
        .startOf('isoWeek')
    );
  else dates.push(TODAY.clone().startOf('isoWeek'));

  for (let i = 0; i < 4; i++) dates.push(dates[i].clone().add(1, 'day'));

  // Get start of next week
  dates.push(dates[0].clone().add(1, 'week'));
  for (let i = 5; i < 9; i++) dates.push(dates[i].clone().add(1, 'day'));

  return dates;
};

export const computeTimeslots = (availableTimes, selectedDate) => {
  const availableTimesThisDay = availableTimes.filter(
    x =>
      x.duration >= 10 &&
      x.start
        .clone()
        .startOf('day')
        .isSameOrBefore(selectedDate) &&
      x.end
        .clone()
        .startOf('day')
        .isSameOrAfter(selectedDate)
  );

  const timeslots = [];

  // start at 10 am
  let currentTime = selectedDate
    .clone()
    .startOf('day')
    .hours(10);

  // end at 5 pm
  while (
    currentTime.isBefore(
      selectedDate
        .clone()
        .startOf('day')
        .hours(17)
    )
  ) {
    const currentHour = currentTime.clone().add(1, 'hour');
    // loop through from :00 :10 :20 :30 :40 :50
    while (currentTime.isBefore(currentHour)) {
      // 30-minute time bracket
      const timeBracketStart = currentTime
        .clone()
        .minutes(currentTime.minutes() < 30 ? 0 : 30);
      const timeBracketEnd = timeBracketStart.clone().add(30, 'minutes');
      const timeBracket = `${timeBracketStart.format(
        'h:mm a'
      )} – ${timeBracketEnd.format('h:mm a')}`;

      // loop through each of availableTimesThisDay
      for (let j = 0; j < availableTimesThisDay.length; j++) {
        const x = availableTimesThisDay[j];
        // check if :00 and :10 is between start & end times
        if (
          currentTime.isBetween(x.start, x.end) &&
          currentTime
            .clone()
            .add(10, 'minutes')
            .isBetween(x.start, x.end)
        ) {
          timeslots.push(timeBracket);
          break;
        }
      }
      // if current time bracket is already there, skip to next bracket
      if (timeslots.includes(timeBracket))
        currentTime.minutes() >= 30
          ? currentTime.minutes(0).add(1, 'hour')
          : currentTime.minutes(30);
      // otherwise, check next 10 minutes
      else currentTime.add(10, 'minutes');
    }
  }

  return timeslots;
};
