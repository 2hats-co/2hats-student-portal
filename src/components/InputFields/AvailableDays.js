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
        options={["1 Day","2 Days","3 Days","4 Days","5 Days"]}
       // options={["1 Day","1.5 Days","2 Days","2.5 Days","3 Days","3.5 Days","4 Days","4.5 Days","5 Days"]}
        hint="How many days are you available to work per week"
      />
    )
}

export default AvailableDays