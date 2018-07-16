import React from 'react';
import Typography from '@material-ui/core/Typography'
import { withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button"
import { Grid } from '../../../node_modules/@material-ui/core';
const styles = theme => ({
    root: {
     width:500
    },
  });
function FeedbackHistory(props){
    const {classes} = props
   
    return(<div className={classes.root}>
    <Typography variant='display1'>
   Application Progress
    </Typography>
    <Grid container direction='row'>
             <Grid item>
            60%
            </Grid>
            <Grid container direction='column'>
                 <Grid container direction='row'>
                     <Typography variant='subheading'>
                        Career Interests</Typography>
                </Grid>
            </Grid>
    </Grid>
    <Grid container direction='row'>
        <Button>
            Finish Application
        </Button>
        <Button>
            Upload Resume instead
        </Button>
    </Grid>
   
   </div>)
}

export default withStyles(styles)(FeedbackHistory);