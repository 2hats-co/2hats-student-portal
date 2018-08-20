import React from 'react';
import Typography from '@material-ui/core/Typography'
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { Grid,Button} from '@material-ui/core';
import ProgressDial from './ProgressDial'
import Step from './Step'
import {PROCESS_TYPES, STEP_LABELS, checkComplition,isComplete} from '../../../constants/signUpProcess'

import * as routes from '../../../constants/routes'
const styles = theme => ({
    root: {
     width:'100%',
    },
    ProgressGrid:{
      width:'100%',
      maxWidth:600, 
    },
    button:{
      width:230,
      height:35
    }
  });
  class ApplicationProgress extends React.Component{
    constructor(props){
      super(props)
      this.goTo = this.goTo.bind(this)
      this.handleContinue = this.handleContinue.bind(this)
    }
  goTo(route){
    this.props.history.push(route)
  }
  completitionPercentage(data){
    const allSteps = STEP_LABELS[data.process]
    const completed = allSteps.filter(x =>!checkComplition(x,data))
    const percentage =  Math.round((completed.length/allSteps.length)*100)
    return percentage
  }
  handleContinue(){
    const {process,isComplete} = this.props.data
    if(isComplete){
      this.goTo(routes.PROFILE)
    }else{
     
        if(process === PROCESS_TYPES.build){
          this.goTo(routes.BUILD_RESUME)
        }else{
          this.goTo(routes.UPLOAD_RESUME)      
        }
    }
    
  }
  render(){
    const {classes,data} = this.props
    const {process} = data
    console.log(data)
    const steps = (<Grid container direction='column'> {STEP_LABELS[process].map(x=><Step key={x} process={process} label={x} isComplete={!checkComplition(x,data)}/>)}</Grid>)
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
              <Button className={classes.button} variant='flat' onClick={this.handleContinue}>
              {isComplete(data)?`Preview for Submission`:`Continue Application`}
              </Button>
    </Grid>
  
   </div>)
}
  }
export default withRouter(withStyles(styles)(ApplicationProgress))
