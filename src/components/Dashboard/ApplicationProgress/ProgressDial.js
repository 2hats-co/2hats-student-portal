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
  circle: {
    position:'relative',

    margin: theme.spacing.unit * 2,
    color:'#979797',
    top:-115,
    left:0,
  },
  progress:{
    position:'relative',
    top:-283,
    left:18,
  },
  label:{
    position:'relative',
    width:190,
    paddingTop:65,
    textAlign:'center',
    fontSize:47
  }
});

function ProgressDial(props){
    const { classes,percentage} = props;
    return (
      <div className={classes.root} >
       <Typography className={classes.label} variant='display2'>{percentage}%</Typography>
         <CircularProgress
          thickness={0.5}
          className={classes.circle}
          variant="static" 
          size={150}
          value={100}
        />
         <CircularProgress
          thickness={2}
          className={classes.progress}
          variant="static" 
          size={152}
          value={percentage}
        />
      </div>
      
    );
  }
ProgressDial.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProgressDial);
