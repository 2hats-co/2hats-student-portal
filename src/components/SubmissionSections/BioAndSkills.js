
import React from "react";
import Grid from '@material-ui/core/Grid'
import PersonalBio from "../InputFields/PersonalBio";
import Skills from "../InputFields/Skills";
function BioAndSkills(props){
    const {industry,bio,skills,interests,changeHandler} = props
    return(
        <Grid
        container
        direction="row"
        justify="space-between"
        style={{ height: 275, width: 400 }}
      >
        <PersonalBio
          industry={industry}
          bio={bio}
          changeHandler={changeHandler}
        />
        <Skills 
        interestKeys = {interests}
        preSelectedList={skills} 
        changeHandler={changeHandler} />
      </Grid>
    )
}
    
export default BioAndSkills