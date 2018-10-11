import React,{Component} from 'react'

import PropTypes from 'prop-types';
import MuiAvatar from '@material-ui/core/Avatar';
import Dialog from './Dialog/index'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MultiLineTextField from './InputFields/MultiLineTextField'
import Dropzone from 'react-dropzone'
import {db} from '../store'
import { COLLECTIONS } from '../constants/firestore';
import {uploader} from '../utilities/Uploader'
//import UAParser from 'ua-parser-js';

import buggyBoyImage from '../assets/images/buggyBoy.png'
const styles = theme =>({
    dropZone:{
        border:'none !important'
    },
    avatar: {
     position:'absolute',
     zIndex:2000,
     bottom:300,
     right:10,
     width:80,height:80
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
        behavior:'',
        deviceData:false
        
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
        // var parser = new UAParser();
        // this.setState({deviceData:parser.getResult()});
    }
    handleChange(name,value){
        this.setState({[name]:value,hasChanged:true})
    }
    openDialog(){
       
        this.setState({isOpen:true})
    }
    closeDialog(){
        this.setState({isOpen:false,
            isUploading:false,
            screenshotURL:'',
            hasChanged:false,
            expectation:'',
            behavior:'',})
    }
    cancelHandler(){
        this.setState({screenshotURL:'',hasChanged:false})
        this.closeDialog()
    }
    saveHandler(){
        const {screenshotURL,expectation,behavior,deviceData} = this.state
        const {userDoc,profileDoc} = this.props
        db.collection(COLLECTIONS.bugReports).add({userDoc,
            profileDoc,
            screenshotURL,
            expectation,
            behavior,
            RawDeviceData:JSON.stringify(deviceData),
            ua:deviceData.ua}) 
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
        const {isUploading,hasChanged,isOpen,expectation,behavior,screenshotURL} = this.state
        let avatar = (<MuiAvatar onClick={this.openDialog} 
            alt={`buggy boy`}
            src={buggyBoyImage}
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
            {screenshotURL ===''?'Upload screenshotURL':'Upload Successful'}
            </Button>
            </Dropzone>
            <MultiLineTextField
                title={`experienced behavior`}
                hasLabel = {true}
                hint={`describe the issue you're experiencing`}
                placeholder={`if there's a typo, type in the incorrect spelling and where it's located`}
                value={behavior}
                name='behavior'
                characterLimit={500}
                changeHandler={this.handleChange}
              />
            <MultiLineTextField
                title={'expected behavior'}
                hasLabel = {true}
                hint="if applicable describe what your goal/expectation of the interaction was"
                placeholder={`if there's a typo, type in the correct spelling here`}
                value={expectation}
                name='expectation'
                characterLimit={500}
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
//export default withStyles(styles)(BuggyBoy);
export default ()=>(<div/>);