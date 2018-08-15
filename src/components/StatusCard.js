import React from 'react'
import { Typography,Grid,Card,Button } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import ConfirmationDialog from './ConfirmationDialog'
import { PROCESS_TYPES } from '../constants/signUpProcess';
import * as routes from '../constants/routes'
import {isComplete} from '../constants/signUpProcess'
import AlertIcon from '@material-ui/icons/Error'
import DoneIcon from '@material-ui/icons/Done'
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

const drawerWidth = 240;
const styles = theme => ({
    root:{
    overflow:'visible',
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

    },prompt:{
        [theme.breakpoints.up('xs')]: {
            textAlign:'center'
          },
        [theme.breakpoints.up('md')]: {
            textAlign:'left'
        },
    },
    grid:{
      padding:10,
      paddingTop:20,
      paddingBottom:20,
      [theme.breakpoints.up('xs')]: {
        paddingRight:0
      },
      [theme.breakpoints.up('sm')]: {
        paddingRight:60
      },
    [theme.breakpoints.up('md')]: {
      paddingRight:40
    },
     
     
      },
      actionGrid:{
        minWidth:375,
        maxWidth:400
      },
      link:{
      //  marginLeft:20,
        fontSize:'15px',
        fontWeight:'bold',
        textAlign:'left',
        color: theme.palette.primary.main,
        textDecoration: 'underline',
        '&:hover': {
          cursor: 'pointer'
        },

      },
      button:{
       maxHeight:35,
       minWidth:160,
      },
      alert:{
        position:'relative',
        top:5,
        left:-5,
        color:red[500]
      },
      success:{
        position:'relative',
        top:5,
        left:-5,
        color:green.A700
      },
      dropDown:{
        position:'absolute',
        right:0,
        bottom:10
      }

  });
