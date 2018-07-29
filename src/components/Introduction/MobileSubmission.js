import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import UploadMan from '../../assets/images/graphics/UploadMan.png'

const styles = theme => ({
    root: {
        margin:30,
      padding:20,
        maxHeight:600
    },
    img:{maxHeight:300},
   button:{
        marginTop: 15,
        width: '90%',
        marginLeft: 10,
        marginRight: 10
      },
      body:{
        textAlign:'center',
        marginBottom:5,
      },img:{

      }
      
  });

function MobileSubmission(props){
    const {headLine,uploadHandler,buildHandler,classes} = props
return( 
    <Card className={classes.root}>
        <Grid container direction='column' alignItems='center' justify='space-around'>
                <Typography variant='headline'>
                    {headLine}
                </Typography>
                <img className={classes.img} src={UploadMan} alt='uploadMan' />

                <Typography className={classes.body} variant='body1'>
                To obtain the personalised feedback from our 2hats resume specialists, we need to review your resume first.
                </Typography>
                <Typography className={classes.body} variant='body1'>
                Please upload your resume. If you don’t have one, we can help you build one using our quick and easy 5-Step process!
                </Typography>
                <Button className={classes.button} onClick={buildHandler} variant='flat' color="primary">
        Help Me Build a Resume
      </Button>
      <Button className={classes.button} onClick={uploadHandler} variant='outlined' color="primary">
       I Have a Resume Myself
      </Button>
               
        </Grid>
    </Card>
)

}

MobileSubmission.propTypes = {
    classes: PropTypes.object.isRequired,
  };
export default  withStyles(styles)(MobileSubmission)