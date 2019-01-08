import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import LinkedinIcon from '../../assets/images/social/linkedin.svg';
import { LINKEDIN_CID } from '../../config/auth';
import { getTokenWith3rdParty } from '../../utilities/Authentication/getTokenWith3rdParty';
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
    backgroundColor: '#0077B5',
    padding: 0,
  },
  socialIcon: {
    marginRight: 16,
  },
});
class LinkedinButton extends Component {
  constructor(props) {
    super(props);
    this.handleLinkedInAuth = this.handleLinkedInAuth.bind(this);
    this.handleRouting = this.handleRouting.bind(this);
  }
  handleRouting(route) {
    this.props.changeHandler('isLoading', false);
    this.props.history.replace(route);
  }
  componentWillMount() {
    this.initializeLinkedin(LINKEDIN_CID);
  }
  getToken(r) {
    this.props.changeHandler('isLoading', true);
    let user = {};
    user.email = r.emailAddress;
    user.firstName = r.firstName;
    user.lastName = r.lastName;
    user.provider = { service: 'linkedin', id: r.id };
    user.bio = r.summary || '';
    user.avatarURL = '';
    getTokenWith3rdParty(user, this.handleRouting);
  }

  initializeLinkedin = clientId => {
    ((d, s, id) => {
      const element = d.getElementsByTagName(s)[0];
      const ljs = element;
      let js = element;
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = `//platform.linkedin.com/in.js`;
      js.text = `api_key: ${clientId}`;
      ljs.parentNode.insertBefore(js, ljs);
    })(document, 'script', 'linkedin-jssdk');
  };
  handleLinkedInAuth = () => {
    const fields =
      ':(id,email-address,headline,summary,first-name,last-name,picture-urls::(original))';
    window.IN.API.Raw(`/people/~${fields}`).result(async r => {
      this.getToken(r);
    });
  };
  authorize = e => {
    window.IN.User.authorize(this.handleLinkedInAuth, '');
  };
  render() {
    const { classes, action } = this.props;
    return (
      <Button
        key={`linkedin-button`}
        variant="text"
        onClick={this.authorize}
        style={{ backgroundColor: '#0077B5' }}
        className={classes.socialButton}
      >
        <img
          alt={'linkedinLogo'}
          src={LinkedinIcon}
          className={classes.socialIcon}
        />
        {action || 'sign in'} with LinkedIn
      </Button>
    );
  }
}
export default withRouter(withStyles(styles)(LinkedinButton));
