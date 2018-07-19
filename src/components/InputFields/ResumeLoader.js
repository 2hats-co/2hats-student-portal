// handles uploads .docx, .pdf

// props: URL? 
import React from 'react'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Button, Grid } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import Dropzone from 'react-dropzone'
import {storage} from '../../store'
import CircularProgress from '@material-ui/core/CircularProgress';
import classNames from "classnames";
const styles = theme => ({
    root: {
        boxSizing: 'border-box',
        height: '334px',
        width: '583px',
        border: '3px dashed #979797',
        borderRadius: '3px',
        margin:28
    },
    grid:{
        height:190,
        marginTop:80
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
        // Don't call this.setState() here!
        this.state = {  fileName:'',
        isUploading:false };
        this.handleLoader = this.handleLoader.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.onDrop = this.onDrop.bind(this)

    }
    handleDelete(){
        const ref = storage.child(`resumes/${this.state.fileName}`)
        ref.delete().then(this.props.changeHandler('url',''))
    }
    handleLoader(snapShot){
        this.props.changeHandler('url',snapShot.metadata.fullPath)
        this.setState({isUploading:false})
    }
    
    onDrop(files) {
      if(this.state.fileName!==''){
        this.handleDelete()
      }
 
        this.setState({isUploading:true,fileName:files[0].name})
        const documentRef = storage.child(`resumes/${files[0].name}`)
        documentRef.put(files[0]).then(this.handleLoader);
      }
    
    render() {
        const { classes } = this.props;
        const {isUploading,fileName} = this.state; 
        const buttonClassname = classNames({
            [classes.buttonSuccess]: true,
          });
        return (
           
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
            onClick={() =>{fileName!==''? null: this.handleDelete}}
          >
          {fileName!==''? `${fileName}`:'Browser Files'}
          

          </Button>
         {isUploading && <CircularProgress size={24} className={classes.buttonProgress}/>}
        </div>
            </Grid>
            </Dropzone>
        );
    } 
}
ResumeLoader.propTypes = {
    url: PropTypes.string,
    classes: PropTypes.object.isRequired,
    changeHandler: PropTypes.func.isRequired
};
export default withStyles(styles)(ResumeLoader);