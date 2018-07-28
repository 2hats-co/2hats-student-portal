import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
        margin:30,
      padding:20,
    },
   button:{
        marginTop: 35,
        width: 200,
        marginLeft: 20
      }
  });

function MobileSubmission(props){
    const {headLine,uploadHandler,buildHandler,classes} = props
return( 
    <Card className={classes.root}>
        <Grid container direction='column' alignItems='center' justify='space-around'>
                <Typography variant='title'>
                    {headLine}
                </Typography>
                <Button className={classes.button} onClick={buildHandler} variant='flat' color="primary">
        Build
      </Button>
      <Button className={classes.button} onClick={uploadHandler} variant='flat' color="primary">
       Upload
      </Button>
               
        </Grid>
    </Card>
)

}

MobileSubmission.propTypes = {
    classes: PropTypes.object.isRequired,
  };
export default  withStyles(styles)(MobileSubmission)