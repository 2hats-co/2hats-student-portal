import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Button, Grid } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import Dropzone from 'react-dropzone'
import {storage} from '../../store'
import CircularProgress from '@material-ui/core/CircularProgress';
import classNames from "classnames";
import InputWrapper from './InputWrapper'

import { connect } from 'react-redux';

const styles = theme => ({
    root: {
        boxSizing: 'border-box',
        height: 200,
        width: 400,
        border: '3px dashed #979797',
        borderRadius: 5,
       
    },
    grid:{
        height:200,
    },
    wrapper: {
        margin: theme.spacing.unit,
        position: 'relative',
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
    
});

class ResumeLoader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isUploading:false };
        this.handleLoader = this.handleLoader.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.onDrop = this.onDrop.bind(this)
    }

    handleDelete(){
        const ref = storage.child(this.props.resumeFile.fullPath)
        ref.delete().then(this.props.changeHandler('resumeFile',{name:'',fullPath:''}))
    }
    handleLoader(snapShot){
        this.props.changeHandler('resumeFile',{name:this.props.resumeFile.name,fullPath:snapShot.metadata.fullPath})
        this.setState({isUploading:false})
    }
    
    onDrop(files) {

        let uid = this.props.authUser.uid
        if(uid.includes(':')){
            uid = uid.split(':')[1]
        }
        console.log(files[0].type)
      if(this.props.resumeFile.name!==''){
        this.handleDelete()
      }
        this.setState({isUploading:true})
        this.props.changeHandler('resumeFile',{name:files[0].name,fullPath:''})
        const documentRef = storage.child(`${uid}/resumes/${files[0].name}`)
        documentRef.put(files[0]).then(this.handleLoader);
      }
    render() {
        console.log(this.props.authUser.uid)
        const {classes,resumeFile } = this.props;
        const {isUploading} = this.state; 
        const buttonClassname = classNames({
            [classes.buttonSuccess]: true,
          });
        return (
            <InputWrapper
      title={'Resume Upload'}>
            <Dropzone className={classes.root}
            onDrop={this.onDrop.bind(this)}
            > 
            <Grid 
            className={classes.grid}
            container
            direction='column'
            justify='space-around'
            alignItems='center'
            > 
            <CloudUploadIcon style={{ fontSize: 66 }}/>
            <Typography variant='subheading'>
            Drag and drop your resume
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
          {resumeFile.name!==''? `${resumeFile.name}`:'Browser Files'}
          
          </Button>
         {isUploading && <CircularProgress size={24} className={classes.buttonProgress}/>}
        </div>
            </Grid>
            </Dropzone>
            </InputWrapper>
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

export default withStyles(styles)(connect(mapStateToProps)(ResumeLoader));