//wrapper card with 2hats logo on top of the card

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {setBackground} from '../utilities/styling'
import Tween from 'rc-tween-one';
import { Grid } from '@material-ui/core';

import Background from '../assets/background/BW.svg';

import { compose } from 'recompose';
import withAuthorisation from '../utilities/Session/withAuthorisation'
import SupportFooter from './SupportFooter';
const styles = theme => ({
  logo:{
    paddingTop:15,        
   marginBottom:45,        
    width:200,
    height:69,
    margin: 'auto',
    },
  paper:{
    margin: 'auto',
    marginBottom:20,
 //   width:680,
   paddingLeft:'30px',
   paddingRight:'30px',
  },
  
});

function LogoOnCard(props) {
  if(props.theme.responsive.isMobile){
    setBackground("#fff",'')
      return(
        <div>
          <Grid container direction='column' justify='space-between' alignItems='center'
          style={{minHeight:'100vh',width:'100%'}}>
            <Grid item style={{width:'100%'}}>
              {props.children}
            </Grid>
            <Grid item style={{height: 200, width: '100%', position: 'relative', paddingTop: '60px'}}>
              <SupportFooter mobile={true}/>
            </Grid>
          </Grid>
        </div>
      )
  }else{
    const {classes,height,startingWidth,animateWidth,animateHeight,width,theme } = props;
    const {isMobile} = theme.responsive
    // setBackground("#E1E1E1",'https://firebasestorage.googleapis.com/v0/b/hatstest-860eb.appspot.com/o/public%2FBW.svg?alt=media&token=596de8ea-53d1-4be2-afa8-81055b7a6cad',isMobile)
    setBackground("#E1E1E1",Background,isMobile)
            let style ={}
            let animation = {}
            if(animateWidth){
              animation.duration=200
              animation.width= width
              animation.margin = 'auto'
              animation.ease= 'linear'
              if(startingWidth<width){
                style.minWidth =startingWidth 
              }else{
                style.maxWidth= startingWidth 
              }
            }else{
              style.width = width
            }
            if(animateHeight){
             // animation.duration=300
              animation.height= height
             // animation.margin = 'auto'
             // animation.ease= 'linear'
            }else{
              style.height = height
            }
    return (
      <div className={classes.root}>
        <Grid container direction='column' justify='space-between' alignItems='center'
        style={{minHeight:'100vh',paddingTop:40}}>
          <Grid item>
       
            <Tween animation={animation}>
              <Paper className={classes.paper} style={style} elevation={15}>
                {props.children}
              </Paper>
            </Tween>
          </Grid>

          <Grid item style={{height: 'calc(6vw + 120px)', width: '100%', position: 'relative', paddingTop: '60px'}}>
            <SupportFooter mobile={false}/>
          </Grid>
        </Grid>
      </div>
    );
  }
}
LogoOnCard.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  children: PropTypes.any
};


const authCondition = (authUser) => !!authUser;

export default compose(withAuthorisation(authCondition)(withStyles(styles,{ withTheme: true })(LogoOnCard)))
