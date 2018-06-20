// handles uploads .docx, .pdf

// props: URL? 
import React from 'react'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Button, Grid } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import Dropzone from 'react-dropzone'

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
    }
    
});


class DocumentLoader extends React.Component {
    onDrop(files) {
       console.log(files)
      }
    
    render() {
        const { classes } = this.props;
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
            <Button variant='flat' color='primary'>
                Browse Files
            </Button>
            </Grid>
           
            </Dropzone>
           
        );
    } 
}
DocumentLoader.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DocumentLoader);