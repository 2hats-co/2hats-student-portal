
import React from "react";
import PropTypes from "prop-types";

import Grid from 'sp2-material-ui/core/Grid'
import Typography from "sp2-material-ui/core/Typography";
 const completedMessage = {
  build:'You have filled all mandatory fields to build your resume using our guided processes.',
  upload:'You have filled all mandatory fields to upload your resume.'
}
function Completed(props){
    const {process} = props
    return(
        <Grid
        container
        direction='column'
        justify='space-around'
        style={{ height: 100 }}
      >
        <Typography variant="title" color="primary">
          Congratulations!
        </Typography>
        <Typography variant="body1">
          {completedMessage[process]}
        </Typography>
        <Typography variant="body1">
          You can submit your resume for our review now.
        </Typography>
      </Grid>
    )
}
Completed.propTypes = {
    process: PropTypes.string.isRequired,
  };
export default Completed