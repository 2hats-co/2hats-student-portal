import React, { Component, useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import LinkedinIcon from '../../assets/images/social/linkedin.svg';
import { LINKEDIN_CID } from '../../config/auth';
import { getTokenWithLinkedIn } from '../../utilities/Authentication/getTokenWith3rdParty';
import { withRouter } from 'react-router-dom';
import { LinkedIn } from 'react-linkedin-login-oauth2';

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
    backgroundColor: '#fff',
    padding: 0,
  },
  socialIcon: {
    marginRight: 16,
  },
  linkedin: {
    backgroundColor: '#fffffe',
    borderColor: '#fffffe',
  },
});
function LinkedinButton(props) {
  const [linkedinState] = useState('linkedinState214235');
  const handleSuccess = data => {
    getTokenWithLinkedIn({ ...data, state: linkedinState }, o => {
      console.log(o);
    });
  };

  const handleFailure = error => {
    console.log(error);
  };

  const { classes, action } = props;
  return (
    <LinkedIn
      className={classes.linkedin}
      clientId={LINKEDIN_CID}
      onFailure={handleFailure}
      onSuccess={handleSuccess}
      redirectUri="http://localhost:3333/linkedin"
      state="linkedinState214235"
    >
      <Button
        key={`linkedin-button`}
        id={`linkedin-button`}
        variant="contained"
        style={{
          backgroundColor: '#0077B5',
        }}
        className={classes.socialButton}
      >
        <img
          alt={'linkedinLogo'}
          src={LinkedinIcon}
          className={classes.socialIcon}
        />
        {action || 'sign in'} with LinkedIn
      </Button>
    </LinkedIn>
  );
}
export default withRouter(withStyles(styles)(LinkedinButton));
