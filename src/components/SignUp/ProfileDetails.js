
import React from "react";
import PropTypes from "prop-types";

import Grid from '@material-ui/core/Grid'
import Skills from "../InputFields/Skills"
import CurrentUniversity from "../InputFields/CurrentUniversity";

function ProfileDetails(props){
    const {currentUniversity,interests,skills,changeHandler} = props
    return(
        <Grid
      container
      direction="row"
      justify="space-between"
    >
      <CurrentUniversity value={currentUniversity} changeHandler={changeHandler}/>
      <Skills 
        interestKeys = {interests}
        preSelectedList={skills} 
        changeHandler={changeHandler} />
    </Grid>
    )
}
ProfileDetails.propTypes = {
    changeHandler: PropTypes.func.isRequired,
    currentUniversity: PropTypes.string,
    skills: PropTypes.arrayOf(PropTypes.string),
    interests: PropTypes.arrayOf(PropTypes.string),
  };
export default ProfileDetails