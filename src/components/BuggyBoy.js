import React,{Component} from 'react'

import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MuiAvatar from '@material-ui/core/Avatar';
import deepOrange from '@material-ui/core/colors/deepOrange';
import Dialog from './Dialog/index'
import { Button, Grid } from '@material-ui/core';
import MultiLineTextField from './InputFields/MultiLineTextField'
import Dropzone from 'react-dropzone'
import {db} from '../store'
import { COLLECTIONS } from '../constants/firestore';

import {uploader} from '../utilities/Uploader'
import {remoteConsole} from '../utilities/remoteLogging'

const minjieURL = 'https://firebasestorage.googleapis.com/v0/b/staging2hats.appspot.com/o/minjie.png?alt=media&token=bc25e10a-eba3-43af-b849-79bc67075138'
const styles = theme =>({
    dropZone:{
        border:'none !important'
    },
    avatar: {
     position:'absolute',
     zIndex:2000,
     bottom:300,
     right:10,
     width:50,height:50
    },
 
    uploadButton:{  
        marginTop:10,
        width:230
    }
  });
  
class BuggyBoy extends Component{
    state= { isOpen:false,
        isUploading:false,
        screenshotURL:'',
        hasChanged:false,
        expectation:'',
        behavior:''
        
    }
    constructor(props){
        super(props)
        this.openDialog = this.openDialog.bind(this)
        this.onDrop = this.onDrop.bind(this)
        this.closeDialog = this.closeDialog.bind(this)
        this.cancelHandler = this.cancelHandler.bind(this)
        this.saveHandler = this.saveHandler.bind(this)
        this.handleUpload = this.handleUpload.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    componentWillMount(){
    
    }
    handleChange(name,value){
        this.setState({[name]:value,hasChanged:true})
    }
    openDialog(){
       
        this.setState({isOpen:true})
    }
    closeDialog(){
        this.setState({isOpen:false})
    }
    cancelHandler(){
        this.setState({screenshotURL:'',hasChanged:false})
        this.closeDialog()
    }
    saveHandler(){
        db.collection(COLLECTIONS.users).doc(this.props.uid).update({avatarURL:this.state.avatarURL}) 
       this.closeDialog()
    }
    handleUpload(url){
        this.setState({screenshotURL:url})
        this.setState({isUploading:false})
    }
    
    onDrop(files) {
        this.setState({isUploading:true,hasChanged:true})
        this.setState({avatarURL:files[0].preview})
        const ref = 'bugScreenshots/'+Date.now()
        uploader(ref,files[0],this.handleUpload)
      }
    render(){
        const {classes} = this.props
        const {isUploading,hasChanged,isOpen,screenshotURL,expectation,behavior} = this.state
        let avatar = (<MuiAvatar onClick={this.openDialog} 
            alt={`buggy boy`}
            src={minjieURL}
            className={classes.avatar}/>)
       
       return(<div>
            {avatar}
            <Dialog isOpen={isOpen} 
                    isLoading={isUploading}
                    unChanged={!hasChanged}
                    title={'Bug report'}
                    activity='Submit'
                    disabled={isUploading||!hasChanged}
                    addHandler={this.saveHandler} 
                    cancelHandler={this.cancelHandler}
                >
            <Grid container direction='column' alignItems='center' style={{width:'100%'}}>
             <Dropzone 
             onDrop={this.onDrop.bind(this)} 
             className={classes.dropZone}
            accept="image/jpeg, image/png, image/jpg"
            > 
           
            <Button variant='flat' className={classes.uploadButton}>
            Upload screenshotURL
            </Button>
            </Dropzone>
            <MultiLineTextField
                title={""}
                hasLabel = {`what's happening ?`}
                hint={`describe the issue you're experiencing`}
                placeholder={`type in here`}
                value={expectation}
                name='expectation'
                characterLimit={400}
                changeHandler={this.handleChange}
              />
            <MultiLineTextField
                title={""}
                hasLabel = {'What you do expect to happen?'}
                hint="for example if there's a typo, type in the correct spelling"
                placeholder={`type in here`}
                value={behavior}
                name='behavior'
                characterLimit={400}
                changeHandler={this.handleChange}
              />
            </Grid>
            </Dialog>
        </div>
        )
       
    }
}

BuggyBoy.propTypes = {
    classes: PropTypes.object.isRequired,
    avatarURL: PropTypes.string
};  
export default withStyles(styles)(BuggyBoy);