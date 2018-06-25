//props: title?, child/childern, hint?, characterCounter?

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';



const styles = theme => ({
  root:{
    width: '100%',
  },
  footer:{
    width: '100%',
  },
  characterCount:{
    textAlign:'right'
  }
});

function InputWrapper(props) {
  const { classes, title, hint,characterCounter, child } = props;
  const header = ( <Typography variant='title' color='primary'>
  {title}
</Typography>)
  const footer = (<Grid
   // className={classes.footer}
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
     {child}
     {footer}
  </div>
  );
}

InputWrapper.propTypes = {
  title: PropTypes.string,
  hint: PropTypes.string,
  characterCounter: PropTypes.string,
  child: PropTypes.element.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InputWrapper);