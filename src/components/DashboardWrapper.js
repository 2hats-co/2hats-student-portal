
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography,Button} from '@material-ui/core';
import { auth} from '../firebase';



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
    <Button onClick={
      auth.doSignOut
    } >Log Out</Button>
  </div>
  );
}

DashboardWrapper.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DashboardWrapper);