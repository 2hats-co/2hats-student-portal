import React from 'react'
import { Typography,Grid,Card,Button } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import ConfirmationDialog from './ConfirmationDialog'
import { PROCESS_TYPES,firstUnfinishedStep} from '../constants/signUpProcess';
import * as routes from '../constants/routes'
import {isComplete} from '../constants/signUpProcess'
import AlertIcon from '@material-ui/icons/Error'
import DoneIcon from '@material-ui/icons/Done'
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import AnimateIcon from './AnimateIcon'
import ArrowIcon from '@material-ui/icons/KeyboardArrowRight'

import PopupSelector from './PopupSelector'

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
      padding: '20px 10px',
      [theme.breakpoints.up('xs')]: {
        paddingRight:0
      },
      [theme.breakpoints.up(700)]: {
        paddingRight:80
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
        fontSize:34,
        color:red[500]
      },
      success:{
        width:30,
        height:30,
        borderRadius:15,
        backgroundColor:green.A700
      },
      successIcon:{
        position:'relative',
        color:'#fff',
        top:3,
        left:2,
      },
      dropDown:{
        position:'absolute',
        right:0,
        bottom:20
      },
      rightButtons: {
        marginTop: 8,
        [theme.breakpoints.up('sm')]: {
          marginTop: 0,
        },
      }

  });
class StatusCard extends React.Component{
    state={
        confirmationDialog:null,
    }
    getConfirmationDialog(dialog){
        switch (dialog) {
          case 'submit':return {title:'Confirm Profile Submission',
          body:[`Are you sure you want to submit?`,`Once you click 'submit' your resume will be sent to the 2hats resume specialists for review.`],
          checkbox:{isChecked:false,label:'I understand I can not submit again until my resume has been reviewed.'},
          confirm:{label:'Submit',action:()=>{this.props.goTo(routes.DASHBOARD),
            window.dataLayer.push({
            'event':'VirtualPageview',
            'virtualPageURL':'/virtual/Submit/',
            'virtualPageTitle' : 'Submit Profile'
            }),this.props.onSubmit()}}}
          case 'build':return {title:'Use Our Resume Builder Instead',
          body:['Are you sure you want to build a new resume instead?','All your previous progress will be saved, and you can always choose to upload an existing resume in the future.'],
          confirm:{label:'Build',action:()=>{
            this.props.goTo(routes.BUILD_RESUME)
          }}}
         case 'upload':return {title:'Upload Existing Resume Instead',
          body:[`Are you sure you want to switch to uploading your resume instead?`,
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
        const uploadButton = {label:'Upload Resume',action:()=>{this.props.goTo(`${routes.UPLOAD_RESUME}?step=3`)}}
        const pendingButton = {label:'Pending Feedback',disabled:true,action:()=>{}}
        const completeButton = {label:'Complete Profile',action:()=>{
            const returnStep = firstUnfinishedStep(this.props.profile)
            this.props.goTo(`${routes.UPLOAD_RESUME}?step=${returnStep}`) 
          }
        }
        const buildLink = {label:'Use Our Resume Builder Instead',action:()=>{this.setState({confirmationDialog:this.getConfirmationDialog('build')})}}
        const buildButton = {label:'Continue Building',action:()=>{
            const returnStep = firstUnfinishedStep(this.props.profile)
            this.props.goTo(`${routes.BUILD_RESUME}?step=${returnStep}`)
          }
        }
        const submitButton = {label:'Submit Profile',action:()=>{this.setState({confirmationDialog:this.getConfirmationDialog('submit')})}}
        const inCompleteBuildMessage = 'It looks like you haven’t finished building your resume yet.'
        const inCompleteUploadMessage = 'It looks like you haven’t filled out all the necessary information yet.'
        const noUploadMessage = 'It looks like you haven’t uploaded your resume yet.'
        const completeMessage = 'Congratulations! Your profile is ready to be reviewed.'
        const inReviewMessage = 'Your profile is currently under review. We will notify you regarding the feedback.'
        const chanceMessage = 'Feedback received! Please review it and update your profile before submitting again.'
        const alterIcon =(<AlertIcon className={this.props.classes.alert}/>)
        const doneIcon =(<div className={this.props.classes.success}>
        <DoneIcon className={this.props.classes.successIcon}/>
        </div>)
        if(profile.hasSubmit){
          console.log(this.props.status)
          if(this.props.status==='updating'){
            return({icon:doneIcon,
              message:chanceMessage,
              buttons:[submitButton]
            })
          }else{
            return({icon:doneIcon,
                    message:inReviewMessage,
                    buttons:[pendingButton]
                  })
          }
        }else{
          if(isComplete(profile)){
            let _message = completeMessage
            if(this.props.status==='updating'){
              _message = chanceMessage
            }
            if(profile.process === PROCESS_TYPES.build){
              return({icon:doneIcon,
                message:_message,
                      buttons:[submitButton],
                      link:uploadLink})
            }else if(profile.process === PROCESS_TYPES.upload){


              return({icon:doneIcon,
                  message:_message,
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
    const {message,buttons,icon,link} = this.getStatusPrompt(profile)
    const isMobile = theme.responsive.isMobile
    const hideToaster = (currentRoute=== routes.PROFILE)
    return(
        <div>
        <Card className={classes.root} style={hideToaster?{backgroundColor:'#FFF4ED'}:{display:'none'}} elevation={0}>
            <Grid container 
            justify={isMobile?'flex-end':'space-between'} className={classes.grid} style={!isMobile?{paddingLeft:40}:{}}direction='row' alignItems='center' > 
                <Grid  xs={12} sm={6} md={7} lg={8} item>
                  <Grid container direction='row' justify='flex-start' alignItems='center'>
                    {icon}
                    <Grid item style={{flex: 1}}>
                      <Typography className={classes.prompt} variant='subheading' style={{marginLeft:10,textAlign:'left'}}>
                      {message}
                      </Typography>
                    </Grid>
                  </Grid>
               
                </Grid>
                {
                <Grid item xs={12} sm={6}  md={5} lg={4} className={classes.rightButtons}>
                  <Grid container direction='row' justify='flex-end' alignItems='center'>
                    {buttons&&
                        buttons.map(x=>{return(
                        <Grid item xs sm="auto">
                            <Button key={x.label} disabled={x.disabled} style={{width:'100%'}} id={`${x.label}-toaster-button`} onClick={x.action} className={classes.button} variant='flat'>
                            <div style={{display:'flex',marginLeft:12,marginRight:12}}>
                        <div style={{marginTop:0}}> {x.label}</div> {!x.disabled&&<AnimateIcon> <ArrowIcon style={{marginRight:-18,marginTop:-1}}/><ArrowIcon style={{marginRight:-8,marginTop:-1}}/> </AnimateIcon>} 
                        </div>
                            </Button>
                        </Grid>
                        )
                    })
                    }{link&&<Grid item style={{marginLeft:8,marginRight:8}}>
                      <PopupSelector items={[{label:link.label,action:link.action}]}/>
                    </Grid>}
                  </Grid>
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
