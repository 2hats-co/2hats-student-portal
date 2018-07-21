
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import NavigationButton from './NavigationButton'
import { compose } from 'recompose';
import withAuthorisation from '../utilities/Session/withAuthorisation'

import PersonIcon from '@material-ui/icons/Person'
import DashboardIcon from '@material-ui/icons/Dashboard'
import JobIcon from '@material-ui/icons/Work'

import { Button} from '@material-ui/core';
import {auth} from '../firebase';

import {withRouter} from 'react-router-dom'
import * as routes from '../constants/routes'

//Redux
import { withHandlers, lifecycle } from 'recompose'
import { connect } from 'react-redux';
import  {withFirestore} from '../utilities/withFirestore';
import { COLLECTIONS,LISTENER } from "../constants/firestore";

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

class DashboardWrapper extends React.Component {
  constructor(props) {
    super(props);
  
    this.goTo = this.goTo.bind(this)
 

  }
  componentWillMount(){
   
  }

  goTo(route){
    this.props.history.push(route)
  }
 

  render(){
  const { classes } = this.props;
   const pathName = this.props.history.location.pathname
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
        <NavigationButton isSelected={(pathName===routes.DASHBOARD)} name='Dashboard' icon={<DashboardIcon style={{color:'#fff'}}/>} route={()=>{this.goTo(routes.DASHBOARD)}}/>
        <NavigationButton isSelected={(pathName===routes.PROFILE)} name='Profile' icon={<PersonIcon style={{color:'#fff'}}/>} route={()=>{this.goTo(routes.PROFILE)}}/>
        <NavigationButton isSelected={(pathName===routes.JOB_BOARD)} name='Job Board' icon={<JobIcon style={{color:'#fff'}}/>} route={()=>{this.goTo(routes.JOB_BOARD)}}/>
        
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {this.props.children}
      </main>
    </div>
  );
}
}

DashboardWrapper.propTypes = {
  classes: PropTypes.object.isRequired,
};

const enhance = compose(
  // add redux store (from react context) as a prop
  withFirestore,
  // Handler functions as props
  withHandlers({
    loadData: props => listenerSettings =>
      props.firestore.setListener(listenerSettings),

    onNext: props => (profile) =>
        props.firestore.update({ collection: COLLECTIONS.profiles, doc: props.uid }, {
        ...profile,
        updatedAt: props.firestore.FieldValue.serverTimestamp()
      }
    ),
    onUpdate: props => (name,value) =>
        props.firestore.update({ collection: COLLECTIONS.profiles, doc: props.uid }, {
        [name]:value,
        updatedAt: props.firestore.FieldValue.serverTimestamp()
      }
    ),onSubmit: props => () =>
    props.firestore.update({ collection: COLLECTIONS.profiles, doc: props.uid }, {
    hasSubmit:true,
    submittedAt: props.firestore.FieldValue.serverTimestamp()
  }
),
  }),
  // Run functionality on component lifecycle
  lifecycle({
    // Load data when component mounts
    componentWillMount() {
      const profileListenerSettings = LISTENER(COLLECTIONS.profiles,this.props.uid)
      this.props.loadData(profileListenerSettings);
      const usersListenerSettings = LISTENER(COLLECTIONS.users,this.props.uid)        
      this.props.loadData(usersListenerSettings);
    },
    componentWillUnmount() {
      const profileListenerSettings = LISTENER(COLLECTIONS.profiles,this.props.uid)
      this.props.firestore.unsetListener(profileListenerSettings);
      const usersListenerSettings = LISTENER(COLLECTIONS.users,this.props.uid)
      this.props.firestore.unsetListener(usersListenerSettings);
    }
  }),
  // Connect todos from redux state to props.todos
  connect(({ firestore }) => ({
      education: firestore.data.education,// document data by id
      experience: firestore.data.experience, // document data by id
     profile: firestore.data.profiles, // document data by id
     user: firestore.data.users, // document data by id
  }))
)


const authCondition = (authUser) => !!authUser;

export default enhance(
  withRouter(
  compose(
    withAuthorisation(authCondition)(withStyles(styles)(DashboardWrapper))
  )
)
)

