import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Button, Grid } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import Dropzone from 'react-dropzone'
import {firebaseStorage} from '../../store'
import CircularProgress from '@material-ui/core/CircularProgress';
import Chip from '@material-ui/core/Chip';
import classNames from "classnames";
import InputWrapper from './InputWrapper'
import MessageBar from '../MessageBar';
import DownloadIcon from '@material-ui/icons/ArrowDownward';


import { connect } from 'react-redux';



const styles = theme => ({
    root: {
        marginBottom:20,
        marginTop:20,
        boxSizing: 'border-box',
        marginTop:5,
        width:'100%',
        height:'100%',
        border: '3px dashed #979797',
        borderRadius: 5,
       
    },
    grid:{
        height:270,
        width:'100%',        
    },
    wrapper: {
        margin: theme.spacing.unit,
        position: 'relative',
        textAlign: 'center',
    },
    buttonSuccess: {
        //backgroundColor: green[500],
        '&:hover': {
            //  backgroundColor: green[700],
        },
    },
    
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },

    chipWrapper: {
        marginTop: theme.spacing.unit,
        textAlign: 'center',
    },
    
});

class ResumeLoader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isUploading:false };
        this.handleLoader = this.handleLoader.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.onDrop = this.onDrop.bind(this)
        this.handleCloseSnackbar = this.handleCloseSnackbar.bind(this)
    }
    handleCloseSnackbar(){
        this.setState({errorBar:false})
    }

    handleDelete(){
        const ref = firebaseStorage.child(this.props.resumeFile.fullPath)
       // ref.delete().then(this.props.changeHandler('resumeFile',{name:'',fullPath:''}))
    }
    handleLoader(snapShot){
        firebaseStorage
        .child(snapShot.metadata.fullPath)
        .getDownloadURL()
        .then(url => 
        this.props.changeHandler(
            'resumeFile',{
                name:this.props.resumeFile.name,
                fullPath:snapShot.metadata.fullPath,
                downloadURL:url,
                createdAt:new Date(Date.now())
            }
            )
    )
        this.setState({isUploading:false})
        this.props.changeHandler('isLoading',false)
    }
    
    onDrop(files) {
       
        if(files[0].type !=='application/pdf'){
        this.setState({errorBar:true})
        }else{
            const uid = this.props.authUser.uid
       
          if(this.props.resumeFile.name!==''){
            this.handleDelete()
          }
            this.setState({isUploading:true})
            this.props.changeHandler('isLoading',true)
            this.props.changeHandler('resumeFile',{name:files[0].name,fullPath:`${uid}/resumes/${Date.now()}/${files[0].name}`, downloadURL:''})
            const documentRef = firebaseStorage.child(`${uid}/resumes/${Date.now()}/${files[0].name}`)
            documentRef.put(files[0]).then(this.handleLoader);
        }
      }
    render() {
        const {classes,resumeFile,theme,hideTitle } = this.props;
        const {isUploading} = this.state; 
        const buttonClassname = classNames({
            [classes.buttonSuccess]: true,
          });
        return (
            <div style={!theme.responsive.isMobile?{minWidth:420}:{}}>
            <InputWrapper
            title={!hideTitle&&'Resume Upload'}
            hint={!hideTitle&&'Please upload in PDF format'}
            collapseTopMargin
            >
            <Dropzone className={classes.root}
            onDrop={this.onDrop.bind(this)}
            accept="application/pdf"
            > 
            <Grid 
            className={classes.grid}
            container
            direction='column'
            justify='space-around'
            alignItems='center'
            > 
            <CloudUploadIcon style={{ fontSize: 66 }}/>
            <Typography variant='button'>
            {theme.responsive.isMobile?'Click to browse for your PDF resume':'Drag and drop your PDF resume'}
            </Typography>
            <Typography variant='subheading'>
            OR
            </Typography>
            <div className={classes.wrapper}>
          <Button
            variant="flat"
            color="primary"
            className={buttonClassname}
            disabled={isUploading}
            onClick={() =>{resumeFile.name!==''? null: this.handleDelete()}}
          >
          {resumeFile.name!==''? 'Upload New Resume':'Browse Files'}
          </Button>
          {resumeFile.name !== '' && 
            <div className={classes.chipWrapper}>
                <Chip
                label={resumeFile.name} 
                onClick={()=>{ window.open(resumeFile.downloadURL, '_blank');}}
                onDelete={()=>{ window.open(resumeFile.downloadURL, '_blank');}}
                deleteIcon={<DownloadIcon />}
                />
            </div>
          }
         {isUploading &&<CircularProgress size={24} className={classes.buttonProgress}/>}
        </div>
            </Grid>
            </Dropzone>
            </InputWrapper>
            <MessageBar message="Please upload in PDF format" isOpen={this.state.errorBar} duration={4000} variant='error' closeHandler={this.handleCloseSnackbar}/>
            </div>
        );
    } 
}

ResumeLoader.propTypes = {
    classes: PropTypes.object.isRequired,
    changeHandler: PropTypes.func.isRequired,
    resumeFile: PropTypes.shape({
        name: PropTypes.string,
        fullPath: PropTypes.string
      }),
};

  function mapStateToProps(state){
    return{
      authUser: state.sessionState.authUser
    }
  }

export default withStyles(styles,{ withTheme: true })(connect(mapStateToProps)(ResumeLoader));
