import React from 'react';
import Typography from '@material-ui/core/Typography'
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { Grid,Button} from '@material-ui/core';
import ProgressDial from './ProgressDial'
import Step from './Step'
import {PROCESS_TYPES, STEP_LABELS, checkComplition,isComplete,firstUnfinishedStep} from '../../../constants/signUpProcess'
import ArrowIcon from '@material-ui/icons/KeyboardArrowRight'
import * as routes from '../../../constants/routes'
import AnimateIcon from '../../AnimateIcon'
const styles = theme => ({
    root: {
     width:'100%',
     maxWidth:600,
    },
    ProgressGrid:{
      width:'100%',
      maxWidth:600, 
    },
    button:{
      alignItems:'top !important',
      marginTop:10,
      marginBottom:20,
      width:230,
      height:35
      
    },stepItem:{
      width:230
    },
    header:{

    },
    mobileHeader:{
      width:'100%',
      textAlign:'center !important'
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
    const percentage =  Math.round(((completed.length+1)/(allSteps.length+1))*100)
    return percentage
  }
  handleContinue(){
    const {process} = this.props.data
    if(isComplete(this.props.data)){
      this.goTo(routes.PROFILE)
    }else{
        const returnStep = firstUnfinishedStep(this.props.data)
        if(process === PROCESS_TYPES.build){

          this.goTo(`${routes.BUILD_RESUME}?step=${returnStep}`)
        }else{
          this.goTo(`${routes.UPLOAD_RESUME}?step=${returnStep}`)      
        }
    }
    
  }
  render(){
    const {classes,data,handleInfoDialog,theme} = this.props
    const {process} = data
    const {isMobile} = theme.responsive
    const steps = (<Grid container alignItems='center' direction='column'> 
     <Step className={classes.stepItem} key='basic' goTo={handleInfoDialog} label='Basic Info' isComplete={true}/>
    {STEP_LABELS[process].map(x=>
    <Step key={x} goTo={this.goTo} process={process} label={x} isComplete={!checkComplition(x,data)}/>
  )}</Grid>)
    return(<div className={classes.root}>
    
    <Grid className={classes.ProgressGrid} container  alignItems='center' direction={isMobile?'column':'row'} justify='space-around'>
    <Grid item   xs={12} sm={12}>
    <Typography variant='display1' className={isMobile?classes.mobileHeader:classes.header} >
      Application Progress
    </Typography>
    </Grid>
        <Grid style={isMobile?{}:{maxWidth:230}} item  xs={12} sm={12} md={6} lg={6}>
             <ProgressDial percentage={this.completitionPercentage(data)}/>
             <Button className={classes.button} variant='flat' onClick={this.handleContinue}>
              <div style={{display:'flex',marginLeft:12}}>
             <div style={{marginTop:0}}> {isComplete(data)?`Preview`:`Continue Application`}</div> <AnimateIcon> <ArrowIcon style={{marginRight:-18}}/><ArrowIcon /> </AnimateIcon> 

              </div>
              </Button>
          </Grid>
             <Grid style={{width:'100%'}} item xs={12} sm={12} md={6} lg={6}>
              {steps}
              </Grid>
              
    </Grid>
   
   </div>)
}
  }
export default withRouter(withStyles(styles,{withTheme:true})(ApplicationProgress))
