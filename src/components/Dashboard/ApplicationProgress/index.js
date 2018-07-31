import React from 'react';
import Typography from '@material-ui/core/Typography'
import { withStyles } from "@material-ui/core/styles";
import { Grid,Button} from '@material-ui/core';
import ProgressDial from './ProgressDial'
import Step from './Step'
import {PROCESS_TYPES, STEP_LABELS, checkComplition} from '../../../constants/signUpProcess'


const styles = theme => ({
    root: {
     width:'100%',
  
    },
    ProgressGrid:{
      width:'100%',
    }
  });
  class ApplicationProgress extends React.Component{

  completitionPercentage(data){
    const allSteps = STEP_LABELS[data.process]
    const completed = allSteps.filter(x =>!checkComplition(x,data))
    const percentage =  (completed.length/allSteps.length)*100
    return percentage
  }

  render(){
    const {classes,data} = this.props
    const {process} =data
    const steps = (<Grid container direction='column'> {STEP_LABELS[process].map(x=><Step key={x} label={x} isComplete={!checkComplition(x,data)}/>)}</Grid>)
    return(<div className={classes.root}>
    
    <Grid className={classes.ProgressGrid} container  alignItems='center' direction='row' justify='space-around'>
    <Grid item   xs={12} sm={12}>
    <Typography variant='display1'>
      Application Progress
    </Typography>
    </Grid>

        <Grid item   xs={12} sm={6}>
             <ProgressDial percentage={this.completitionPercentage(data)}/>
          </Grid>

             <Grid item   xs={12} sm={6}>
              {steps}
              </Grid>
    </Grid>
  
   </div>)
}
  }
export default withStyles(styles)(ApplicationProgress)
