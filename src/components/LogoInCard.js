//wrapper card with 2hats logo inside the card
// props: width! hieght! children

//

import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import DarkLogo from '../assets/images/Logo/DarkText.png'
const styles = theme => ({
  root: theme.mixins.gutters({
    marginTop:40
  }),
  logo: theme.mixins.gutters({
    paddingTop:50,        
    paddingBottom:30,        
    width:242,
    height:84,
    margin: 'auto',
    }),
  paper:theme.mixins.gutters({
    maxWidth:475,
    margin: 'auto',
    minHeight: 500,
    padding: 30,
  }),
  content:theme.mixins.gutters({
    margin: '0px auto',
    float: 'none',
    display: 'table',
   
  }),
});

function LogoInCard(props) {
  const { classes,width } = props;
  document.body.style.backgroundColor = "#FFF";
  return (
    <div className={classes.root}>
      
      <Paper className={classes.paper} style={{width:width}} elevation={15}>
      <div className={classes.logo}>
        <img alt='dark2hatsLogo' src={DarkLogo}/>
      </div>
      {props.children}
      
      </Paper>
    </div>
  );
}

LogoInCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LogoInCard);