import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SwipeableViews from 'react-swipeable-views';
import {setBackground} from '../../utilities/styling';
import StepsIndecator from './StepsIndecator';
import Background from '../../assets/background/BW.svg';
const styles = theme => ({
  root: {
    
      margin:30,marginTop:20,marginBottom:10,
      padding:20,paddingTop:15,paddingBottom:15,
 
  },
 button:{
      width: '80%',
      marginLeft:'10%',
      position:'absolute',
      bottom:15
    },
    body:{
      textAlign:'center',
    },img:{

    }
    
});

class MobileIntro extends React.Component{
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
    // setBackground("#E1E1E1",'https://firebasestorage.googleapis.com/v0/b/hatstest-860eb.appspot.com/o/public%2FBW.svg?alt=media&token=596de8ea-53d1-4be2-afa8-81055b7a6cad',true)
    setBackground("#E1E1E1",Background,true)
    const maxSteps = tutorialSteps.length;

    return (
     
      <div>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
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
                    <StepsIndecator index={index}/>
            </Grid>
        </Card>
                

          ))}

        </SwipeableViews>
        <Button className={classes.button} onClick={startHandler}
                variant='flat' color="primary"> Let's Start</Button>
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
