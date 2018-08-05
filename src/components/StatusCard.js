import React from 'react'
import { Typography,Grid,Card,Button } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import ConfirmationDialog from './ConfirmationDialog'
import { PROCESS_TYPES } from '../constants/signUpProcess';
import * as routes from '../constants/routes'

const drawerWidth = 240;
const styles = theme => ({
    root:{
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
        padding:20,
      },
      actionGrid:{
        minWidth:375,
        maxWidth:400
      },
      link:{
        fontSize:'15px',
        fontWeight:'bold',
        textAlign:'center',
        color: theme.palette.primary.main,
        textDecoration: 'underline',
        '&:hover': {
          cursor: 'pointer'
        },

      }
  });
class StatusCard extends React.Component{
    state={
        confirmationDialog:null
    }
    getConfirmationDialog(dialog){
        switch (dialog) {
          case 'submit':return {title:'Confirm Profile Submission',
          body:[`Are you sure you want to submit?`,`\n`,`Once you click 'submit' your resume will be sent to the 2hats resume specialists for review. You will be unable to make further changes to your submission until after your resume has been reviewed and given feedback.`],
          checkbox:{isChecked:false,label:'I confirm that I want to submit my profile.'},
          confirm:{label:'Submit',action:()=>{this.props.onSubmit()}}}
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
        const completeButton = {label:'Complete Profile',action:()=>{this.props.goTo(routes.UPLOAD_RESUME)}}
        const buildLink = {label:'Use Our Resume Builder Instead',action:()=>{this.setState({confirmationDialog:this.getConfirmationDialog('build')})}}
        const buildButton = {label:'Continue Building',action:()=>{this.props.goTo(routes.BUILD_RESUME)}}
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
    const {classes,profile ,theme} = this.props
    const {message,buttons,link} = this.getStatusPrompt(profile)

    return(
        <div>
        <Card className={classes.root}>
            <Grid container className={classes.grid} direction='row' alignItems='center' justify='space-around'> 
                <Grid  xs={12} sm={6} item><Typography className={classes.prompt} variant='subheading'>
                  {message}
                </Typography>
                </Grid>
                {
                <Grid item xs={12} sm={6}>
                <Grid container  direction='row' alignItems='center' justify='flex-end'>
                {buttons&&
                    buttons.map(x=>{return(
                        <Grid item xs={6} sm={4}>
                        <Button onClick={x.action} style={{maxHeight:35,minWidth:180}} variant='flat'>
                        {x.label}
                        </Button>
                        </Grid>
                    )
                })
                }
                {
                 (link && !theme.responsive.isMobile)&&  <Grid item xs={1} sm={1}> <Typography variant='Button' style={{textAlign:'left'}}>OR</Typography> </Grid>
                }
                 {link&&
                  <Grid item xs={6} sm={6}>
                    <a className={classes.link} onClick={()=>{link.action()}}>
                    {link.label}
                    </a> 
                    </Grid>
                }
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