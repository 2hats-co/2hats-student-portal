//wrapper card with 2hats logo on top of the card

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import DarkLogo from '../assets/images/Logo/DarkText.png';
import {setBackground} from '../utilities/styling'
import Tween from 'rc-tween-one';

import { compose } from 'recompose';
import withAuthorisation from '../utilities/Session/withAuthorisation'
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
      return(<div>
        {props.children}
        </div>
      )
  }else{
    const {classes,height,startingWidth,animateWidth,animateHeight,width,theme } = props;
    const {isMobile} = theme.responsive
    setBackground("#E1E1E1",'https://firebasestorage.googleapis.com/v0/b/hatstest-860eb.appspot.com/o/public%2FBW.svg?alt=media&token=596de8ea-53d1-4be2-afa8-81055b7a6cad',isMobile)

    const logo = (<img className={classes.logo} alt='dark2hatsLogo' src={DarkLogo}/>)

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
       <div className={classes.logo}>
        {logo}
       </div>
       <Tween animation={animation}>
        <Paper className={classes.paper} style={style} elevation={15}>
        {props.children}
        </Paper>
        </Tween>
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
