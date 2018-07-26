import React from 'react'
import { withStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';


const styles = theme => ({
    root: {
      marginLeft:-50,
      marginTop:-50,
      width:'100%',
      maxWidth: 750,
        flexGrow: 1,
      },
  });
  
function DotMobileStepper(props){
    const {activeStep,steps,classes,handleNext,handleBack,theme} = props
    return(
        <MobileStepper
        variant="dots"
        steps={steps.length+1}
        position="static"
        activeStep={activeStep}
        className={classes.root}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === steps.length+1}>
            Next
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>
        }
      />
    )
    
}
DotMobileStepper.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles, { withTheme: true })(DotMobileStepper);