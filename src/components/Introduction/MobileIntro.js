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

const styles = theme => ({
  root: {
    maxWidth: 600,
    flexGrow: 1,
    height:'100%'
  },
  img: {
    height: 200,
    maxWidth: 200,
    objectFit:'cover',
    overflow: 'hidden',
    width: '100%',
  },content:{
    height:'100%',
    minHeight:'370px',
    width:'90%',
    margin:'auto'
  },description:{
      textAlign:'center'
  },
  card:{
    margin:'auto',
        marginTop:'10px',
        marginBottom:'20px',
        height:'100%',
      width:'90%'
  },mobileStepper:{
    position:'absolute',
    bottom:0,
    width:'100%'
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
    const { classes, theme,tutorialSteps,height,startHandler} = this.props;
    const { activeStep } = this.state;
    setBackground("#E1E1E1",'https://firebasestorage.googleapis.com/v0/b/hatstest-860eb.appspot.com/o/public%2FBW.svg?alt=media&token=596de8ea-53d1-4be2-afa8-81055b7a6cad')
    const maxSteps = tutorialSteps.length;
    return (
      <div className={classes.root}>
      
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.activeStep}
          onChangeIndex={this.handleStepChange}
          enableMouseEvents

        >
          {tutorialSteps.map((step,index) => (<Card key={step.title} className={classes.card} style={{height:height*0.85}}>
            <Grid container className={classes.content} direction='column' justify='space-around' alignItems='center'>
            <Typography variant="title">
        Step {index+1}
      </Typography>
              <Typography variant="title" >
          {step.title}
        </Typography>
            <img className={classes.img} src={step.image} alt={step.label} />
            <Typography className={classes.description} variant="body1">
                {step.description}
              </Typography>
            </Grid></Card>
          ))}
        </SwipeableViews>
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          className={classes.mobileStepper}
          nextButton={
            <Button size="medium" onClick={activeStep < maxSteps-1?this.handleNext:startHandler}>
              {activeStep === maxSteps-1?`Start`:'Next'}
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
          }
          backButton={
            <Button size="medium" onClick={this.handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
              Back
            </Button>
          }
        />
      </div>
    );
  }
}

MobileIntro.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  tutorialSteps: PropTypes.array.isRequired,
};

export default withStyles(styles, { withTheme: true })(MobileIntro);