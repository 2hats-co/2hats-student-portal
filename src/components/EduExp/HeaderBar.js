import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add'
import IconButton from '@material-ui/core/IconButton';
import {WHITE} from '../../Theme'
import Grid from '@material-ui/core/Grid';
const styles = theme => {
  return({
  header: {
    paddingTop:15,
    paddingLeft:30,
    paddingRight:10,
    width:'82%',
    height:35,
    borderRadius:2,
    backgroundColor: theme.palette.grey[100],
    color:theme.palette.primary.light,
    marginBottom:-25,
    boxShadow:`0px 3px 6px 0px ${theme.palette.grey[400]}`,
    zIndex:10
  },
  add:{
    width:40,
    height:40,
    marginTop:-10 
  }
})};
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
          <Typography variant="title" color='primary'
          >
            {title}
          </Typography> 
          {!disabled&&<IconButton className={classes.add} onClick={()=>{handler()}} color="inherit" aria-label="add">
            <AddIcon style={{ fontSize: 33 }} />
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