
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root:{
        width:'100%',
        height:60,
        borderWidth:5,
        borderColor:'#fff',
        borderLeftStyle:'solid',
        leftPadding:10,
        marginTop:10,
    },
    otherRoot:{
        width:'100%',
        height:60,
        leftPadding:10,
        marginTop:10, 
        borderColor:'transparent',
        borderWidth:5,
        borderLeftStyle:'solid',
        opacity:0.6 
    },
    button:{
        width:'90%',
        backgroundColor:'#2C2C2C !important',
       color:'#fff'
    },label:{
        textWeight:500,
        textAlign:'left',
        color:'#fff',
        width:130
    }
  });
function NavigationButton(props){
    const {classes,name,route,icon,isSelected} = props
    return(
    <Grid container className={isSelected ?classes.root: classes.otherRoot} justify='center' alignItems='center'>
    <Button onClick={()=>{route()}} className={classes.button}><Grid container direction='row' justify='space-between'>
    {icon} 
    <Typography variant='title' className={classes.label}>{name}</Typography>
    </Grid>
    </Button>
    </Grid>

    )
    
}
NavigationButton.propTypes = {
    classes: PropTypes.object.isRequired,
  };
export default withStyles(styles)(NavigationButton)
