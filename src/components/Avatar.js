import React,{Component} from 'react'

import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MuiAvatar from '@material-ui/core/Avatar';
import deepOrange from '@material-ui/core/colors/deepOrange';
import Dialog from './Dialog/index'
import { Button } from '@material-ui/core';

import Dropzone from 'react-dropzone'
import {db,firebaseStorage} from '../store'
import { COLLECTIONS } from '../constants/firestore';


const styles = theme =>({
    dropZone:{
      
        border:'none !important'
    },
    avatar: {
      margin: 2,
      fontSize:14,
      textTransform:'uppercase'
    },
    
    orangeAvatar: {
        color: '#fff',
        backgroundColor: deepOrange[600],
    },
    bigAvatar: {
        margin:30,
      width: 150,
      height: 150,
      fontSize:45
    },
    uploadButton:{
        marginLeft:10,  
        width:190
    }
  });
  
class Avatar extends Component{

    state= { isOpen:true,
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
    handleUpload(snapShot){
        firebaseStorage
        .child(snapShot.metadata.fullPath)
        .getDownloadURL()
        .then(url => 
           this.setState({avatarURL:url})
        )
     
        this.setState({isUploading:false})
    }
    onDrop(files) {
        const uid = this.props.uid
            this.setState({isUploading:true,hasChanged:true})
            const documentRef = firebaseStorage.child(`${uid}/avatarPhotos/${Date.now()}/${files[0].name}`)
            documentRef.put(files[0]).then(this.handleUpload);
      }
    render(){
        const {avatarURL,firstName,lastName,classes} = this.props
        const {isUploading,hasChanged,isOpen} = this.state
        let avatar = (<MuiAvatar onClick={this.openDialog} scr={avatarURL} className={classNames(classes.avatar,classes.orangeAvatar)}>{firstName[0]}{lastName[0]}</MuiAvatar>)
        let bigAvatar = (<MuiAvatar src={avatarURL} className={classNames(classes.avatar,classes.bigAvatar,classes.orangeAvatar)}>{firstName[0]}{lastName[0]}</MuiAvatar>)
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
            title={'your avatar'}
            activity='Update'
            disabled={isUploading||!hasChanged}
            addHandler={this.saveHandler} 
            cancelHandler={this.cancelHandler}
            >
             <Dropzone 
             onDrop={this.onDrop.bind(this)} 
             className={classes.dropZone}
             accept="image/jpeg, image/png, image/jpg"
            > 
            {bigAvatar}
            <Button variant='flat' className={classes.uploadButton}>
            Upload Photo
            </Button>
            </Dropzone>
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