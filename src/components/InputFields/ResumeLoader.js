import React from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CloudDoneIcon from '@material-ui/icons/CloudDone';
import Dropzone from 'react-dropzone'
import {firebaseStorage} from '../../firebase/storage'
import LinearProgress from '@material-ui/core/LinearProgress';
import Chip from '@material-ui/core/Chip';
import classNames from "classnames";
import InputWrapper from './InputWrapper'
import MessageBar from '../MessageBar';
import DownloadIcon from '@material-ui/icons/ArrowDownward';
import {cloudFunction,CLOUD_FUNCTIONS} from '../../utilities/CloudFunctions'

import { connect } from 'react-redux';



const styles = theme => ({
    root: {
        marginBottom:0,
        marginTop:20,
        boxSizing: 'border-box',
        marginTop:5,
        width:'100%',
        height:'100%',
        border: '3px dashed #979797',
        borderRadius: 5,
       
    },
    grid:{
        height:262,
        width:'100%',        
    },
    wrapper: {
        margin: theme.spacing.unit,
        position: 'relative',
        textAlign: 'center',
        maxWidth: 'calc(100% - 20px)',
    },
    buttonSuccess: {
        //backgroundColor: green[500],
        '&:hover': {
            //  backgroundColor: green[700],
        },
    },
    
    buttonProgress: {
        //
    },

    chipWrapper: {
        marginTop: theme.spacing.unit,
        textAlign: 'center',
    },


    chiplabel: {
        display: 'block',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    
});

class ResumeLoader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isUploading: false,
            uploadProgress: 0,
        };
        this.handleLoader = this.handleLoader.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.onDrop = this.onDrop.bind(this)
        this.handleCloseSnackbar = this.handleCloseSnackbar.bind(this)
        this.handleProgress = this.handleProgress.bind(this)
        this.handleChange = this.handleChange.bind(this)

        this.uploadTask;
    }
    handleCloseSnackbar(){
        this.setState({errorBar:false})
    }

    handleDelete(){
        console.log('delete')
        if (this.uploadTask) this.uploadTask.cancel();
        // Don't delete resumes from storage, we need them to be accessable from the admin portal
        ///const ref = firebaseStorage.child(this.props.resumeFile.fullPath)
       // ref.delete();/*.then(()=>{*/
            this.props.changeHandler('resumeFile',{name:'',fullPath:'',downloadURL:''});
            this.setState({isUploading:false});
        //});
    }
    handleLoader(snapShot){
        firebaseStorage
        .child(snapShot.metadata.fullPath)
        .getDownloadURL()
        .then(url => {
            cloudFunction(CLOUD_FUNCTIONS.RESUME_SCRAPER)
            this.props.changeHandler(
                'resumeFile',{
                    name:this.props.resumeFile.name,
                    fullPath:snapShot.metadata.fullPath,
                    downloadURL:url,
                    createdAt:new Date(Date.now())
                }
                )
        }
        
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
            this.props.changeHandler('resumeFile',{name:files[0].name,fullPath:`candidates/${uid}/resumes/${Date.now()}/${files[0].name}`, downloadURL:''})
            const documentRef = firebaseStorage.child(`candidates/${uid}/resumes/${Date.now()}/${files[0].name}`)
            let uploadTask = documentRef.put(files[0]);
            this.uploadTask = uploadTask;
            this.handleProgress(uploadTask)
            uploadTask.then(this.handleLoader)
        }
      }
    handleChange(name,value){
        this.setState({[name]:value})
    }
    handleProgress(uploadTask){
        let _changeHandler = this.handleChange;
        uploadTask.on('state_changed', function(snapshot) {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            _changeHandler('uploadProgress', progress);
            switch (snapshot.state) {
              case 'paused': // or 
                console.log('Upload is paused');
                break;
              case 'running': // or 'running'
                console.log('Upload is running');
                break;
            }
        });
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
            hint={!hideTitle&&'Please upload your resume file in PDF format'}
            collapseTopMargin
            >
            <Dropzone className={classes.root}
            onDrop={this.onDrop.bind(this)}
            accept="application/pdf"
            style={{marginTop:10}}
            > 
            <Grid 
            className={classes.grid}
            container
            direction='column'
            justify='center'
            alignItems='center'
            > 
            <Grid item style={{marginBottom:20,textAlign:'center'}}>
                { !isUploading && resumeFile.name !== '' ?
                    <CloudDoneIcon style={{ fontSize: 66 }}/> :
                    <CloudUploadIcon style={{ fontSize: 66 }}/>
                }
                { isUploading ?
                    <div style={{width:150}}>
                        <Grid container justify="space-between" style={{marginBottom:5}}>
                            <Grid item><Typography variant="body1">Uploading&hellip;</Typography></Grid>
                            <Grid item><Typography variant="body1">{Math.round(this.state.uploadProgress)}%</Typography></Grid>
                        </Grid>
                        <LinearProgress value={this.state.uploadProgress} variant="determinate" className={classes.buttonProgress}/>
                    </div>
                :
                    <Typography variant='button'>
                        { resumeFile.name !== '' ?
                            'Resume uploaded' :
                            theme.responsive.isMobile?'Click to browse for your PDF resume':'Drag and drop your PDF resume'
                        }
                    </Typography>
                }
            </Grid>
            <div className={classes.wrapper}>
                {resumeFile.name !== '' ?
                    <div className={classes.chipWrapper}>
                        {isUploading ?
                            <Chip
                            label={resumeFile.name} 
                            onDelete={this.handleDelete}
                            style={{maxWidth:'100%'}}
                            classes={{label:classes.chiplabel}}
                            />
                        :
                            <Chip
                            label={resumeFile.name}
                            onClick={()=>{ window.open(resumeFile.downloadURL, '_blank');}}
                            onDelete={this.handleDelete}
                            avatar={<DownloadIcon style={{transform:'scale(0.8)',marginRight:-12}} />}
                            style={{maxWidth:'100%'}}
                            classes={{label:classes.chiplabel}}
                            />
                        }
                    </div>
                :
                    <Button
                        variant="flat"
                        color="primary"
                        className={buttonClassname}
                        disabled={isUploading}
                        onClick={() =>{resumeFile.name!==''? null: this.handleDelete()}}
                        style={{textTransform:'none'}}
                    >Select a file</Button>
                }
            </div>
            </Grid>
            </Dropzone>
            </InputWrapper>
            <MessageBar message="Please upload your resume file in PDF format" isOpen={this.state.errorBar} duration={4000} variant='error' closeHandler={this.handleCloseSnackbar}/>
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
