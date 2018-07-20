import React from 'react';
import Typography from '@material-ui/core/Typography'
import { withStyles } from "@material-ui/core/styles";
import { Grid,Button} from '@material-ui/core';
import ProgressDial from './ProgressDial'
import Step from './Step'
import {PROCESS_TYPES, STEP_LABELS} from '../../../constants/signUpProcess'

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
  render(){
    const {classes} = this.props
    const currentProcess = PROCESS_TYPES.upload
    const steps = (<Grid direction='column'> {STEP_LABELS[currentProcess].map(x=><Step label={x} isComplete={false}/>)}</Grid>)
    const finishButton = (<Button
        className={classes.button}
        variant="flat"
      onClick={()=>{
        let route = routes.BUILD_RESUME
        if(currentProcess === PROCESS_TYPES.upload){
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
         
             <ProgressDial percentage={80}/>
              {steps}

    </Grid>
    <Grid className={classes.buttonsGrid} container direction='row' justify='space-between'>
        {currentProcess===PROCESS_TYPES.upload?buildButton:uploadButton}
        {finishButton}
    </Grid>
   <SwitchDialog isOpen={this.state.switchDialog} currentProcess={currentProcess} closeHandler={this.handleRouting}/>
   </div>)
}
  }

export default withRouter(withStyles(styles)(ApplicationProgress))
