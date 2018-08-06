import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add'
import IconButton from '@material-ui/core/IconButton';
import {PRIMARY_COLOR,WHITE} from '../../Theme'
import { Grid } from '@material-ui/core';
const styles = theme => ({
  header: {
    paddingTop:15,
    paddingLeft:30,
    paddingRight:10,
    width:'82%',
    height:35,
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
  const { classes,title,handler,disabled } = props;
  return (
    <div className={classes.header}>
          <Grid
          container
          direction='row'
          justify='space-between'
          onClick={()=>{if(!disabled){handler()}}} 
          >
          <Typography variant="title" color="inherit">
            {title}
          </Typography> 
          {!disabled&&<IconButton className={classes.add} onClick={()=>{handler()}} color="inherit" aria-label="add">
            <AddIcon style={{ fontSize: 36 }} />
          </IconButton>}
          </Grid>
          
    </div>
  );
}

HeaderBar.propTypes = {
  title: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HeaderBar);