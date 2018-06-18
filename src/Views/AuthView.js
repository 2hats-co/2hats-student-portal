import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    margin: 'auto',
    //position: 'fixed',
    marginTop: theme.spacing.unit * 10,
    width: 300,
    height: 500
  }),
  textField:{
    //marginTop:-12,
    width:'100%'
  },
  grid:{
    height:400
  }
});

class AuthView extends React.Component {

  render(){
    const { classes } = this.props;
    return (
      <div>
        
        <Paper className={classes.root} elevation={4}>
          <Grid
          container
          spacing={16}
          className={classes.grid}
            alignItems='center'
            direction='column'
            justify='center'
          >
          
            <Typography variant="button" gutterBottom>
              OR
            </Typography>
      
              <TextField
                  id="email"
                  label="Email Address"
                  placeholder="Email Address"
                  className={classes.textField}
                  margin="normal"
                  color="primary"
                />
                <TextField
                  
                  id="password"
                  label="Password"
                  placeholder="Password"
                  className={classes.textField}
                  margin="normal"
                  type='password'
                  
                />
           
              
              <Button variant="contained" color="primary" className={classes.button}>
              Sign In
            </Button>
            </Grid>
        </Paper>
      </div>
    );
  }
}

AuthView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AuthView);