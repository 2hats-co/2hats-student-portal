import React from 'react';
import DropDown from '../InputFields/DropDown';
function Industy(props) {
  const { value, hasLabel, changeHandler } = props;
  return (
    <DropDown
      hasLabel={hasLabel}
      title={'Career Interests'}
      label={'Career Interests'}
      name="industry"
      value={value}
      changeHandler={changeHandler}
      list={['Business', 'Marketing', 'Design', 'IT', 'Other']}
      hint={'hint'}
    />
  );
}

export default Industy;
