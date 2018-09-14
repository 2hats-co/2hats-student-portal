import React,{Component} from 'react'

import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MuiAvatar from '@material-ui/core/Avatar';
import deepOrange from '@material-ui/core/colors/deepOrange';
import Dialog from './Dialog/index'
import { Button, Grid } from '@material-ui/core';

import Dropzone from 'react-dropzone'
import {db} from '../store'
import { COLLECTIONS } from '../constants/firestore';

import {blobAvatarUploader} from '../utilities/Uploader'
import {remoteConsole} from '../utilities/remoteLogging'

const styles = theme =>({
    dropZone:{
        border:'none !important'
    },
    avatar: {
    cursor:'pointer',
      marginTop:-1,
      fontSize:14,
      textTransform:'uppercase'
    },
    
    orangeAvatar: {
        color: '#fff',
        backgroundColor: deepOrange[600],
    },
    bigAvatar: {
        marginTop:30,
        marginBottom:10,
        marginLeft:'auto',
        marginRight:'auto',
        width: 180,
        height: 180,
        fontSize:45
    },
    uploadButton:{  
        marginTop:10,
        width:230
    },
    link:{
        display:'block',
        width:'100%',
        textAlign:'center',
        marginTop:20,
        color:deepOrange[600],
        cursor:'pointer',
        '&:hover': {
            textDecoration:'underline',
        },
    }
  });
  
class Avatar extends Component{
    state= { isOpen:false,
        isUploading:false,
        avatarURL:'',
        hasChanged:false,
    }
    constructor(props){
        super(props)
        this.openDialog = this.openDialog.bind(this)
        this.onDrop = this.onDrop.bind(this)
        this.closeDialog = this.closeDialog.bind(this)
        this.cancelHandler = this.cancelHandler.bind(this)
        this.saveHandler = this.saveHandler.bind(this)
        this.handleUpload = this.handleUpload.bind(this)
    }
    componentWillMount(){
        if(this.props.avatarURL){
            this.setState({avatarURL:this.props.avatarURL})
        }
    }
    openDialog(){
        this.setState({isOpen:true})
    }
    closeDialog(){
        this.setState({isOpen:false})
    }
    cancelHandler(){
        if(this.props.avatarURL){
            this.setState({avatarURL:this.props.avatarURL,hasChanged:false})
        }
        this.closeDialog()
    }
    saveHandler(){
        db.collection(COLLECTIONS.users).doc(this.props.uid).update({avatarURL:this.state.avatarURL})
        this.closeDialog()
    }
    handleUpload(url){
        this.setState({avatarURL:url})
        this.setState({isUploading:false})
    }
    
    onDrop(files) {
        this.setState({isUploading:true,hasChanged:true})
        this.setState({avatarURL:files[0].preview})
        blobAvatarUploader(files[0],this.handleUpload)
      }
    render(){
        const {avatarURL,firstName,lastName,classes} = this.props
        const {isUploading,hasChanged,isOpen} = this.state
        let avatar = (<MuiAvatar onClick={this.openDialog} scr={avatarURL} className={classNames(classes.avatar)}>{firstName[0]}{lastName[0]}</MuiAvatar>)
        let bigAvatar = (<MuiAvatar src={avatarURL} className={classNames(classes.avatar,classes.bigAvatar)}>{firstName[0]}{lastName[0]}</MuiAvatar>)
        if(avatarURL){
            avatar = (<MuiAvatar onClick={this.openDialog} 
                alt={`${firstName} ${lastName}`}
                src={avatarURL}
                className={classes.avatar}/>)

            bigAvatar = (<MuiAvatar
        alt={`${firstName} ${lastName}`}
        src={this.state.avatarURL}
        className={classNames(classes.avatar, classes.bigAvatar)}
        />)
        }
       return(<div>
            {avatar}
            <Dialog isOpen={isOpen} 
           isLoading={isUploading}
            
            unChanged={!hasChanged}
            title={'Your Profile Photo'}
            activity='Update'
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
            {bigAvatar}
            <a className={classes.link}>Select a File</a>
            </Dropzone>
            </Grid>
            </Dialog>
        </div>
        )
       
    }
}

Avatar.propTypes = {
    classes: PropTypes.object.isRequired,
    avatarURL: PropTypes.string
};  
export default withStyles(styles)(Avatar);
