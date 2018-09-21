import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
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
        maxHeight:35,
        marginTop: 15,
        width: '100%',
       
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
        <Grid container direction='column' alignItems='center' spacing={8} justify='space-between'>
            <Grid item>
                <Typography variant='headline'>
                    {headLine}
                </Typography>
                </Grid>
            <Grid item>
                <img className={classes.img} src={UploadMan} alt='uploadMan' />
                </Grid>
            <Grid item>
                <Typography className={classes.body} variant='body1'>
                If you do, you will be asked to upload your resume near the end of the sign-up process. You can save your progress and upload your resume later, too!
                </Typography>
                </Grid>
            <Grid item>
                <Typography className={classes.body} variant='body1'>
                Otherwise, we can help you build a resume using our quick and easy 6-step process!
                    </Typography>
                    </Grid>
            <Grid item style={{width:'100%'}}>
                    <Button className={classes.button} onClick={uploadHandler} variant='flat' color="primary">
                    I Have a Resume
      </Button>  
      </Grid>
            <Grid style={{width:'100%'}} item>    
                <Button className={classes.button} onClick={buildHandler} variant='outlined' color="primary">
        Help Me Build a Resume
      </Button>
      </Grid>
            
        </Grid>
    </Card>
)

}

MobileSubmission.propTypes = {
    classes: PropTypes.object.isRequired,
  };
export default  withStyles(styles)(MobileSubmission)