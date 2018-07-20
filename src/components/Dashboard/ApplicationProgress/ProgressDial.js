import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Typography } from "@material-ui/core";


const styles = theme => ({
  root:{
    height:180,
    width:180
  },
  progress: {
    margin: theme.spacing.unit * 2
  },
  label:{
    position:'absolute',
    marginLeft: 45,
    marginTop: 65
 
  }
});


function ProgressDial(props){
    const { classes,percentage} = props;
    return (
      <div className={classes.root} >
       <Typography className={classes.label} variant='display2'>{percentage}%</Typography>

        <CircularProgress
          className={classes.progress}
          variant="static"
          size={150}
          value={percentage}
        />
      </div>
      
    );
  }


ProgressDial.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProgressDial);
