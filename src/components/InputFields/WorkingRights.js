import React from 'react';
import DropDown from "../InputFields/DropDown";
function WorkingRights(props){
    const {value,changeHandler} = props
    return(
        <DropDown
        title="Residency Status"
        name="workingRights"
        value={value}
        changeHandler={changeHandler}
        options={["Unrestricted - full working rights in Australia", "Restricted - 40 hours per fortnight"]}
        hint="Do you have a visa that restricts you from having full working rights in Australia?"
      />
    )
}

export default WorkingRights