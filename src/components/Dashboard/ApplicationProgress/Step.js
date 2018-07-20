import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done"
import { PRIMARY_COLOR } from "../../../Theme";

const styles = theme => ({
  root:{
    height:30,
    width:215
  },
  progress: {
    margin: theme.spacing.unit * 2
  },
  label:{
 
  },
  incomplete:{
      width:20,
      height:20,
      borderRadius:10,
      backgroundColor:'#D8D8D8'
  },
  complete:{
    width:20,
    height:20,
    borderRadius:10,
    backgroundColor:PRIMARY_COLOR,
},doneIcon:{
  marign:'auto',
  fontSize:18,
  color:'#fff'
}

});
function Step(props){
    const { classes,label, isComplete} = props;
    const completedIndicator = (<div className={classes.complete}><DoneIcon className={classes.doneIcon}/></div>)
    const incompletedIndicator = (<div className={classes.incomplete}></div>)
    return (
      <Grid container 
      direction='row'
      justify='space-between' 
      alignItems='center' 
      className={classes.root} >
        <Typography variant='subheading' >
        {label}
        </Typography>
        {isComplete? completedIndicator:incompletedIndicator}
      </Grid>
      
    );
  }


  Step.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Step);
