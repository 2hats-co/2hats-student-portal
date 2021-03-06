import React, { Component } from 'react';
import queryString from 'query-string';
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

    ...theme.typography.body1,
    fontWeight: 500,
    textTransform: 'none',
  },
  socialIcon: {
    marginRight: 16,

    position: 'absolute',
    left: 4,
    top: 4,

    width: 32,
    height: 32,
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
    if (this.props.goTo) this.props.goTo();
  }
  handleGoogleAuthFail = error => {
    console.log('google auth fail', error);
  };

  getHomeReferrerId() {
    const parsedQuery = queryString.parse(this.props.location.search);
    if (parsedQuery.referrer) return parsedQuery.referrer;

    if (parsedQuery.route) {
      const parsedRedirectQuery = queryString.parse(
        parsedQuery.route.split('?')[1]
      );
      if (parsedRedirectQuery.referrer) return parsedRedirectQuery.referrer;
    }

    return '';
  }

  getToken(r) {
    this.props.changeHandler('isLoading', true);
    console.log(r); //See whats in the response
    let user = {};
    user.jwtToken = r.tokenId;
    user.homeReferrerId = this.getHomeReferrerId();
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
