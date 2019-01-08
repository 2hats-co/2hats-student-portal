import React from 'react';
import AutoComplete from '../InputFields/AutoComplete';
import { UNIVERSITIES } from '../../constants/universityList';
function CurrentUniversity(props) {
  const { value, hasLabel, changeHandler } = props;
  return (
    <AutoComplete
      hasLabel={hasLabel}
      title={'Current University'}
      label="Current University"
      name="currentUniversity"
      value={value}
      changeHandler={changeHandler}
      list={UNIVERSITIES}
      hint={
        'We cater to current university and recent graduate students who have little professional experience.'
      }
    />
  );
}

export default CurrentUniversity;
