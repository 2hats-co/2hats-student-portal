import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person'
import DashboardIcon from '@material-ui/icons/Dashboard'

// Logout toggle
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

import NavigationButton from './NavigationButton'

import withAuthorisation from '../utilities/Session/withAuthorisation'

import JobIcon from '@material-ui/icons/Work'
import LiveHelp from '@material-ui/icons/LiveHelp'

import {withRouter} from 'react-router-dom'
import * as routes from '../constants/routes'

//Redux
import { compose } from 'recompose';
import { withHandlers, lifecycle } from 'recompose'
import { connect } from 'react-redux';
import  {withFirestore} from '../utilities/withFirestore';
import { COLLECTIONS,LISTENER } from "../constants/firestore";

import LightLogo from '../assets/images/Logo/WhiteText.png'
import UpdateIcon from '@material-ui/icons/Update'

import {auth} from '../firebase';
import LogoutIcon from '@material-ui/icons/ExitToApp'
import DownArrowIcon from '@material-ui/icons/ArrowDropDown'
import AccountInfoDailog from './AccountInfoDialog'

import LoadingMessage from './LoadingMessage'
import StatusCard from './StatusCard'
import {actionTypes} from 'redux-firestore'
import Avatar from './Avatar';



const drawerWidth = 240;


const styles = theme => ({
  root: {
    flexGrow: 1,
    height:theme.responsive.height,
    zIndex: 1,
    overflow: 'visible',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    backgroundColor:theme.palette.grey[100],    
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
  //  color:'#000',
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
   // padding: theme.spacing.unit * 3,
    paddingBottom: 160,
   
  },logo:{
    width:150,
    marginLeft:45,
    marginBottom:-60,
    marginTop:20
  
    },
    userActions:{
      display:'flex',
      position: 'absolute',
      right: 10,
      top: 10,
    },
    
    dropDown:{
      paddingLeft: 25,
      paddingRight: 0,
      textAlign: 'center',
      backgroundColor: 'rgba(0,0,0,0) !important'
    },
});

export const withNavigation = (WrappedComponent) => {
  
  class WithNavigation extends Component {
    static contextTypes = {
      store: PropTypes.object.isRequired,
  //    location: React.PropTypes.object.isRequired
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
        height:window.innerHeight,
        logoutToggleOpen: false,
        currentRoute:null
      };

      componentWillMount(){
      
        window.Intercom('update',{
          'hide_default_launcher': false
        })
      
       // window.Intercom('show')
        window.Intercom('hide')
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        //set currentRoute
       this.setState({currentRoute:this.props.history.location.pathname})



      }
      componentDidMount(){
        window.Intercom('update',{
          'hide_default_launcher': false
        })
      }
      componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
      }
      updateWindowDimensions() {
       this.setState({height: window.innerHeight});
       if(this.props.theme.responsive.isMobile){
        window.Intercom('update',{
          'hide_default_launcher': true
        })
       }else{
        window.Intercom('update',{
          'hide_default_launcher': false
        })
       }
     }
       componentDidUpdate(prevProps,prevState){
         if(prevProps.user !== this.props.profile){
            if(!this.props.profile[0].completedStep){
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

      // Handle logout toggle
      handleLogoutToggle = () => {
        this.setState(state => ({ logoutToggleOpen: !state.logoutToggleOpen }));
      };  
      handleLogoutToggleClose = event => { 
        if (this.anchorEl.contains(event.target)) {
          return;
        }

        this.setState({ logoutToggleOpen: false });
      };
    
      render(){
      const {classes,theme,history,profile,user} = this.props    
      const { logoutToggleOpen } = this.state;
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

          <NavigationButton isSelected={false} name='Support' 
          icon={<LiveHelp style={{color:'#fff'}}/>}
          route={()=>{window.Intercom('show');}}/>         
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
              <MenuIcon/>
            </IconButton>
            {this.props.user&&<div
                className={classes.userActions}            
            > <Avatar uid={this.props.uid}firstName={this.props.user[0].firstName}
              lastName={this.props.user[0].lastName}
              avatarURL={this.props.user[0].avatarURL}
            />
              <Button
                className={classes.dropDown}
                variant='contained'
                buttonRef={node => {
                  this.anchorEl = node;
                }}
                aria-owns={logoutToggleOpen ? 'logout-toggle' : null}
                aria-haspopup="true"
                onClick={this.handleLogoutToggle}
              >
                { Array.isArray(user) && user[0] && user[0].firstName && `Hi ${user[0].firstName}` } <DownArrowIcon/>
              </Button>
              <Popper open={logoutToggleOpen} anchorEl={this.anchorEl} transition disablePortal>
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    id="logout-toggle"
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={this.handleLogoutToggleClose}>
                        <MenuList>
                          <MenuItem value="Account" onClick={() => {
                            this.setState({ logoutToggleOpen: false });
                            this.handleInfoDialog(true);
                          }}>
                            <UpdateIcon/>My account
                          </MenuItem>
                          <MenuItem value="Logout" onClick={async() => {
                            this.setState({ logoutToggleOpen: false });
                            await auth.doSignOut();
                            this.props.clearData();
                            this.goTo(routes.LOG_OUT);
                          }}>
                            <LogoutIcon/>Logout
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>}
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
          <main className={classes.content} style={theme.responsive.isMobile?{paddingRight:0,paddingLeft:0}:{}}>
            <div className={classes.toolbar}/>
            {(!profile || !user)?<LoadingMessage/>:<div>
                      <WrappedComponent
                        {...this.props}
                        profile={profile[0]}
                        user={user[0]}
                        handleInfoDialog={() => {
                          this.handleInfoDialog(true);
                        }}
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
           {
           <StatusCard
           currentRoute= {this.state.currentRoute}
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


