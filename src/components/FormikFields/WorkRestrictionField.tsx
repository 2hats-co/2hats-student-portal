import React from 'react';
import { FieldProps } from 'formik';

import { FormLabel, Typography, Grid, MenuItem } from '@material-ui/core';
import { TextField } from 'formik-material-ui';

import HeadingCaps from '@bit/twohats.common.components.heading-caps';
import HelpPopup from '@bit/twohats.common.components.help-popup';

import {
  WORK_RESTRICTIONS,
  WORK_RESTRICTIONS_LABELS,
} from '@bit/twohats.common.constants';

interface IWorkRestrictionFieldProps extends FieldProps {}

/**
 * User selects either restricted or unrestricted
 */
const WorkRestrictionField: React.FunctionComponent<
  IWorkRestrictionFieldProps
> = ({ form, field }) => (
  <div>
    <FormLabel htmlFor={`field-${field.name}`}>
      <Grid container alignItems="center">
        <HeadingCaps
          component="span"
          color={
            form.errors[field.name] && form.touched[field.name]
              ? 'error'
              : 'textSecondary'
          }
        >
          Work Condition
        </HeadingCaps>
        <HelpPopup
          variant="besideOverline"
          message="We do not judge job applications based on working conditions or restrictions. "
        />
      </Grid>
    </FormLabel>

    <TextField
      field={field}
      form={form}
      variant="filled"
      fullWidth
      hiddenLabel
      margin="none"
      label=""
      inputProps={{ id: `field-${field.name}` }}
      select
      aria-label="Work Condition"
      SelectProps={{
        displayEmpty: true,
        renderValue: value => {
          const castedValue = value as string;
          if (castedValue === 'restricted' || castedValue === 'unrestricted')
            return WORK_RESTRICTIONS_LABELS[castedValue];

          return <Typography color="textSecondary">Choose one…</Typography>;
        },
      }}
    >
      {WORK_RESTRICTIONS.map((x: 'restricted' | 'unrestricted') => (
        <MenuItem key={x} value={x}>
          {WORK_RESTRICTIONS_LABELS[x]}
        </MenuItem>
      ))}
    </TextField>
  </div>
);

export default WorkRestrictionField;
