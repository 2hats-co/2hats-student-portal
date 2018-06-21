//props: title?, child/childern, hint?, characterCounter?

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core'
const styles = theme => ({
  root: theme.mixins.gutters({
    width: '100%',
    padding:0
  
  }),
  footer: theme.mixins.gutters({
    width: '100%',
  }),

});

function InputWrapper(props) {
  const { classes, title, hint,characterCounter, children } = props;
  const header = ( <Typography variant='title' color='primary'>
  {title}
</Typography>)
  const footer = (<Grid
   // className={classes.footer}
       container
       direction='row'
       alignItems='flex-start'
       spacing={8}
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
         <Typography variant='caption'>
           {characterCounter}
         </Typography>
       </Grid>
     </Grid>)
     
  return (
   <div 
   className={classes.root}
   >
     {header}
     {children}
     {footer}
   
      
  </div>
  );
}

InputWrapper.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InputWrapper);