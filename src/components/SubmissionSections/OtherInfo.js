
import React from "react";
import Grid from '@material-ui/core/Grid'
import PhoneNumber from "../InputFields/PhoneNumber";
import WorkingRights from "../InputFields/WorkingRights";

function otherInfo(props){
    const {workingRights,phoneNumber,changeHandler} = props
    return(
        <Grid
      container
      direction="row"
      justify="space-between"
      style={{ height: 200 }}
    >
      <WorkingRights value={workingRights} changeHandler={changeHandler}/>
      <PhoneNumber value={phoneNumber} changeHandler={changeHandler} />
    </Grid>
    )
}
    
export default otherInfo