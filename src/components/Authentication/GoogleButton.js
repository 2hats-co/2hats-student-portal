import React,{Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {GOOGLE_CID} from '../../config/auth';
import GoogleIcon from '../../assets/images/social/google.svg';
import GoogleLogin from '../../utilities/Authentication/GoogleLogin.js';
import {checkEmail} from '../../utilities/Authentication/emailCheck'
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
        this.handleGoogleAuth = this.handleGoogleAuth.bind(this);
    }
    componentWillMount(){
        //this.initializeLinkedin(LINKEDIN_CID);
    }
    handleGoogleAuthFail = (error) => {
        console.log('google auth fail', error)
      }
    handleGoogleAuth = (response) => {
        console.log('google response -->', response);
        let data = {
          googleId: response.googleId,
          googleEmail: response.profileObj.email,
          familyName: response.profileObj.familyName,
          givenName: response.profileObj.givenName,
          photo: response.profileObj.imageUrl,
        };
        checkEmail(data.googleEmail,(res)=>{console.log(res)})

    }
    render(){
        const {classes} = this.props
        return(
            <GoogleLogin
          key={`google-button`}
          clientId={GOOGLE_CID}
          buttonText="Login"
          onSuccess={this.handleGoogleAuth}
          onFailure={this.handleGoogleAuthFail}
          render={renderProps => (
            <Button variant='flat'
              key={`google-button`}
              style={{ backgroundColor: '#E05449' }}
              //onClick={renderProps.onClick}
              className={classes.socialButton}>
              <div className={classes.socialIcon} >
                <img alt={'google-logo'} src={GoogleIcon} />
              </div> Authenticate with google
            </Button>
          )}
        />
        )
    }

}
export default withStyles(styles)(GoogleButton)