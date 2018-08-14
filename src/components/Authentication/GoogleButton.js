import React,{Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {GOOGLE_CID} from '../../config/auth';
import GoogleIcon from '../../assets/images/social/google.svg';
import GoogleLogin from '../../utilities/Authentication/GoogleLogin.js';
import {getTokenWith3rdParty} from '../../utilities/Authentication/getTokenWith3rdParty'
import { withRouter } from "react-router-dom";

const styles = theme => ({
    root: {
      paddingLeft: 50,
      paddingRight: 50,
      height: 500
    },
    socialButton: {
      margin: 5,
      width: 250,
      height: 40,
      color: '#fff',
      backgroundColor: '#0077B5' 
    },
    socialIcon: {
      marginRight: 17
    },
  });
class GoogleButton extends Component{
    constructor(props){
        super(props)
        this.handleGoogleAuthFail = this.handleGoogleAuthFail.bind(this);
        this.handleRouting = this.handleRouting.bind(this)
        this.getToken = this.getToken.bind(this)
    }
    componentWillMount(){
       
    }
    handleRouting(route){
      this.props.history.replace(route)
    }
    handleGoogleAuthFail = (error) => {
        console.log('google auth fail', error)
    }
 
    getToken(r){
      let user={};
      user.email = r.profileObj.email
      user.firstName = r.profileObj.givenName
      user.lastName = r.profileObj.familyName
      user.provider = {service:'google',id:r.profileObj.googleId}
      user.avatarURL = r.profileObj.photo ||''
      getTokenWith3rdParty(user,this.handleRouting)
    }
    render(){
        const {classes,action} = this.props
        return(
            <GoogleLogin
          key={`google-button`}
          clientId={GOOGLE_CID}
          buttonText="Login"
          onSuccess={this.getToken}
          onFailure={this.handleGoogleAuthFail}
          render={renderProps => (
            <Button variant='flat'
              key={`google-button`}
              style={{ backgroundColor: '#E05449' }}
              onClick={renderProps.onClick}
              className={classes.socialButton}>
              <div className={classes.socialIcon} >
                <img alt={'google-logo'} src={GoogleIcon} />
              </div> {action} with google
            </Button>
          )}
        />
        )
    }

}
export default withRouter(withStyles(styles)(GoogleButton))