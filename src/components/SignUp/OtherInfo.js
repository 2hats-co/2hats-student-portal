
import React from "react";
import PropTypes from "prop-types";

import Grid from '@material-ui/core/Grid'
import PhoneNumber from "../InputFields/PhoneNumber";
import WorkingRights from "../InputFields/WorkingRights";
import AvailableDays from "../InputFields/AvailableDays";

function otherInfo(props){
    const {workingRights,availableDays,phoneNumber,changeHandler} = props
    return(
        <Grid
      container
      direction="row"
      justify="space-between"
      style={{ height: 270}}
    >
       {
        <AvailableDays value={availableDays} maxWidth={400} changeHandler={changeHandler}/>
      }
      <WorkingRights value={workingRights} maxWidth={400} changeHandler={changeHandler}/>
     
      <PhoneNumber value={phoneNumber} maxWidth={400} changeHandler={changeHandler} />
    </Grid>
    )
}

otherInfo.propTypes = {
    changeHandler: PropTypes.func.isRequired,
    workingRights: PropTypes.string,
    phoneNumber: PropTypes.string,

  };
export default otherInfo