//wrapper card with 2hats logo on top of the card
// props: width! hieght! children
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import DarkLogo from '../assets/images/Logo/DarkText.png';
import {setBackground} from '../utilities/styling'

import { compose } from 'recompose';
import withAuthorisation from '../utilities/Session/withAuthorisation'
const styles = theme => ({
  logo:{
    paddingTop:32,        
   marginBottom:45,        
    width:200,
    height:69,
    margin: 'auto',
    },
  paper:{
    maxWidth:850,
    width:'90%',
    margin: 'auto',
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
    const { classes,width,height } = props;
    setBackground("#E1E1E1",'https://firebasestorage.googleapis.com/v0/b/hatstest-860eb.appspot.com/o/public%2FBW.svg?alt=media&token=596de8ea-53d1-4be2-afa8-81055b7a6cad')
    const logo = (<img className={classes.logo} alt='dark2hatsLogo' src={DarkLogo}/>)
    
    return (
      <div className={classes.root}>
       <div className={classes.logo}>
        {logo}
       </div>
        <Paper className={classes.paper} style={{width:width,height:height}} elevation={15}>
        {props.children}
        </Paper>
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
