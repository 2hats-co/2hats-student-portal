import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LogoInCard from '../components/LogoInCard';
import { Grid, Button, Typography, Dialog, DialogContent, DialogActions, DialogTitle, DialogContentText, Slide, TextField } from '@material-ui/core';
import SectionWrapper from '../components/SectionWrapper';
import { validateEmail } from '../utilities/validators';
import { isLoaded, isEmpty } from 'react-redux-firebase';

// Redux
import { compose } from 'redux';
import { withHandlers, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import  {withFirestore} from '../utilities/withFirestore';

// Routing
import {withRouter} from 'react-router-dom'
import { COLLECTIONS, LISTENER } from "../constants/firestore";

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
    static contextTypes = {
        store: PropTypes.object.isRequired
    }

    componentWillMount() {
        this.verifyUser();      
    }

    componentDidUpdate(prevProps) {
        if (this.props.authUser !== prevProps.authUser) {
            const { authUser } = this.props;

            if(authUser) {
                const { firestore } = this.context.store;
                const profileListenerSettings = LISTENER(COLLECTIONS.profiles, authUser.uid);
                firestore.setListener(profileListenerSettings);
            }
        }
    }

    componentWillUnmount() {
        const { authUser } = this.props;

        if(authUser) {
            const { firestore } = this.context.store;
            const profileListenerSettings = LISTENER(COLLECTIONS.profiles, authUser.uid);
            firestore.unsetListener(profileListenerSettings);
        }
    }

    verifyUser = () => {
        const { firestore } = this.context.store;
        const queryStr = this.props.history.location.search;

        if(queryStr) {
            const evKeyName = "?evKey=";
            
            if(queryStr.indexOf(evKeyName)!== -1) {
                const evKeyVal = queryStr.slice(evKeyName.length, queryStr.length);

                if(evKeyVal !== "") {
                    firestore.update({ collection: COLLECTIONS.emailVerifications, doc: evKeyVal }, {
                        emailVerified: true,
                        updatedAt: firestore.FieldValue.serverTimestamp()
                    });
                }
            }
        }
    }
    
    render() {
        const { classes, profiles } = this.props;

        if(!isLoaded(profiles) || isEmpty(profiles)) {
            return (null);
        }
     
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
                            <Typography variant="body1">
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

function mapStateToProps(state){
    return {
        authUser: state.sessionState.authUser,
        profiles: state.firestore.data.profiles
    }
}

const enhance = compose(
    withStyles(styles),
    connect(mapStateToProps),
)

export default enhance(withRouter(EmailVerificationContainer))