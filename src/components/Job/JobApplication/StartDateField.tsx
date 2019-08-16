import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { ErrorMessage, FieldProps } from 'formik';

import {
  MuiPickersUtilsProvider,
  DatePicker,
  MaterialUiPickersDate,
} from '@material-ui/pickers';
import DropdownIcon from '@material-ui/icons/KeyboardArrowDown';
import MomentUtils from '@date-io/moment';

import {
  makeStyles,
  createStyles,
  FormLabel,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  InputAdornment,
  Radio,
  Grid,
  FormHelperText,
} from '@material-ui/core';

const useStyles = makeStyles(theme =>
  createStyles({
    startDateLabel: { marginRight: theme.spacing(1) },
    filledInputRoot: { cursor: 'pointer' },
    filledInput: { cursor: 'inherit' },

    datePickerWrapperLabel: {
      paddingTop: 0,
      paddingBottom: 0,
    },
  })
);

interface IStartDateFieldProps extends FieldProps {}

const StartDateField: React.FunctionComponent<IStartDateFieldProps> = ({
  field,
  form,
}) => {
  const classes = useStyles();

  const nextMonth = moment()
    .startOf('month')
    .add(1, 'month');

  // Store the state of controlled input components below here
  // Whent he field.value changes, this entire component will be REMOUNTED
  // so using the default values in state is fine and everything will sync up
  const [radioValue, setRadioValue] = useState(
    field.value ? (field.value <= new Date() ? 'immediate' : 'date') : ''
  );
  const [datePickerValue, setDatePickerValue] = useState<MaterialUiPickersDate>(
    // Set the minimum of datePickerValue to be nextMonth
    field.value && field.value > nextMonth ? moment(field.value) : nextMonth
  );

  // Send the user selected value back up to Formik
  useEffect(() => {
    let correctValue;
    // If immediate, set to current month
    if (radioValue === 'immediate' && datePickerValue !== null)
      correctValue = moment()
        .startOf('month')
        .toDate();
    // If date...
    else if (radioValue === 'date')
      correctValue = datePickerValue
        ? datePickerValue.toDate() // Otherwise set to the user selection
        : nextMonth.toDate(); // Otherwise default to next month
    // Otherwise, leave as undefined (user has made no selection)

    // Prevent infinite loops
    // Update if one of which is undefined
    if (typeof correctValue !== typeof field.value)
      form.setFieldValue(field.name, correctValue);
    // Otherwise, update if dates are different
    else if (
      correctValue instanceof Date &&
      field.value instanceof Date &&
      correctValue.getTime() !== field.value.getTime()
    )
      form.setFieldValue(field.name, correctValue);
  }, [radioValue, datePickerValue]);

  return (
    <div>
      <FormLabel htmlFor="field-jobAvailabilityStartDate">
        <Typography variant="overline" color="textSecondary">
          When I Can Start
        </Typography>
      </FormLabel>

      <MuiPickersUtilsProvider utils={MomentUtils}>
        <FormControl component="fieldset" id="field-jobAvailabilityStartDate">
          <RadioGroup
            aria-label="Job Availability Start Date"
            name={field.name}
            value={radioValue}
            onChange={e => setRadioValue((e.target as HTMLInputElement).value)}
          >
            <FormControlLabel
              value="immediate"
              control={<Radio />}
              label="I am able to start at the moment"
            />
            <FormControlLabel
              value="date"
              control={<Radio />}
              classes={{ label: classes.datePickerWrapperLabel }}
              label={
                <Grid container alignItems="center">
                  <span className={classes.startDateLabel}>I can start in</span>
                  <DatePicker
                    // Input config
                    views={['year', 'month']}
                    minDate={nextMonth}
                    maxDate={nextMonth.clone().add(6, 'months')}
                    disabled={radioValue !== 'date'}
                    // Save value
                    value={datePickerValue}
                    onChange={date => setDatePickerValue(date)}
                    // Styling
                    inputVariant="filled"
                    hiddenLabel
                    margin="none"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <DropdownIcon />
                        </InputAdornment>
                      ),
                      classes: {
                        root: classes.filledInputRoot,
                        input: classes.filledInput,
                      },
                    }}
                  />
                </Grid>
              }
            />
          </RadioGroup>
        </FormControl>
      </MuiPickersUtilsProvider>

      <ErrorMessage name={field.name}>
        {msg => <FormHelperText error>{msg}</FormHelperText>}
      </ErrorMessage>
    </div>
  );
};

export default StartDateField;
