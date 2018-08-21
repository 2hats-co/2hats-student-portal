import React from 'react';
import DropDown from "../InputFields/DropDown";
function WorkingRights(props){
    const {value,hasLabel,changeHandler,maxWidth} = props
    return(
        <DropDown
        hasLabel={hasLabel}
        maxWidth ={maxWidth}
        title={"Work Condition"}
        label={"Work Condition"}
        name="workingRights"
        value={value}
        changeHandler={changeHandler}
        list={["Unrestricted - full working rights in Australia", "Restricted - up to 40 hours per fortnight"]}
        hint={"We accept candidates with both restricted and unrestricted working rights. Your answer will not impact your submission."}
      />
    )
}

export default WorkingRights