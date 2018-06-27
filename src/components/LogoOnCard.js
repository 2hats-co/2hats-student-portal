//wrapper card with 2hats logo on top of the card
// props: width! hieght! children
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import DarkLogo from '../assets/images/Logo/DarkText.png'

const styles = theme => ({

  logo:{
    paddingTop:32,        
    paddingBottom:30,        
    width:242,
    height:84,
    margin: 'auto',
    },
  paper:{
    maxWidth:1200,
    margin: 'auto',
    minHeight: 474,
    padding: 30,
  },
  
});

function LogoOnCard(props) {
  const { classes,width,height } = props;
  document.body.style.backgroundColor = "#EDEDED";
  const logo = (<img alt='dark2hatsLogo' src={DarkLogo}/>)
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

LogoOnCard.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};
export default withStyles(styles)(LogoOnCard);