import React from 'react';
import DropDown from "../InputFields/DropDown";
function WorkingRights(props){
    const {value,changeHandler} = props
    return(
        <DropDown
        title="Working Rights"
        name="workingRights"
        value={value}
        changeHandler={changeHandler}
        options={["Unrestricted", "Restricted (<40 hours per fortnight)"]}
        hint="We accept candidates with both restricted and unrestricted working rights. Your answer will not impact your submission."
      />
    )
}

export default WorkingRights