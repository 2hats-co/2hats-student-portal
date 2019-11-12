import React from 'react';

import { ListItemIcon } from '@material-ui/core';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

import { CITIES } from '@bit/twohats.common.constants';

interface IListItemCheckBoxProps {
  /** The value of the LocationField */
  fieldValue: typeof CITIES;
  /** The option rendered with this `ListItemCheckBox`. From CITIES_OPTIONS */
  option: string;
}

/**
 * Displays a checkbox that shows whether the current value is selected or not.
 * Can only be used in [`MultiLocationField`](#multilocationfield), since
 * it assumes `fieldValue` is an **array of objects**.
 */
const ListItemCheckBox: React.FunctionComponent<IListItemCheckBoxProps> = ({
  fieldValue,
  option,
}) => (
  <ListItemIcon>
    {fieldValue
      .map((selectedValue: {}) => JSON.stringify(selectedValue))
      .indexOf(option) > -1 ? (
      <CheckBoxIcon />
    ) : (
      <CheckBoxOutlineBlankIcon />
    )}
  </ListItemIcon>
);

export default ListItemCheckBox;
