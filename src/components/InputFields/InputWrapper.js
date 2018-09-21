import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import HoverHint from '../HoverHint';

const styles = theme => ({
  root:{
    width: '100%',
    marginTop: 20,
  },
  rootTopMarginCollapsed:{
    width: '100%',
  },
  footer:{
    marginTop:4
  },
  child:{
    width: '100%',
  },
  characterCount:{
    textAlign:'right'
  },

});

function InputWrapper(props) {
  const { hasLabel,classes, title, hint,characterCounter,headerColor,tip } = props;
  const header = ( <Grid container direction='row' justify='flex-start'><Typography variant={hasLabel?'caption':'title'} style={hasLabel?{marginLeft:1,marginTop:10,textTransform:'capitalize'}:{textTransform:'capitalize'}} color={hasLabel?'default':'primary'}>
  {title}
</Typography></Grid>)
  const footer = (<Grid
   className={classes.footer}
       container
       direction='row'
       alignItems='center'
       justify='space-between'
      >
     
       <Grid
         item
         xs={characterCounter? 10:11}
         md={11}
       > 
         <Typography variant='body1'>
           {hint}
         </Typography>
       
       </Grid>
       <Grid
         item
         xs={characterCounter? 2:1}
         md={1}
       >
       <Grid container direction='column' alignItems='center' justify='center'>
       {(tip)&&<HoverHint message={tip}/>}
         <Typography className={classes.characterCount} variant='caption'>
           {characterCounter}
         </Typography>
       </Grid>
       </Grid>
     </Grid>)
     
  return (
   <div 
   className={props.collapseTopMargin ? classes.rootTopMarginCollapsed : classes.root}
   >
     {header}
     {footer}
     {props.children}
  </div>
  );
}

InputWrapper.propTypes = {
  title: PropTypes.string||PropTypes.bool,
  hint: PropTypes.string||PropTypes.bool,
  characterCounter: PropTypes.string,
  children: PropTypes.element.isRequired,
  classes: PropTypes.object.isRequired,
};
InputWrapper.defaultProps ={
  headerColor: 'primary'
}

export default withStyles(styles)(InputWrapper);
