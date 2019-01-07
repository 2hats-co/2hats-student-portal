import React from "react";
import PropTypes from "prop-types";

import Grid from 'sp2-material-ui/core/Grid'
import PersonalBio from "../InputFields/PersonalBio"
import ResumeLoader from "../InputFields/ResumeLoader";

function UploadResume(props){
    const {bio,industry,resumeFile,changeHandler} = props
    return(
        <Grid
      container
      direction="row"
      justify="space-between"
    >
    <ResumeLoader resumeFile={resumeFile} changeHandler={changeHandler}/>
     
    </Grid>
    )
}
UploadResume.propTypes = {
    changeHandler: PropTypes.func.isRequired,
    bio: PropTypes.string,
  };
export default UploadResume