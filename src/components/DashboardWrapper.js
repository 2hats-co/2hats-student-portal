
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';



const styles = theme => ({
  root:{
    width: '100%',
  },
 

});

function DashboardWrapper(props) {
  const { classes, header } = props;
  

  
  return (
   <div className={classes.root}>
    <Typography variant='display2'>{header}</Typography>
    {props.children}
  </div>
  );
}

DashboardWrapper.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DashboardWrapper);