class StatusCard extends React.Component{
    state={
        confirmationDialog:null,
        popperIsOpen:false
    }
    getConfirmationDialog(dialog){
        switch (dialog) {
          case 'submit':return {title:'Confirm Profile Submission',
          body:[`Are you sure you want to submit?`,`\n`,`Once you click 'submit' your resume will be sent to the 2hats resume specialists for review.`],
          checkbox:{isChecked:false,label:'I understand I can not submit again until my resume has been reviewed.'},
          confirm:{label:'Submit',action:()=>{this.props.goTo(routes.DASHBOARD),this.props.onSubmit()}}}
          case 'build':return {title:'Use Our Resume Builder Instead',
          body:['Are you sure you want to build a new resume instead?','','All your previous progress will be saved, and you can always choose to upload an existing resume in the future.'],
          confirm:{label:'Build',action:()=>{
            this.props.goTo(routes.BUILD_RESUME)
          }}}
         case 'upload':return {title:'Upload Existing Resume Instead',
          body:[`Are you sure you want to switch to uploading your resume instead?`,`\n`,
          `All your previous progress will be saved, and you can always go back to using our Resume Builder if you wish.`],
          confirm:{label:'Upload',action:()=>{
            this.props.goTo(routes.UPLOAD_RESUME)
          }}}
          default:
            break;
        }
      }
      getStatusPrompt(profile){
        const uploadLink = {label:'Upload Existing Resume Instead',action:()=>{this.setState({confirmationDialog:this.getConfirmationDialog('upload')})}}
        const uploadButton = {label:'Upload Resume',action:()=>{this.props.goTo(routes.UPLOAD_RESUME)}}
        const pendingButton = {label:'Pending Feedback',disabled:true,action:()=>{}}
        const completeButton = {label:'Complete Profile',action:()=>{this.props.goTo(routes.UPLOAD_RESUME)}}
        const buildLink = {label:'Use Our Resume Builder Instead',action:()=>{this.setState({confirmationDialog:this.getConfirmationDialog('build')})}}
        const buildButton = {label:'Continue Building',action:()=>{this.props.goTo(routes.BUILD_RESUME)}}
        const submitButton = {label:'Submit Profile',action:()=>{this.setState({confirmationDialog:this.getConfirmationDialog('submit')})}}
        const inCompleteBuildMessage = 'It looks like you haven’t finished building your resume yet.'
        const inCompleteUploadMessage = 'It looks like you haven’t filled out all the necessary information yet.'
        const noUploadMessage = 'It looks like you haven’t uploaded your resume yet.'
        const completeMessage = 'Congratulations! Your profile is ready to be reviewed.'
        const inReviewMessage = 'Your profile is currently under review. We will notify you regarding the feedback.'
        const alterIcon =(<AlertIcon className={this.props.classes.alert}/>)
        const doneIcon =(<DoneIcon className={this.props.classes.success}/>)
        if(profile.hasSubmit){
          return({icon:doneIcon,
            message:inReviewMessage,
                  buttons:[pendingButton]})

        }else{
          if(isComplete(profile)){
            if(profile.process === PROCESS_TYPES.build){
              return({icon:doneIcon,
                message:completeMessage,
                      buttons:[submitButton],
                      link:uploadLink})
            }else if(profile.process === PROCESS_TYPES.upload){
              return({icon:doneIcon,
                  message:completeMessage,
                      buttons:[submitButton],
                      link:buildLink})
            }
          }else{
            if(profile.process === PROCESS_TYPES.build){
              return({icon:alterIcon,
                      message:inCompleteBuildMessage,
                      buttons:[buildButton],
                      link:uploadLink})
            }else if(profile.process === PROCESS_TYPES.upload){
                if(profile.resumeFile && profile.resumeFile.fullPath !== ''){
                  return({icon:alterIcon,
                          message:inCompleteUploadMessage,
                          buttons:[completeButton],
                          link:buildLink})
                }else{
                  return({icon:alterIcon,
                          message:noUploadMessage,
                          buttons:[uploadButton],
                          link:buildLink})
                }
            }
          }    
        }
      }
    render(){
    const {classes,profile,theme,currentRoute} = this.props
    const {popperIsOpen} = this.state
    const {message,buttons,icon,link} = this.getStatusPrompt(profile)
    const isMobile = theme.responsive.isMobile
    const hideToaster = (currentRoute=== routes.PROFILE)
    return(
        <div>
        <Card className={classes.root} style={hideToaster?{}:{display:'none'}}>
            <Grid container 
            justify={isMobile?'flex-end':'space-between'} className={classes.grid} style={!isMobile?{paddingLeft:40}:{}}direction='row' alignItems='center' > 
                <Grid  xs={12} sm={6} md={9} lg={10} item><Typography className={classes.prompt} variant='subheading'>
                  {icon}{message}
                </Typography>
                </Grid>
                {
                <Grid item xs={12} sm={6}  md={3} lg={2} style={{maxWidth:230}}>
                {buttons&&
                    buttons.map(x=>{return(
          
                        <Button key={x.label} disabled={x.disabled} id={`${x.label}-toaster-button`} onClick={x.action} className={classes.button} variant='flat'>
                        {x.label}
                        </Button>
                     
                    )
                })
                }{link&&<div><Button
                  className={classes.dropDown}
                  variant='contained'
                  buttonRef={node => {
                    this.anchorEl = node;
                  }}
                  aria-owns={popperIsOpen ? 'switch-toggle' : null}
                  aria-haspopup="true"
                  onClick={()=>{this.setState({popperIsOpen:true})}}
                > ... 
                </Button>
                <Popper open={popperIsOpen} anchorEl={this.anchorEl} transition disablePortal>
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      id="switch-toggle"
                      style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={()=>{this.setState({popperIsOpen:false})}}>
                          <MenuList>
                            <MenuItem value="Account" onClick={link.action}>
                              {link.label}
                            </MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper></div>}
                </Grid>
                }
            </Grid>
        </Card>
         {
            this.state.confirmationDialog&& 
                            <ConfirmationDialog dialog={this.state.confirmationDialog} 
                              closeHandler={()=>{this.setState({confirmationDialog:null})}}
                              checkHandler={()=>{
                              let newObj = Object.assign(this.state.confirmationDialog,{checkbox:{isChecked:!this.state.confirmationDialog.checkbox.isChecked,
                                                          label:this.state.confirmationDialog.checkbox.label}} )
                              this.setState({confirmationDialog:newObj})}}/>
        }
        </div>
    )}
}
export default withStyles(styles,{ withTheme: true })(StatusCard)