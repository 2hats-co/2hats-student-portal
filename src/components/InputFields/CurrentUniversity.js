import React from 'react';
import DropDown from "../InputFields/DropDown";
import {UNIVERSITIES} from '../../constants/dialogFormFields'
function CurrentUniversity(props){
    const {value,changeHandler} = props
    return(
        <DropDown
        title="Current University or Institution"
        name="currentUniversity"
        value={value}
        changeHandler={changeHandler}
        options={UNIVERSITIES('sydney')}
        hint="We accept candidates with both restricted and unrestricted working rights. Your answer will not impact your submission."
      />
    )
}

export default CurrentUniversity