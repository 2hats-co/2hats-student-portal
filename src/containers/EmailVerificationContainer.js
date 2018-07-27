import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LogoInCard from '../components/LogoOnCard';
import OpenMail from '../assets/images/graphics/EmailVerification.png'
import { Grid, Button, Typography, Dialog, DialogContent, DialogActions, DialogTitle, DialogContentText, Slide, TextField } from '@material-ui/core';
import SectionWrapper from '../components/SectionWrapper';
import { validateEmail } from '../utilities/validators';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}
const styles = theme => ({
    grid: {
        height: 460
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
class EmailVerificationContainer extends React.Component {
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
    handleChange = name => event => {
       
      };
    render() {
        const { classes } = this.props;
        
        return (
            <LogoInCard width={560}>
                
            </LogoInCard>

        )
    }


}
EmailVerificationContainer.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(EmailVerificationContainer);