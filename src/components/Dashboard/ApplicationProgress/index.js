import React from 'react';
import Typography from '@material-ui/core/Typography'
import { withStyles } from "@material-ui/core/styles";
import { Grid,Button} from '@material-ui/core';
import ProgressDial from './ProgressDial'
import Step from './Step'
import {PROCESS_TYPES, STEP_LABELS, checkComplition} from '../../../constants/signUpProcess'

import {withRouter} from 'react-router-dom'
import * as routes from '../../../constants/routes'
import SwitchDialog from './SwitchDialog'
const styles = theme => ({
    root: {
     width:530,
     height:300
    },
    ProgressGrid:{
      width:500,
      height:200
    },
    buttonsGrid:{
    width: 485,
    height:40   
    },
    button:{
        width:230,height:35
    }
  });
  class ApplicationProgress extends React.Component{
   constructor(props){
    super(props);
     this.state = {
        switchDialog:false
     }
  
    this.handleRouting = this.handleRouting.bind(this)
   }
    handleRouting = (route) => {
      console.log('route',route)
      if(route){
        this.props.history.push(route)
      }else{
        this.setState({switchDialog:false})
      }
  };
  completitionPercentage(data){
    const allSteps = STEP_LABELS[data.process]
    const completed = allSteps.filter(x =>!checkComplition(x,data))
    const percentage =  (completed.length/allSteps.length)*100
    return percentage
  }

  render(){
    const {classes,data} = this.props
    const {process} =data
    console.log(data)
    const steps = (<Grid container direction='column'> {STEP_LABELS[process].map(x=><Step key={x} label={x} isComplete={!checkComplition(x,data)}/>)}</Grid>)
    const finishButton = (<Button
        className={classes.button}
        variant="flat"
      onClick={()=>{
        let route = routes.BUILD_RESUME
        if(process === PROCESS_TYPES.upload){
          route = routes.UPLOAD_RESUME
        }
        this.handleRouting(route)}}
      >
      Finish Application
      </Button>)

       const buildButton = (<Button
        className={classes.button}
        variant="outlined"
        onClick={()=>{this.setState({switchDialog:true})}}
      >
        Build Resume Instead
      </Button>)

      const uploadButton = (<Button
        className={classes.button}
        variant="outlined"
        onClick={()=>{this.setState({switchDialog:true})}}
      >
        Upload Resume Instead
      </Button>)
    return(<div className={classes.root}>
    <Typography variant='display1'>
   Application Progress
    </Typography>
    <Grid className={classes.ProgressGrid} container  alignItems='center' direction='row' justify='space-around'>
         
             <ProgressDial percentage={this.completitionPercentage(data)}/>
             <Grid item>
              {steps}
              </Grid>

    </Grid>
    <Grid className={classes.buttonsGrid} container direction='row' justify='space-between'>
        {process===PROCESS_TYPES.upload?buildButton:uploadButton}
        {finishButton}
    </Grid>
   <SwitchDialog isOpen={this.state.switchDialog} currentProcess={process} closeHandler={this.handleRouting}/>
   </div>)
}
  }

export default withRouter(withStyles(styles)(ApplicationProgress))
