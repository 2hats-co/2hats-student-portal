import React from 'react';

import { IStyledTextFieldProps } from '../StyledTextField';
import MultiLocationField from './MultiLocationField';
import SingleLocationField from './SingleLocationField';

export interface ILocationFieldProps extends IStyledTextFieldProps {
  /** Whether or not multiple locations can be selected in the field */
  multiple: boolean;
  /** Multiple field: display All cities in country option */
  showAll?: boolean;
  /** Display Other city in country option */
  showOther?: boolean;
}

const LocationField: React.FunctionComponent<ILocationFieldProps> = ({
  multiple = false,
  showAll,
  showOther,
  ...restProps
}) =>
  multiple ? (
    <MultiLocationField
      showAll={showAll}
      showOther={showOther}
      {...restProps}
    />
  ) : (
    <SingleLocationField showOther={showOther} {...restProps} />
  );

export default LocationField;
