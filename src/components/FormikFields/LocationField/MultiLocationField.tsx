import React from 'react';

import {
  makeStyles,
  createStyles,
  MenuItem,
  ListItemIcon,
  Divider,
} from '@material-ui/core';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

import StyledTextField, { IStyledTextFieldProps } from '../StyledTextField';

import {
  CITIES,
  CITIES_OPTIONS,
  CITIES_ALL,
  CITIES_OTHER,
} from '@bit/twohats.common.constants';

const useStyles = makeStyles(theme =>
  createStyles({
    divider: { margin: theme.spacing(1, 0) },
  })
);

export interface IMultiLocationFieldProps extends IStyledTextFieldProps {
  /** Multiple field: display All cities in country option */
  showAll?: boolean;
  /** Display Other city in country option */
  showOther?: boolean;
}

const MultiLocationField: React.FunctionComponent<IMultiLocationFieldProps> = ({
  field,
  form,
  showAll = true,
  showOther = false,
  ...restProps
}) => {
  const classes = useStyles();

  const { name } = field;
  const value = form.values[name];

  return (
    <StyledTextField
      {...restProps}
      select
      SelectProps={{
        multiple: true,
        renderValue: (selected: any) =>
          selected.map((option: string) => JSON.parse(option).city).join(', '),
      }}
      field={{
        ...field,
        onChange: (e: React.ChangeEvent<any>) =>
          form.setFieldValue(
            name,
            e.target.value.map((option: string) => JSON.parse(option))
          ),
        value: value.map((option: typeof CITIES_OPTIONS) =>
          JSON.stringify(option)
        ),
      }}
      form={form}
    >
      {CITIES_OPTIONS.map(option => (
        <MenuItem key={option.value} value={option.value}>
          <ListItemIcon>
            {value
              .map((selectedValue: typeof CITIES[number]) =>
                JSON.stringify(selectedValue)
              )
              .indexOf(option.value) > -1 ? (
              <CheckBoxIcon />
            ) : (
              <CheckBoxOutlineBlankIcon />
            )}
          </ListItemIcon>
          {option.label}
        </MenuItem>
      ))}

      {(showOther || showAll) && <Divider className={classes.divider} />}

      {showAll && (
        <MenuItem
          key={CITIES_ALL}
          value={JSON.stringify({ city: CITIES_ALL, country: 'AU' })}
        >
          <ListItemIcon>
            <CheckBoxOutlineBlankIcon />
          </ListItemIcon>
          All cities in Australia
        </MenuItem>
      )}

      {showOther && (
        <MenuItem
          key={CITIES_OTHER}
          value={JSON.stringify({ city: CITIES_OTHER, country: 'AU' })}
        >
          <ListItemIcon>
            <CheckBoxOutlineBlankIcon />
          </ListItemIcon>
          Other city in Australia
        </MenuItem>
      )}
    </StyledTextField>
  );
};

export default MultiLocationField;
