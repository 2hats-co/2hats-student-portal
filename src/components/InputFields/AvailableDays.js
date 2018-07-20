import React from 'react';
import DropDown from "../InputFields/DropDown";
function AvailableDays(props){
    const {value,changeHandler} = props
    return(
        <DropDown
        title="Available Days"
        name="availableDays"
        value={value}
        changeHandler={changeHandler}
       // list={["1 Day","2 Days","3 Days","4 Days","5 Days"]}
        list={["1 Day","1½ Days","2 Days","2½ Days","3 Days","3½ Days","4 Days","4½ Days","5 Days"]}
        hint="How many days are you available to work per week"
      />
    )
}

export default AvailableDays