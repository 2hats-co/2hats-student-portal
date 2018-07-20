import React from 'react';
import Typography from '@material-ui/core/Typography'
import { withStyles } from "@material-ui/core/styles";
import { Grid,Button} from '@material-ui/core';
import ProgressDial from './ProgressDial'
import Step from './Step'
import {PROCESS_TYPES, STEP_LABELS} from '../../../constants/signUpProcess'

const styles = theme => ({
    root: {
     width:530,
     height:300
    },
    ProgressGrid:{
      width:530,
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
function ApplicationProgress(props){
    const {classes} = props
    const currentProcess = PROCESS_TYPES.upload
    const steps = (<Grid direction='column'> {STEP_LABELS[currentProcess].map(x=><Step label={x} isComplete={false}/>)}</Grid>)
    const finishButton = (<Button
        className={classes.button}
        variant="flat"
      //  onClick={nextHandler}
      >
      Finish Application
      </Button>)

       const buildButton = (<Button
        className={classes.button}
        variant="outlined"
        //onClick={backHandler}
      >
        Build Resume Instead
      </Button>)

      const uploadButton = (<Button
        className={classes.button}
        variant="outlined"
       // onClick={backHandler}
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
        {currentProcess===PROCESS_TYPES.upload? uploadButton:buildButton}
        {finishButton}
    </Grid>
   
   </div>)
}

export default withStyles(styles)(ApplicationProgress);