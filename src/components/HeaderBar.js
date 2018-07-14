import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add'
import IconButton from '@material-ui/core/IconButton';
import {PRIMARY_COLOR,WHITE} from '../Theme'
import { Grid } from '@material-ui/core';
const styles = theme => ({
  header: {
    paddingTop:25,
    paddingLeft:30,
    paddingRight:30,
    width:'82%',
    height:45,
    borderRadius:35,
    backgroundColor: PRIMARY_COLOR,
    color:WHITE,
    marginBottom:-25,
    zIndex:10
  },
  add:{
    marginTop:-15 
  }
});

function HeaderBar(props) {
  const { classes,title,handler } = props;
  return (
    <div className={classes.header}>
          <Grid
          container
          direction='row'
          justify='space-between'
          >
          <Typography variant="title" color="inherit">
            {title}
          </Typography> 
          <IconButton className={classes.add} onClick={()=>{handler()}} color="inherit" aria-label="add">
            <AddIcon style={{ fontSize: 36 }} />
          </IconButton>
          </Grid>
          
    </div>
  );
}

HeaderBar.propTypes = {
  title: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HeaderBar);