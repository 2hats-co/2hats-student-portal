import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';
import HoverHint from '../HoverHint';

const styles = theme => ({
  root:{
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
  const header = ( <Grid container direction='row' justify='flex-start'><Typography variant={hasLabel?'caption':'title'} style={hasLabel?{marginLeft:1,marginTop:10}:{}} color={hasLabel?'default':'primary'}>
  {title}
</Typography>{(tip&& title)&&<HoverHint style={true?{marginTop:-10}:{marginTop:-2,marginLeft:-22}} message={tip}/>}</Grid>)
  const footer = (<Grid
   className={classes.footer}
       container
       direction='row'
       alignItems='flex-end'
       justify='space-between'
      >
     
       <Grid
         item
         xs={characterCounter? 10:11}
       > 
         <Typography variant='caption'>
           {hint}
         </Typography>
       </Grid>
       <Grid
         item
         xs={characterCounter? 2:1}
       >
         <Typography className={classes.characterCount} variant='caption'>
           {characterCounter}
         </Typography>
       </Grid>
     </Grid>)
     
  return (
   <div 
   className={classes.root}
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