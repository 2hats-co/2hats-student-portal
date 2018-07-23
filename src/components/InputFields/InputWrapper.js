import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';

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
  const { classes, title, hint,characterCounter,headerColor } = props;
  const header = ( <Typography variant='title' color={headerColor}>
  {title}
</Typography>)
  const footer = (<Grid
   className={classes.footer}
       container
       direction='row'
       alignItems='flex-start'
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
     {props.children}
     {footer}
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