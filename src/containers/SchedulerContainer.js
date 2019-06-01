import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';

import GoIcon from '@material-ui/icons/ArrowForward';

import withNavigation from '../components/withNavigation';
import DateSelector from '../components/Scheduler/DateSelector';
import TimeSelector from '../components/Scheduler/TimeSelector';

import { STYLES } from '@bit/sidney2hats.2hats.global.common-constants';
import { CLOUD_FUNCTIONS, cloudFunction } from '../utilities/CloudFunctions';
import { computeDates, computeTimeslots } from '../utilities/Scheduler';

const styles = theme => ({
  ...STYLES.DETAIL_VIEW(theme),

  root: {
    ...STYLES.DETAIL_VIEW(theme).root,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(5),
  },

  content: {
    margin: '0 auto',
    maxWidth: 340,
  },

  title: {
    ...STYLES.DETAIL_VIEW(theme).title,
    textAlign: 'left',
  },
});

const SchedulerContainer = props => {
  const { classes } = props;

  const [availableTimes, setAvailableTimes] = useState(null);
  const [dates, setDates] = useState(null);
  const [timeslots, setTimeslots] = useState(null);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');

  useEffect(() => {
    document.title = '2hats – Book an Interview';
  }, []);

  useEffect(() => {
    const inputData = {
      start: moment()
        .startOf('day')
        .toISOString(),
      end: moment()
        .startOf('day')
        .add(2, 'weeks')
        .add(3, 'days')
        .toISOString(),
      duration: 1000 * 60 * 10, // 10 minutes
    };

    cloudFunction(
      CLOUD_FUNCTIONS.CHECK_FREE_TIMESLOTS,
      inputData,
      o => {
        setAvailableTimes(
          o.data.map(x => ({
            start: moment(x.start),
            end: moment(x.end),
            duration: x.duration / 60 / 1000,
          }))
        );
        console.log(
          o.data.map(x => ({
            start: moment(x.start).toString(),
            end: moment(x.end).toString(),
            duration: x.duration / 60 / 1000,
          }))
        );
      },
      err => {
        console.error(err);
      }
    );
  }, []);

  useEffect(() => {
    if (availableTimes) {
      const computedDates = computeDates();
      const computedTimeslots = [];

      computedDates.forEach(x =>
        computedTimeslots.push(computeTimeslots(availableTimes, x))
      );

      setDates(computedDates);
      setTimeslots(computedTimeslots);
    }
  }, [availableTimes]);

  // reset selected time on date change
  useEffect(() => {
    setSelectedTime('');
  }, [selectedDate]);

  // submits two ISO strings of the 30-minute interval
  const submitBooking = () => {
    const date = selectedDate.format('DD-MM-YYYY');
    const startTime = selectedTime.split(' – ')[0];
    const endTime = selectedTime.split(' – ')[1];

    const startDt = moment(
      date + ' ' + startTime,
      'DD-MM-YYYY h:mm a'
    ).toISOString();
    const endDt = moment(
      date + ' ' + endTime,
      'DD-MM-YYYY h:mm a'
    ).toISOString();

    console.log(startDt, endDt);
  };

  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <Typography variant="h4" className={classes.title}>
          Book an Interview
        </Typography>
        {availableTimes && dates && timeslots ? (
          <>
            <div className={classes.section}>
              <Typography variant="h6" gutterBottom>
                Choose a date
              </Typography>
              <DateSelector
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                dates={dates}
                timeslots={timeslots}
              />
            </div>
            {selectedDate && (
              <>
                <div className={classes.section}>
                  <Typography variant="h6" gutterBottom>
                    Choose a time range
                  </Typography>
                  <TimeSelector
                    selectedTime={selectedTime}
                    setSelectedTime={setSelectedTime}
                    availableTimes={availableTimes}
                    timeslots={timeslots[dates.indexOf(selectedDate)]}
                  />
                </div>
                <div className={classes.section}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={submitBooking}
                    disabled={!selectedTime}
                  >
                    Book
                    <GoIcon />
                  </Button>
                </div>
              </>
            )}
          </>
        ) : (
          <div className={classes.section}>
            <LinearProgress />
          </div>
        )}
      </main>
    </div>
  );
};

SchedulerContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withNavigation(withStyles(styles)(SchedulerContainer));
