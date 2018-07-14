
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography,Grid} from '@material-ui/core';

const styles = theme => ({
    root:{
        width:'100%',
        height:60,
        borderWidth:5,
        borderColor:'#fff',
        borderLeftStyle:'solid',
        leftPadding:10,
        marginTop:10
    },
    seletected:{
        
    },

  });
function NavigationButton(props){
    const {classes,name,route,icon} = props
    return(<Grid className={classes.root} 
    container 
    direction='row'
     alignItems='center'
    
     justify='space-between'>
        {icon}
        <Typography variant='headline' style={{color:'#fff',textAlign:'left'}}>{name}
        </Typography>
    </Grid>)
    
}
NavigationButton.propTypes = {
    classes: PropTypes.object.isRequired,
  };
export default withStyles(styles)(NavigationButton)
  