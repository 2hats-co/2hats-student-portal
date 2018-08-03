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
import AccountInfoDailog from './AccountInfoDialog'

import LoadingMessage from './LoadingMessage'
import StatusCard from './StatusCard'
import ConfirmationDialog from './ConfirmationDialog'

import {actionTypes} from 'redux-firestore'

import { PROCESS_TYPES } from '../constants/signUpProcess';

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
  
    },
    toaster: {
      position: 'absolute !important',
      bottom:0,
      right:0,
      zIndex: 4000,
     
     maxHeight:200,
  
     [theme.breakpoints.up('xs')]: {
        width: '100%',
        bottom:0,
   
      },
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth+2}px)`,
      bottom:0,
    },
    }
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
      }
      state = {
        mobileOpen: false,
        infoDialog:false,
        confirmationDialog:null,

      };
      componentWillMount(){
       window.Intercom('update')
        window.Intercom('update',{
          'hide_default_launcher': false
        })
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
    getConfirmationDialog(dialog){
      switch (dialog) {
        case 'submit':return {title:'Confirm Profile Submission',
        body:[`Are you sure you want to submit?`,`\n`,`Once you click 'submit' your resume will be sent to the 2hats resume specialists for review. You will be unable to make further changes to your submission until after your resume has been reviewed and given feedback.`],
        checkbox:{isChecked:false,label:'I confirm that I want to submit my profile.'},
        confirm:{label:'Submit',action:()=>{console.log('test')}}}
        case 'build':return {title:'Use Our Resume Builder Instead',
        body:['Are you sure you want to build a new resume instead?','','All your previous progress will be saved, and you can always choose to upload an existing resume in the future.'],
        confirm:{label:'Build',action:()=>{
          this.goTo(routes.BUILD_RESUME)
        }}}
       case 'upload':return {title:'Upload Existing Resume Instead',
        body:[`Are you sure you want to switch to uploading your resume instead?`,`\n`,
        `All your previous progress will be saved, and you can always go back to using our Resume Builder if you wish.`],
        confirm:{label:'Upload',action:()=>{
          this.goTo(routes.UPLOAD_RESUME)
        }}}
        default:
          break;
      }
    }
    getStatusPrompt(profile){
      const uploadLink = {label:'Upload Existing Resume Instead',action:()=>{this.setState({confirmationDialog:this.getConfirmationDialog('upload')})}}
      const uploadButton = {label:'Upload Resume',action:()=>{this.goTo(routes.UPLOAD_RESUME)}}
      const completeButton = {label:'Complete Profile',action:()=>{this.goTo(routes.UPLOAD_RESUME)}}
      const buildLink = {label:'Use Our Resume Builder Instead',action:()=>{this.setState({confirmationDialog:this.getConfirmationDialog('build')})}}
      const buildButton = {label:'Continue Building',action:()=>{this.goTo(routes.BUILD_RESUME)}}
      const submitButton = {label:'Submit Profile',action:()=>{this.setState({confirmationDialog:this.getConfirmationDialog('submit')})}}
      const inCompleteBuildMessage = 'It looks like you haven’t finished building your resume yet.'
      const inCompleteUploadMessage = 'It looks like you haven’t filled out all the necessary information yet.'
      const noUploadMessage = 'It looks like you haven’t uploaded your resume yet.'
      const completeMessage = 'Congratulations! Your profile is ready to be reviewed.'
      if(profile.isComplete){
        if(profile.process === PROCESS_TYPES.build){
          return({message:completeMessage,
                  buttons:[submitButton],
                  link:uploadLink})
        }else if(profile.process === PROCESS_TYPES.upload){
          return({message:completeMessage,
                  buttons:[submitButton],
                  link:buildLink})
        }
      }else{
        if(profile.process === PROCESS_TYPES.build){
          return({message:inCompleteBuildMessage,
                  buttons:[buildButton],
                  link:uploadLink})
        }else if(profile.process === PROCESS_TYPES.upload){
            if(profile.resumeFile && profile.resumeFile.fullPath !== ''){
              return({message:inCompleteUploadMessage,
                      buttons:[completeButton],
                      link:buildLink})
            }else{
              return({message:noUploadMessage,
                      buttons:[uploadButton],
                      link:buildLink})
            }
        }

      }
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

            {(!profile || !user)?<LoadingMessage/>:<div>
              
                      <WrappedComponent
                        {...this.props}
                        profile={profile[0]}
                        user={user[0]}
                       // upcomingEvents={upcomingEvents}
                        />
           </div>
           }
           
          </main>
          {(profile && user)&&
          <div>
          <AccountInfoDailog
          user={user[0]}
           isOpen={this.state.infoDialog} 
           closeHandler={this.handleInfoDialog}/>
           <div className={classes.toaster}>
           <StatusCard prompt = {this.getStatusPrompt(profile[0])}/>
           </div>
           </div>
          }
          {
            this.state.confirmationDialog&& 
                              <ConfirmationDialog dialog={this.state.confirmationDialog} 
                              closeHandler={()=>{this.setState({confirmationDialog:null})}}
                              checkHandler={()=>{
                              let newObj = Object.assign(this.state.confirmationDialog,{checkbox:{isChecked:!this.state.confirmationDialog.checkbox.isChecked,
                                                          label:this.state.confirmationDialog.checkbox.label}}
                                )
                              this.setState({confirmationDialog:newObj})}}/>
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
          // const profileListenerSettings = LISTENER(COLLECTIONS.profiles,this.props.uid)
          // this.props.firestore.unsetListener(profileListenerSettings);
          // const usersListenerSettings = LISTENER(COLLECTIONS.users,this.props.uid)
          //this.props.firestore.unsetListener(usersListenerSettings);
          // const upcomingEventsListenerSettings = {collection:COLLECTIONS.upcomingEvents}
          // this.props.firestore.unsetListener(upcomingEventsListenerSettings);
        }
      }),
      // Connect todos from redux state to props.todos
      connect(({ firestore }) => ({
         profile: firestore.ordered.profiles, // document data by id
         user: firestore.ordered.users, // document data by id
         upcomingEvents: firestore.data.upcomingEvents, // document data by i
      }), mapDispatchToProps)
      
    )
    const authCondition = (authUser) => !!authUser;
   return enhance(
      withRouter(
      compose(
        withAuthorisation(authCondition)(withStyles(styles,{ withTheme: true })(WithNavigation))
      )))
    
}


