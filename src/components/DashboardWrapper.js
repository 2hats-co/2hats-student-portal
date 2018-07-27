import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';

import Grid from '@material-ui/core/Grid';
import NavigationButton from './NavigationButton'
import { compose } from 'recompose';
import withAuthorisation from '../utilities/Session/withAuthorisation'

import PersonIcon from '@material-ui/icons/Person'
import DashboardIcon from '@material-ui/icons/Dashboard'
import JobIcon from '@material-ui/icons/Work'


import {withRouter} from 'react-router-dom'
import * as routes from '../constants/routes'

//Redux
import { withHandlers, lifecycle } from 'recompose'
import { connect } from 'react-redux';
import  {withFirestore} from '../utilities/withFirestore';
import { COLLECTIONS,LISTENER } from "../constants/firestore";

import LightLogo from '../assets/images/Logo/WhiteText.png'
import UserActions from './UserActions';

import sizeMe from 'react-sizeme'

const drawerWidth = 240;


const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    backgroundColor:'#2c2c2c',
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

class DashboardWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.goTo = this.goTo.bind(this)
  }
  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };


  componentWillMount(){
   
  }

  goTo(route){
    this.props.history.push(route)
  }

  render(){
  const { classes,theme,size } = this.props;
  const {width,height} = size
   const pathName = this.props.history.location.pathname

   const drawer = (
    <div>
      <div className={classes.toolbar} />
      <NavigationButton isSelected={(pathName===routes.DASHBOARD)} name='Dashboard' icon={<DashboardIcon style={{color:'#fff'}}/>} route={()=>{this.goTo(routes.DASHBOARD)}}/>
      <NavigationButton isSelected={(pathName===routes.PROFILE)} name='Profile' icon={<PersonIcon style={{color:'#fff'}}/>} route={()=>{this.goTo(routes.PROFILE)}}/>
      <NavigationButton isSelected={(pathName===routes.JOB_BOARD)} name='Job Board' icon={<JobIcon style={{color:'#fff'}}/>} route={()=>{this.goTo(routes.JOB_BOARD)}}/>
    </div>
  );
  return (

    <div className={classes.root} style={{height:height}}>
    <AppBar className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="Open drawer"
          onClick={this.handleDrawerToggle}
          className={classes.navIconHide}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="title" color="inherit" noWrap>
        
        </Typography>
      </Toolbar>
    </AppBar>
    <Hidden mdUp>
      <Drawer
        variant="temporary"
        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
        open={this.state.mobileOpen}
        onClose={this.handleDrawerToggle}
        classes={{
          paper: classes.drawerPaper,
        }}
        ModalProps={{
          keepMounted: true, 
          // Better open performance on mobile.
        }}
      >
        {drawer}
      </Drawer>
    </Hidden>
    <Hidden smDown implementation="css">
      <Drawer
        variant="permanent"
        open
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        {drawer}
      </Drawer>
    </Hidden>
      <main className={classes.content}>
        <div className={classes.toolbar}/>
        {this.props.profile?this.props.children:'loading'}
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
      const upcomingEventsListenerSettings = {collection:COLLECTIONS.upcomingEvents}
      this.props.loadData(upcomingEventsListenerSettings);
    },
    componentWillUnmount() {
      const profileListenerSettings = LISTENER(COLLECTIONS.profiles,this.props.uid)
      this.props.firestore.unsetListener(profileListenerSettings);
      const usersListenerSettings = LISTENER(COLLECTIONS.users,this.props.uid)
      this.props.firestore.unsetListener(usersListenerSettings);
      const upcomingEventsListenerSettings = {collection:COLLECTIONS.upcomingEvents}
      this.props.firestore.unsetListener(upcomingEventsListenerSettings);
    }
  }),
  // Connect todos from redux state to props.todos
  connect(({ firestore }) => ({
     profile: firestore.data.profiles, // document data by id
     user: firestore.data.users, // document data by id
  }))
)


const authCondition = (authUser) => !!authUser;


export default sizeMe({ monitorHeight: true })(enhance(
  withRouter(
  compose(
    withAuthorisation(authCondition)(withStyles(styles,{ withTheme: true })(DashboardWrapper))
  )
)
))
