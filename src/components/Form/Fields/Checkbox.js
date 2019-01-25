import React from 'react';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MuiCheckbox from '@material-ui/core/Checkbox';

const Checkbox = props => {
  const { label, name, formikProps, validator } = props;
  const { handleChange, values } = formikProps;

  return (
    <FormGroup style={{ paddingLeft: 4 }}>
      <FormControlLabel
        control={
          <MuiCheckbox
            checked={values[name]}
            onChange={handleChange}
            name={name}
          />
        }
        label={label}
      />
      {validator(name)}
    </FormGroup>
  );
};

export default Checkbox;
