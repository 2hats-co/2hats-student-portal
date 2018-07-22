import React from 'react';
import DropDown from "../InputFields/DropDown";
function WorkingRights(props){
    const {value,hasLabel,changeHandler} = props
    return(
        <DropDown
        title={!hasLabel&&"Residency Status"}
        label={hasLabel&&"Residency Status"}
        name="workingRights"
        value={value}
        changeHandler={changeHandler}
        list={["Unrestricted - full working rights in Australia", "Restricted - 40 hours per fortnight"]}
        hint={!hasLabel&&"We accept candidates with both restricted and unrestricted working rights. Your answer will not impact your submission."}
      />
    )
}

export default WorkingRights