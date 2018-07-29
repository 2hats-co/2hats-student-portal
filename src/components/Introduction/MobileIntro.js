import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import MobileStepper from '@material-ui/core/MobileStepper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';

import {setBackground} from '../../utilities/styling'
import StepsIndecator from './StepsIndecator'
const styles = theme => ({
  root: {
      margin:30,
    padding:20,
 
  },
 button:{
      marginTop: 15,
      width: '90%',
      marginLeft: 10,
      marginRight: 10
    },
    body:{
      textAlign:'center',
      marginBottom:5,
    },img:{

    }
    
});

class MobileIntro extends React.Component {
  state = {
    activeStep: 0,
  };
  handleNext = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1,
    }));
  };
  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1,
    }));
  };
  handleStepChange = activeStep => {
    this.setState({ activeStep });
  };

  render() {
    const { classes, theme,tutorialSteps,startHandler} = this.props;
    const { activeStep } = this.state;
    setBackground("#E1E1E1",'https://firebasestorage.googleapis.com/v0/b/hatstest-860eb.appspot.com/o/public%2FBW.svg?alt=media&token=596de8ea-53d1-4be2-afa8-81055b7a6cad')
    const maxSteps = tutorialSteps.length;

    return (
     
      
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.activeStep}
          onChangeIndex={this.handleStepChange}
          enableMouseEvents
        >
          {tutorialSteps.map((step,index) => (
            <Card className={classes.root}>
            <Grid container direction='column' style={{minHeight:450}} alignItems='center' justify='space-around'>
                   <Typography variant='title'>
                        Step {index+1}
                    </Typography>
                    <Typography variant='headline'>
                        {step.title}
                    </Typography>
                    <img className={classes.img} src={step.image} alt='uploadMan' />
    
                    <Typography className={classes.body} variant='body1'>
                    {step.description}
                    </Typography>
                    
                    {index===2?<Button className={classes.button}// onClick={}
                     variant='flat' color="primary">
            Let's Start
          </Button>:<StepsIndecator index={index}/>}
    
                   
            </Grid>
        </Card>
          ))}

        </SwipeableViews>
        
      
    );
  }
}

MobileIntro.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  tutorialSteps: PropTypes.array.isRequired,
};

export default withStyles(styles, { withTheme: true })(MobileIntro);