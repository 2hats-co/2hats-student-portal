import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import { GOOGLE_CID_STAGING, GOOGLE_CID_PRODUCTION } from '../../config/auth';
import GoogleIcon from '../../assets/images/social/google-colour.svg';
import GoogleLogin from '../../utilities/Authentication/GoogleLogin.js';
import { getTokenWithGoogle } from '../../utilities/Authentication/getTokenWith3rdParty';
import { withRouter } from 'react-router-dom';

const styles = theme => ({
  root: {
    paddingLeft: 50,
    paddingRight: 50,
    height: 500,
  },
  socialButton: {
    margin: 5,
    width: 250,
    height: 40,
    color: '#fff',
    //backgroundColor: '#0077B5',
    padding: 0,
    paddingLeft: 20,
  },
  socialIcon: {
    marginRight: 16,

    position: 'absolute',
    left: 6,
    top: 6,
  },
});
class GoogleButton extends Component {
  constructor(props) {
    super(props);
    this.handleGoogleAuthFail = this.handleGoogleAuthFail.bind(this);
    this.handleRouting = this.handleRouting.bind(this);
    this.getToken = this.getToken.bind(this);
    this.state = { cid: GOOGLE_CID_STAGING };
  }

  componentWillMount() {
    if (process.env.REACT_APP_ENV === 'PRODUCTION') {
      this.setState({ cid: GOOGLE_CID_PRODUCTION });
    } else {
      this.setState({ cid: GOOGLE_CID_STAGING });
    }
  }
  handleRouting(route) {
    this.props.changeHandler('isLoading', false);
    this.props.history.replace(route);
  }
  handleGoogleAuthFail = error => {
    console.log('google auth fail', error);
  };

  getToken(r) {
    this.props.changeHandler('isLoading', true);
    console.log(r); //See whats in the response
    let user = {};
    user.jwtToken = r.tokenId;
    getTokenWithGoogle(user, this.handleRouting);
  }
  render() {
    const { classes, action } = this.props;
    const { cid } = this.state;
    return (
      <GoogleLogin
        key={`google-button`}
        clientId={cid}
        buttonText="Login"
        onSuccess={this.getToken}
        onFailure={this.handleGoogleAuthFail}
        render={renderProps => (
          <Button
            variant="contained"
            key={`google-button`}
            id={`google-button`}
            style={{ backgroundColor: '#4285F4' }}
            onClick={renderProps.onClick}
            className={classes.socialButton}
          >
            <img
              alt={'google-logo'}
              src={GoogleIcon}
              className={classes.socialIcon}
            />
            {action || 'Sign in'} with Google
          </Button>
        )}
      />
    );
  }
}
export default withRouter(withStyles(styles)(GoogleButton));
