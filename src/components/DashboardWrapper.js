
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import NavigationButton from './NavigationButton'
import { compose } from 'recompose';
import withAuthorisation from '../utilities/Session/withAuthorisation'

import PersonIcon from '@material-ui/icons/Person'
import DashboardIcon from '@material-ui/icons/Dashboard'
import JobIcon from '@material-ui/icons/Work'
//import { mailFolderListItems, otherMailFolderListItems } from './tileData';

import { Button} from '@material-ui/core';
import { auth} from '../firebase';

import DarkLogo from '../assets/images/Logo/DarkText.png'
const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },logo:{
    height: 53,	
    width: 145,

  
    },
  appBar: {
    backgroundColor: '#F4F4F4',
    zIndex: theme.zIndex.drawer + 1,
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
    backgroundColor: '#2C2C2C',
  },
  content: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
});

function DashboardWrapper(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <AppBar position="absolute" className={classes.appBar}><Grid container direction='row' justify='space-between'> 
        <Toolbar>
        <img className={classes.logo} alt='dark2hatsLogo' src={DarkLogo}/>
        </Toolbar>
        <Button onClick={
      auth.doSignOut
     } >Log Out</Button></Grid>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <NavigationButton name='Dashboard' icon={<DashboardIcon style={{color:'#fff'}}/>}/>
        <NavigationButton name='Profile' icon={<PersonIcon style={{color:'#fff'}}/>}/>
        <NavigationButton name='Job Board' icon={<JobIcon style={{color:'#fff'}}/>}/>
        {/*
         <List>{mailFolderListItems}</List>
        <Divider />
        <List>{otherMailFolderListItems}</List>
         */}
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
}

DashboardWrapper.propTypes = {
  classes: PropTypes.object.isRequired,
};

const authCondition = (authUser) => !!authUser;

export default compose(withAuthorisation(authCondition)(withStyles(styles)(DashboardWrapper)))





//   return (
//    <div className={classes.root}>
//     <Typography variant='display2'>{header}</Typography>
//    
//    
//   </div>
//   );
// }
