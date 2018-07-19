
import React from "react";
import PropTypes from "prop-types";

import Grid from '@material-ui/core/Grid'
import Typography from "@material-ui/core/Typography";
function Completed(props){
    const {process} = props
    return(
        <Grid
        container
        direction="row"
        justify="spacing-between"
        style={{ height: 100 }}
      >
        <Typography variant="title" color="primary" component="h3">
          Congratulations!
        </Typography>
        <Typography variant="body">
          You have filled all mandatory fields to build your resume using our
          guided processes.
        </Typography>
        <Typography variant="body">
          You can submit your resume for our review now.
        </Typography>
      </Grid>
    )
}
Completed.propTypes = {
    process: PropTypes.string.isRequired,
  };
export default Completed