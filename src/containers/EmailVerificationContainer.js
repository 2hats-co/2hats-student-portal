import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LogoInCard from '../components/LogoInCard';
import { Grid, Button, Typography } from '@material-ui/core';
import { PROCESS_TYPES } from '../constants/signUpProcess'

// Redux
import { compose } from 'redux';
import { connect } from 'react-redux';

// Routing
import {withRouter} from 'react-router-dom'
import * as routes from '../constants/routes'
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

    handleSigninClick = () => {
        this.props.history.replace(routes.SIGN_IN);
    }

    handleContinueClick = () => {
        const { authUser, profiles } = this.props;
        let route;

        if(profiles[authUser.uid].process === PROCESS_TYPES.upload){
            route = routes.UPLOAD_RESUME;
        } else {
            route = routes.BUILD_RESUME;
        }
        this.props.history.replace(route);
    }

    handleProfileClick = () => {
        this.props.history.replace(routes.PROFILE);
    }

    handleDashboardClick = () => {
        this.props.history.replace(routes.DASHBOARD);
    }
    
    render() {
        const { classes, authUser, profiles } = this.props;
        let button;

        if(!authUser) {
            button = <Button variant="flat" color="primary" onClick={this.handleSigninClick}>Sign in</Button>;
        } else if(authUser.uid && profiles && profiles[authUser.uid]) {
            const user = profiles[authUser.uid];
            const { isComplete, hasSubmit } = user;

            if(!isComplete) {
                button = <Button variant="flat" color="primary" onClick={this.handleContinueClick}>Continue</Button>;
            } else if(!hasSubmit) {
                button = <Button variant="flat" color="primary" onClick={this.handleProfileClick}>Go to profile</Button>;
            } else {
                button = <Button variant="flat" color="primary" onClick={this.handleDashboardClick}>Go to dashboard</Button>;
            }
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
                            {button}
                        </Grid>
                    </Grid>
                </div>
            </LogoInCard>
        )
    }
}

EmailVerificationContainer.propTypes = {
    classes: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    authUser: PropTypes.object.isRequired,
    profiles: PropTypes.object.isRequired,
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