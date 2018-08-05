import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person'
import DashboardIcon from '@material-ui/icons/Dashboard'

import NavigationButton from './NavigationButton'
import { compose } from 'recompose';
import withAuthorisation from '../utilities/Session/withAuthorisation'

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
import AccountInfoDailog from './AccountInfoDialog'

import LoadingMessage from './LoadingMessage'
import StatusCard from './StatusCard'


import {actionTypes} from 'redux-firestore'
import { runInThisContext } from 'vm';


const drawerWidth = 240;


const styles = theme => ({
  root: {
    flexGrow: 1,
    height:theme.responsive.height,
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
    backgroundColor: '#fff',
    padding: theme.spacing.unit * 3,
    paddingBottom: 160,
   
  },logo:{
    width:150,
    marginLeft:45,
    marginBottom:-60,
    marginTop:20
  
    },greeting:{
      color:'#2c2c2c',
      width:'98%',
      textAlign:'right'
    },

});


export const withNavigation = (WrappedComponent) => {
  
  class WithNavigation extends Component {
    static contextTypes = {
      store: PropTypes.object.isRequired
  }
    constructor(props) {
        super(props);
        this.goTo = this.goTo.bind(this)
        this.handleInfoDialog = this.handleInfoDialog.bind(this)
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
      }
      state = {
        mobileOpen: false,
        infoDialog:false,
        height:window.innerHeight
      };
      componentWillMount(){
      
        window.Intercom('update',{
          'hide_default_launcher': false
        })
      
       // window.Intercom('show')
        window.Intercom('hide')
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
      }
      componentDidMount(){
        window.Intercom('update')
      }
      componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
      }
      updateWindowDimensions() {
       this.setState({height: window.innerHeight});
     }
       componentDidUpdate(prevProps,prevState){
         if(prevProps.profile !== this.props.profile){
            if(!this.props.profile[0]){
            this.goTo(routes.INTRODUCTION)
            }
         }
       }
       
      handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
      };
      goTo(route){
        this.props.history.push(route)
      }
      handleInfoDialog(isOpen){
        this.setState({infoDialog:isOpen})
    }
    
    
      render(){
      const {classes,theme,history,children,profile,user,upcomingEvents} = this.props    
       const pathName = history.location.pathname
       
       const drawer = (
        <div>
          <img className={classes.logo} alt='light2hatsLogo' src={LightLogo}/>
          <div className={classes.toolbar} />
        
          <NavigationButton isSelected={(pathName===routes.DASHBOARD)} 
          name='Dashboard' icon={<DashboardIcon style={{color:'#fff'}}/>} 
          route={()=>{this.goTo(routes.DASHBOARD)}}/>

          <NavigationButton isSelected={(pathName===routes.PROFILE)} 
          name='Profile' icon={<PersonIcon style={{color:'#fff'}}/>} 
          route={()=>{this.goTo(routes.PROFILE)}}/>

          <NavigationButton isSelected={(pathName===routes.JOB_BOARD)} 
          name='Job Board' icon={<JobIcon style={{color:'#fff'}}/>} 
          route={()=>{this.goTo(routes.JOB_BOARD)}}/>

          <NavigationButton isSelected={false} name='Account' 
          icon={<UpdateIcon style={{color:'#fff'}}/>} 
          route={()=>{this.handleInfoDialog(true)}}/>    

          <NavigationButton isSelected={false} name='Support' 
          icon={<LiveHelp style={{color:'#fff'}}/>}
          route={()=>{window.Intercom('show');}}/>         

         <NavigationButton isSelected={(pathName===routes.SIGN_IN)} 
         name='Logout' icon={<LogoutIcon style={{color:'#fff'}}/>} 
         route={()=>{auth.doSignOut();this.props.clearData();this.goTo(routes.SIGN_IN)}}/>

        </div>
      );

      return (
        <div className={classes.root} 
        style={{height:this.state.height}}
        >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="primary"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.navIconHide}
            >
              <MenuIcon />
            </IconButton>
            <Typography  className={classes.greeting} variant="button" color="inherit" noWrap>
            {user&&user[0]&&`hi, ${user[0].firstName}`}
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

            {(!profile || !user)?<LoadingMessage/>:<div>
                      <WrappedComponent
                        {...this.props}
                        profile={profile[0]}
                        user={user[0]}
                        />
           </div>
           }
          </main>
          {(profile && user)&&(profile[0] && user[0])&&
          <div>
          <AccountInfoDailog
          user={user[0]}
           isOpen={this.state.infoDialog} 
           closeHandler={this.handleInfoDialog}/>
           {!profile[0].hasSubmit&& 
           <StatusCard
           onSubmit={this.props.onSubmit.bind(this)} 
           goTo={this.goTo} 
           profile={profile[0]}/>}
           </div>
          }
        </div>
      );
    }
    }
    
    WithNavigation.propTypes = {
      classes: PropTypes.object.isRequired,
    };
    function mapDispatchToProps(dispatch) {
      return({
          clearData: () => {dispatch({ type: actionTypes.CLEAR_DATA, preserve: { data: false, ordered: false }})}
      })
  }
    const enhance = compose(
      // add redux store (from react context) as a prop
      withFirestore,
      // Handler functions as props
      withHandlers({
        loadData: props => listenerSettings =>
          props.firestore.setListener(listenerSettings),
          onSubmit: props => (data) =>
          props.firestore.update({ collection: COLLECTIONS.profiles, doc: props.uid }, {
          hasSubmit:true,
          submittedAt: props.firestore.FieldValue.serverTimestamp()
        })
      }),
      // Run functionality on component lifecycle
      lifecycle({
        // Load data when component mounts
        componentWillMount() {
          if(this.props.uid){
        
          const profileListenerSettings = LISTENER(COLLECTIONS.profiles,this.props.uid)
          this.props.loadData(profileListenerSettings);
          const usersListenerSettings = LISTENER(COLLECTIONS.users,this.props.uid)        
          this.props.loadData(usersListenerSettings);
          const upcomingEventsListenerSettings = {collection:COLLECTIONS.upcomingEvents}
          this.props.loadData(upcomingEventsListenerSettings);
          const submissionsListenerSettings = {collection:COLLECTIONS.submissions, where: ['UID', '==',this.props.uid]}
            this.props.loadData(submissionsListenerSettings);
          }
        },
        componentDidUpdate(prevProps,prevState){
          if(prevProps.uid !== this.props.uid){
         
            const profileListenerSettings = LISTENER(COLLECTIONS.profiles,this.props.uid)
            this.props.loadData(profileListenerSettings);
            const usersListenerSettings = LISTENER(COLLECTIONS.users,this.props.uid)        
            this.props.loadData(usersListenerSettings);
            const upcomingEventsListenerSettings = {collection:COLLECTIONS.upcomingEvents}
            this.props.loadData(upcomingEventsListenerSettings);
            const submissionsListenerSettings = {collection:COLLECTIONS.submissions, where: ['UID', '==',this.props.uid]}
            this.props.loadData(submissionsListenerSettings);
          }
        },
        componentWillUnmount() {
          // const profileListenerSettings = LISTENER(COLLECTIONS.profiles,this.props.uid)
          // this.props.firestore.unsetListener(profileListenerSettings);
          // const usersListenerSettings = LISTENER(COLLECTIONS.users,this.props.uid)
          //this.props.firestore.unsetListener(usersListenerSettings);
          // const upcomingEventsListenerSettings = {collection:COLLECTIONS.upcomingEvents}
          // this.props.firestore.unsetListener(upcomingEventsListenerSettings);
        }
      }),
      connect(({ firestore }) => ({
         profile: firestore.ordered.profiles,
         user: firestore.ordered.users, 
         upcomingEvents: firestore.data.upcomingEvents, 
         submissions:firestore.ordered.submissions
      }), mapDispatchToProps)
      
    )
    const authCondition = (authUser) => !!authUser;
   return enhance(
      withRouter(
      compose(
        withAuthorisation(authCondition)(withStyles(styles,{ withTheme: true })(WithNavigation))
      )))
}


