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
import LiveHelp from '@material-ui/icons/LiveHelp'

import {withRouter} from 'react-router-dom'
import * as routes from '../constants/routes'

//Redux
import { withHandlers, lifecycle } from 'recompose'
import { connect } from 'react-redux';
import  {withFirestore} from '../utilities/withFirestore';
import { COLLECTIONS,LISTENER } from "../constants/firestore";

import LightLogo from '../assets/images/Logo/WhiteText.png'
import UpdateIcon from '@material-ui/icons/Update'

import {auth} from '../firebase';
import LogoutIcon from '@material-ui/icons/ExitToApp'
import AccountInfoDailog from '../components/UserActions/AccountInfoDialog'

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
    backgroundColor:'#EDEDED',    
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
    margin:'auto',

    marginTop:0,
    marginBottom:0,
    flexGrow: 1,
    overflow:'scroll',
    width:'100%',
    backgroundColor: theme.palette.background.default,
    //padding: theme.spacing.unit * 3,
  },logo:{
    width:150,
    marginLeft:45,
    marginBottom:-60,
    marginTop:20
  
    },
});

class DashboardWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
    this.goTo = this.goTo.bind(this)
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.handleInfoDialog = this.handleInfoDialog.bind(this)
  }
  state = {
    mobileOpen: false,
    infoDialog:false
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };


  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  goTo(route){
    this.props.history.push(route)
  }
  handleInfoDialog(isOpen){
    this.setState({infoDialog:isOpen})
}

  render(){

  const {classes,theme,history,children} = this.props
   const pathName = history.location.pathname

   
   const drawer = (
    <div>
        <img className={classes.logo} alt='light2hatsLogo' src={LightLogo}/>
      <div className={classes.toolbar} />
      <NavigationButton isSelected={(pathName===routes.DASHBOARD)} name='Dashboard' icon={<DashboardIcon style={{color:'#fff'}}/>} route={()=>{this.goTo(routes.DASHBOARD)}}/>
      <NavigationButton isSelected={(pathName===routes.PROFILE)} name='Profile' icon={<PersonIcon style={{color:'#fff'}}/>} route={()=>{this.goTo(routes.PROFILE)}}/>
      <NavigationButton isSelected={(pathName===routes.JOB_BOARD)} name='Job Board' icon={<JobIcon style={{color:'#fff'}}/>} route={()=>{this.goTo(routes.JOB_BOARD)}}/>
      <NavigationButton isSelected={false} name='Account Info' icon={<UpdateIcon style={{color:'#fff'}}/>} route={()=>{this.handleInfoDialog(true)}}/>    
      <NavigationButton isSelected={false} name='Support' icon={<LiveHelp style={{color:'#fff'}}/>} route={()=>{}}/>         
     <NavigationButton isSelected={(pathName===routes.SIGN_IN)} name='Logout' icon={<LogoutIcon style={{color:'#fff'}}/>} route={()=>{auth.doSignOut();this.goTo(routes.SIGN_IN)}}/>
    </div>
  );
  const childrenWithProps = React.Children.map(children, child =>
    React.cloneElement(child, { device: 'mobile'}));
    console.log(theme)
  return (

    <div className={classes.root} 
    style={{height:this.state.height}}
    >
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
        {this.props.profile?childrenWithProps:'loading'}
      </main>
      <AccountInfoDailog
       isOpen={this.state.infoDialog} 
       closeHandler={this.handleInfoDialog}
     />
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
      if(this.props.uid){
      console.log('mount',this.props.uid)
      const profileListenerSettings = LISTENER(COLLECTIONS.profiles,this.props.uid)
      this.props.loadData(profileListenerSettings);
      const usersListenerSettings = LISTENER(COLLECTIONS.users,this.props.uid)        
      this.props.loadData(usersListenerSettings);
      const upcomingEventsListenerSettings = {collection:COLLECTIONS.upcomingEvents}
      this.props.loadData(upcomingEventsListenerSettings);
      }
    },
    componentDidUpdate(prevProps,prevState){
      if(prevProps.uid !== this.props.uid){
        console.log('update',this.props.uid)
        const profileListenerSettings = LISTENER(COLLECTIONS.profiles,this.props.uid)
        this.props.loadData(profileListenerSettings);
        const usersListenerSettings = LISTENER(COLLECTIONS.users,this.props.uid)        
        this.props.loadData(usersListenerSettings);
        const upcomingEventsListenerSettings = {collection:COLLECTIONS.upcomingEvents}
        this.props.loadData(upcomingEventsListenerSettings);
      }
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


export default enhance(
  withRouter(
  compose(
    withAuthorisation(authCondition)(withStyles(styles,{ withTheme: true })(DashboardWrapper))
  )))


