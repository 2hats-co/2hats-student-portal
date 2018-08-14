import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import DarkLogo from '../assets/images/Logo/DarkText.png'
import {setBackground} from '../utilities/styling'

const styles = theme => ({
  root:{
    display: 'table',
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  middle:{
    display: 'table-cell',
    verticalAlign: 'middle'
  },
  logo:{
    paddingTop:40,        
    marginBottom:30, 
    marginLeft:75,
    width:200,
    height:69,
  
    },
    miniLogo:{
      marginTop:50,        
      marginBottom:30, 
      marginLeft:55,
      width:117,
      height:42,
      },
    paper:{
      borderRadius:10,
      marginLeft: 'auto',
      marginRight: 'auto',
    }
});

function LogoInCard(props) {
  const { classes,width,height,theme } = props;
  const {isMobile} = theme.responsive
  setBackground('#FA5E4E','https://firebasestorage.googleapis.com/v0/b/hatstest-860eb.appspot.com/o/public%2FColour.svg?alt=media&token=8b190721-9a9f-4b51-9285-9b26ea825c94',isMobile)
  return (
    <div className={classes.root}>
      <div className={classes.middle}>
      <Paper className={classes.paper} 
              style={{width:width,
                      height:height}} 
              elevation={15}>
        <img className={classes.miniLogo} 
              alt='dark2hatsLogo' 
              src={DarkLogo}/>
        {props.children}
      </Paper>
      </div>
    </div>
  );
}
LogoInCard.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};
LogoInCard.defaultProps = {
  width: 350,
  height: 500
};

export default withStyles(styles,{withTheme:true})(LogoInCard);