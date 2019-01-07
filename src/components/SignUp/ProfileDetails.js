
import React from "react";
import PropTypes from "prop-types";

import Grid from 'sp2-material-ui/core/Grid'
import Skills from "../InputFields/Skills"
import CurrentUniversity from "../InputFields/CurrentUniversity";

function ProfileDetails(props){
    const {currentUniversity,careerInterests,skills,changeHandler} = props
    return(
        <Grid
      container
      direction="row"
      justify="space-between"
    >
  <Skills 
        interestKeys = {careerInterests}
        preSelectedList={skills} 
        changeHandler={changeHandler} />
      <CurrentUniversity value={currentUniversity} changeHandler={changeHandler}/>

    </Grid>
    )
}
ProfileDetails.propTypes = {
    changeHandler: PropTypes.func.isRequired,
    currentUniversity: PropTypes.string,
    skills: PropTypes.arrayOf(PropTypes.string),
    careerInterests: PropTypes.arrayOf(PropTypes.string),
  };
export default ProfileDetails