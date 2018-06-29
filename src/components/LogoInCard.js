//wrapper card with 2hats logo inside the card
// props: width! hieght! children

//

import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import DarkLogo from '../assets/images/Logo/DarkText.png'
const styles = theme => ({
  root:{
    marginTop:40
  },
  logo:{
    paddingTop:40,        
    marginBottom:30, 
    marginLeft:75,
    width:200,
    height:69,
  
    },
    paper:{
    marginTop:145,
    maxWidth:475,
    margin: 'auto',
    }
});

function LogoInCard(props) {
  const { classes,width,height } = props;
  document.body.style.backgroundColor = "#FA5E4E";
  document.body.style.backgroundImage= "url(https://firebasestorage.googleapis.com/v0/b/hatstest-860eb.appspot.com/o/public%2FColour.svg?alt=media&token=8b190721-9a9f-4b51-9285-9b26ea825c94)"
  document.body.style.backgroundRepeat= "no-repeat";
  document.body.style.backgroundSize= "cover";
  document.body.style.backgroundPosition= "center center";
  

  return (
    <div className={classes.root}>
      
      <Paper className={classes.paper} style={{width:width,height:height}} elevation={15}>
    
        <img className={classes.logo} alt='dark2hatsLogo' src={DarkLogo}/>
     
      {props.children}
      
      </Paper>
    </div>
  );
}
LogoInCard.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  hieght: PropTypes.number.isRequired,
};
LogoInCard.defaultProps = {
  width: 350,
  height: 500
};

export default withStyles(styles)(LogoInCard);