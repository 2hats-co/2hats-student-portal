import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LogoOnCard from '../components/LogoOnCard';
import HappyMan from '../assets/images/graphics/Intro3.png'
import { Grid, Button, Typography, Dialog, DialogContent, DialogActions, DialogTitle, DialogContentText, Slide, TextField } from '@material-ui/core';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}
const styles = theme => ({
    grid: {
        height: 590
    },
    footerButtons: {
        width: 440,
    },
    button: {
        width: 200,
    },
    image: {
        width: 200,
    },
    textField: {
        //marginTop:-12,
        width: '100%'
      },

});
const body = ['To ensure you can successfully receive our feedback, we have sent a verification email to your provided email address. ',
    'Please click on the link in the email to verify your email address. You will be directed to our dashboard once your email is verified. ',
    'If you have not received such email from 2hats, you can request another verification email or modify your email address. ',
]
class EmailVerificationView extends React.Component {
    state = {
        modifyDialog: false,
        resendDialog: false,
    };
    handleChangeEmail = () => {
        this.setState({
            modifyDialog: true,

        });
    }
    handleSendVerificationEmail = () => {
        this.setState({
            resendDialog: true
        });
    }
    handleClose = () => {
        this.setState({
            modifyDialog: false,
            resendDialog: false
        });
    };
    render() {
        const { classes } = this.props;
        const modifyEmailDialog = (<Dialog
            open={this.state.modifyDialog}
            TransitionComponent={Transition}
            keepMounted
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">
            <Typography variant='title' color='primary'>
                Modify email
                </Typography>
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                Please enter the correct email address below. 
              </DialogContentText>
                <TextField
                    id="email"
                    label="Email Address"
                    placeholder="Email Address"
                    className={classes.textField}
                    margin="normal"
                    color="primary"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                    Modify
              </Button>
            </DialogActions>
        </Dialog>)
        const resendVerifiactionEmailDialog = (<Dialog
            open={this.state.resendDialog}
            TransitionComponent={Transition}
            keepMounted
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">
            <Typography variant='title' color='primary'>
                Resend email
            </Typography>
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    We have just resent the verification email. Please check your inbox and follow the instruction in the email.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                    Okay
              </Button>
            </DialogActions>
        </Dialog>)
        return (
            <LogoOnCard>
                <Grid container
                    className={classes.grid}
                    direction="column"
                    justify='space-between'
                    alignItems='center'
                >
                    <Typography variant="headline" color="primary">
                        Your submission is received!
                      </Typography>

                    <img alt='congrats!' className={classes.image} src={HappyMan} />
                    {body.map((p) => <Typography variant="body">
                        {p}
                    </Typography>)}
                    <Grid container
                        direction="row"
                        className={classes.footerButtons}
                        justify='space-between'
                    >
                        <Button variant="outlined"
                            className={classes.button}
                            color="primary"
                            onClick={this.handleChangeEmail}
                        >
                            Modify email
                </Button>
                        <Button
                            className={classes.button}
                            variant="contained"
                            color="primary"
                            onClick={this.handleSendVerificationEmail}>
                            Resend Email
                </Button>
                    </Grid>
                </Grid>
                {resendVerifiactionEmailDialog}
                {modifyEmailDialog}
            </LogoOnCard>

        )
    }


}

EmailVerificationView.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(EmailVerificationView);