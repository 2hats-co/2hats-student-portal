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
import HeadingCaps from '@bit/twohats.common.components.heading-caps';

const useStyles = makeStyles(theme =>
  createStyles({
    root: { marginTop: theme.spacing(0.5) },
    rightValueLabel: { fontFeatureSettings: '"tnum"' },
  })
);

interface ISliderFieldProps extends FieldProps, SliderProps {
  /** The field label */
  label: string;
  /** A function that changes how the right value display is formatted */
  rightValueFormat?: (value: number) => React.ReactNode;
}

const SliderField: React.FunctionComponent<ISliderFieldProps> = props => {
  const { field, form, label, rightValueFormat, ...restProps } = props;
  const classes = useStyles();

  const handleChange: SliderProps['onChange'] = (e, val) => {
    if (val !== field.value) form.setFieldValue(field.name, val);
  };

  return (
    <div>
      <FormLabel htmlFor={`field-${field.name}`}>
        <HeadingCaps
          component="span"
          color={
            form.errors[field.name] && form.touched[field.name]
              ? 'error'
              : 'textSecondary'
          }
        >
          {label}
        </HeadingCaps>
      </FormLabel>

      <Grid container spacing={3} className={classes.root}>
        <Grid item xs>
          <Slider
            name={field.name}
            value={field.value}
            onChange={handleChange}
            aria-label={label}
            {...restProps}
          />
        </Grid>

        <Grid item>
          <Typography
            variant="body1"
            color="primary"
            className={classes.rightValueLabel}
          >
            {rightValueFormat ? rightValueFormat(field.value) : field.value}
          </Typography>
        </Grid>
      </Grid>

      <ErrorMessage name={field.name}>
        {msg => <FormHelperText error>{msg}</FormHelperText>}
      </ErrorMessage>
    </div>
  );
};

export default SliderField;
