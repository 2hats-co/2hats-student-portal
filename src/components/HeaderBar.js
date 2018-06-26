import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add'
import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
  radius :{
    borderRadius:'35 !important',
    width:450
  },
  root: {
  //  flexGrow: 1,
    width:450,
    height: 70,
    cornerRadius:35
  },
  add:{
    marginLeft:160
  }
});

function HeaderBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar className={classes.radius} position="static" color="primary">
        <Toolbar className={classes.radius}>
          <Typography variant="title" color="inherit">
            Practical Experience
          </Typography> 
          <IconButton className={classes.add} color="inherit" aria-label="add">
            <AddIcon style={{ fontSize: 36 }} />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

HeaderBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HeaderBar);