import React from "react";
import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import green from '@material-ui/core/colors/green';
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
    top:-284,
    left:13,
  },
  label:{
    position:'relative',
    width:190,
    paddingTop:65,
    textAlign:'center',
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
          size={155}
          style={(percentage===100)?{color:green[400]}:{}}

          value={percentage}
        />
      </div>
      
    );
  }
ProgressDial.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProgressDial);
