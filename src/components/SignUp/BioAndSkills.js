
import React from "react";
import PropTypes from "prop-types";

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
        style={{width: '100%' }}
      >
         <Skills 
        interestKeys = {interests}
        preSelectedList={skills} 
        changeHandler={changeHandler}/>
        <PersonalBio
          industry={industry}
          bio={bio}
          changeHandler={changeHandler}
        />
     
      </Grid>
    )
}

BioAndSkills.propTypes = {
    changeHandler: PropTypes.func.isRequired,
    industry: PropTypes.string.isRequired,
    bio: PropTypes.string,
    skills: PropTypes.arrayOf(PropTypes.string),
    interests: PropTypes.arrayOf(PropTypes.string).isRequired,
  };
export default BioAndSkills