import React from 'react';
import { FieldProps, ErrorMessage } from 'formik';

import {
  makeStyles,
  createStyles,
  Grid,
  Slider,
  FormLabel,
  Typography,
  FormHelperText,
} from '@material-ui/core';
import { SliderProps } from '@material-ui/core/Slider';

import { DocWithId, JobsDoc, UsersJobsDoc } from '@bit/twohats.common.db-types';

const useStyles = makeStyles(theme =>
  createStyles({
    root: { marginTop: theme.spacing(0.5) },
    rightValueLabel: { fontFeatureSettings: '"tnum"' },
  })
);

interface IPaySliderFieldProps extends FieldProps {
  jobData: DocWithId<JobsDoc> | DocWithId<UsersJobsDoc>;
}

const PaySliderField: React.FunctionComponent<IPaySliderFieldProps> = ({
  field,
  form,
  jobData,
}) => {
  const classes = useStyles();

  const matchedNumber = jobData.payRate.match(/\d+/);
  const minPayRate = Number(matchedNumber ? matchedNumber[0] : 0);

  const handleChange: SliderProps['onChange'] = (e, val) => {
    if (val !== field.value) form.setFieldValue(field.name, val);
  };

  const getValueText: SliderProps['getAriaValueText'] = value => `${value}%`;

  return (
    <div>
      <FormLabel htmlFor="field-pay">
        <Typography
          variant="overline"
          color={
            form.errors[field.name] && form.touched[field.name]
              ? 'error'
              : 'textSecondary'
          }
        >
          My Preferred Salary
        </Typography>
      </FormLabel>

      <Grid container spacing={3} className={classes.root}>
        <Grid item xs>
          <Slider
            name={field.name}
            value={field.value}
            onChange={handleChange}
            defaultValue={100}
            min={100}
            max={150}
            step={10}
            getAriaValueText={getValueText}
            valueLabelFormat={getValueText}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            marks
          />
        </Grid>

        <Grid item>
          <Typography
            variant="body1"
            color="primary"
            className={classes.rightValueLabel}
          >
            ${(minPayRate * field.value) / 100}/
            {jobData.payUnits.replace('per ', '')} ({field.value}%)
          </Typography>
        </Grid>
      </Grid>

      <ErrorMessage name={field.name}>
        {msg => <FormHelperText error>{msg}</FormHelperText>}
      </ErrorMessage>
    </div>
  );
};

export default PaySliderField;
