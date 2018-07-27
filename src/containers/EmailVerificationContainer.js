import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LogoInCard from '../components/LogoOnCard';
import OpenMail from '../assets/images/graphics/EmailVerification.png'
import { Grid, Button, Typography, Dialog, DialogContent, DialogActions, DialogTitle, DialogContentText, Slide, TextField } from '@material-ui/core';
import SectionWrapper from '../components/SectionWrapper';
import { validateEmail } from '../utilities/validators';

// Redux
import { compose } from 'redux';
import { withHandlers } from 'recompose'
import { connect } from 'react-redux';
import  {withFirestore} from '../utilities/withFirestore';

// Routing
import {withRouter} from 'react-router-dom'
import { COLLECTIONS } from "../constants/firestore";

const styles = theme => ({
    root: {
        flexGrow: 1,
        'padding-top': '0px',
        'padding-right': '40px',
        'padding-bottom': '40px',
        'padding-left': '40px'
    },
    button: {
        'text-align': 'center'
    }
});

class EmailVerificationContainer extends React.Component {
    componentWillMount() {
        if(this.props.history.location.search) {
            const url = this.props.history.location.search;
            const evKeyName = "?evKey=";
            
            if(url.indexOf(evKeyName)!== -1) {
                const evKeyVal = url.slice(evKeyName.length, url.length);
                if(evKeyVal !== "") {
                    this.props.onEmailVerificationsUpdate(evKeyVal);
                }
            }
        }
    }
    
    render() {
        const { classes } = this.props;
     
        return (
            <LogoInCard height={350}>
                <div className={classes.root}>
                    <Grid container spacing={24}>
                        <Grid item xs={12}>
                            <Typography variant="title" color="primary">
                                Account Validated
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="Body 1">
                                Your 2hats account has been validated. You can jump back to your application process now.
                            </Typography>
                        </Grid>
                        <Grid item xs={12}  className={classes.button} >
                            <Button
                                variant="flat"
                                color="primary"
                            >
                                Continue My Application
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </LogoInCard>
        )
    }
}

EmailVerificationContainer.propTypes = {
    classes: PropTypes.object.isRequired,
};

const enhance = compose(
    // add redux store (from react context) as a prop
    withFirestore,
    // Handler functions as props
    withHandlers({
        onEmailVerificationsUpdate: props => (evKey) =>
            props.firestore.update({ collection: COLLECTIONS.emailVerifications, doc: evKey }, {
                emailVerified: true,
                updatedAt: props.firestore.FieldValue.serverTimestamp()
            }
        )
    })
)
  
export default enhance(
    withRouter(withStyles(styles)(EmailVerificationContainer))
)