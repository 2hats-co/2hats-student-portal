import React from 'react';
import {UNIVERSITIES} from '../../constants/dialogFormFields'
import DropDown from './DropDown';
function CurrentUniversity(props){
    const {value,changeHandler,hasLabel} = props
    return(

        
        <DropDown
        hasLabel={hasLabel}
        title={"Current University or Institution"}
        label={"Current University or Institution"}
        name="currentUniversity"
        value={value}
        changeHandler={changeHandler}
        list={UNIVERSITIES('sydney')}
        hint={'We cater to current university and recent graduate students who have little professional experience.'}
      />
    )
}

export default CurrentUniversity