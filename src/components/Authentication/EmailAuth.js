import React, { Component } from 'react';

import Email from '../InputFields/Email';
import { checkEmail } from '../../utilities/Authentication/emailCheck';
import Button from '@material-ui/core/Button';
import { validateEmail } from '../../utilities/validators';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Validator from 'mailgun-validate';
import { AUTHENTICATION_CONTAINER } from '../../constants/views';

/* eslint-disable jsx-a11y/anchor-is-valid */

const styles = theme => ({
  button: {
    width: 120,
  },
  grid: {
    height: 150,
    paddingBottom: 10,
  },
  text: {
    marginTop: -15,
    width: '100%',
  },
  link: {
    color: theme.palette.primary.light,
    cursor: 'pointer',
    textDecoration: 'none',
    marginRight: 10,
    fontWeight: 'bold',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});
var validator = new Validator('pubkey-39aac6f76384240d4c4b3a2b1afeaf02');
class EmailAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email:
        this.props.urlParams.indexOf('email=') > -1
          ? decodeURI(this.props.urlParams.substr(7)).replace('%40', '@')
          : '',
      invalidEmail: false,
    };
    this.onNext = this.onNext.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEmailCheck = this.handleEmailCheck.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
    this.handleValidEmail = this.handleValidEmail.bind(this);
    this.handleInvalidEmail = this.handleInvalidEmail.bind(this);
    this.handleEmailSuggestion = this.handleEmailSuggestion.bind(this);
  }
  handleInvalidEmail() {
    this.props.changeHandler('isLoading', false);
    this.props.changeHandler('snackBar', {
      message: 'It looks like you entered your email address incorrectly.',
      variant: 'warning',
    });
  }
  handleValidEmail(hasSuggestion) {
    this.props.changeHandler('isLoading', false);
    this.props.changeHandler('email', this.state.email);
    this.setState({ invalidEmail: false });
    if (!hasSuggestion) {
      this.props.changeHandler('view', 'signup');
    }
  }
  handleEmailSuggestion(emailSuggestion) {
    this.setState({ emailSuggestion });
  }
  handleValidation(email) {
    const _validEmail = this.handleValidEmail;
    const _invalidEmail = this.handleInvalidEmail;
    const _emailSuggestion = this.handleEmailSuggestion;
    validator.validate(email, function(err, response) {
      if (err) {
        _validEmail(false);
        console.log(err);
        return;
      }
      if (response.is_valid) {
        console.log('valid', response);
        _validEmail(response.did_you_mean);
        // Email valid
        if (response.did_you_mean) {
          _emailSuggestion(response.did_you_mean);
          // Did your mean response.did_you_mean?
        }
      } else {
        console.log(response);
        _invalidEmail();
        // Email invalid
        if (response.did_you_mean) {
          _emailSuggestion(response.did_you_mean);
          // Did your mean response.did_you_mean?
        }
      }
    });
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  handleEmailCheck(email) {
    if (validateEmail(email)) {
      this.props.changeHandler('isLoading', true);

      checkEmail(
        email,
        result => {
          const { firstName, provider, noPassword } = result.data;
          this.props.changeHandler('isLoading', false);
          this.props.changeHandler('email', email);
          this.props.changeHandler('firstName', firstName);

          if (noPassword) {
            this.props.changeHandler(
              'view',
              AUTHENTICATION_CONTAINER.noPassword
            );
          } else {
            this.props.changeHandler('view', provider);
          }
          this.props.changeHandler('snackBar', null);
        },
        error => {
          // user doesn't exist
          this.handleValidation(email);
        }
      );
    } else {
      this.props.changeHandler('snackBar', {
        message: 'invalid email format',
        variant: 'error',
      });
    }
  }
  onNext() {
    this.props.changeHandler('snackBar', null);
    this.setState({ emailSuggestion: null });
    this.handleEmailCheck(this.state.email);
  }
  render() {
    const { email, emailSuggestion, invalidEmail } = this.state;
    const { classes } = this.props;
    return (
      <Grid
        className={classes.grid}
        container
        direction="column"
        alignItems="center"
        justify="space-between"
      >
        <div style={{ width: '100%', marginTop: emailSuggestion ? -5 : 15 }}>
          <Email
            key="emailField"
            primaryAction={this.onNext}
            value={email}
            changeHandler={this.handleChange}
          />
        </div>
        {emailSuggestion && (
          <Typography variant="body2" className={classes.text}>
            Did you mean:
            <br />
            <a
              className={classes.link}
              onClick={() => {
                this.setState({ email: emailSuggestion });
                this.handleEmailCheck(emailSuggestion);
              }}
            >
              {emailSuggestion}
            </a>
            {!invalidEmail && (
              <a
                className={classes.link}
                style={{ color: '#000' }}
                onClick={() => {
                  this.handleValidEmail(false);
                }}
              >
                Ignore
              </a>
            )}
          </Typography>
        )}
        <Button
          key="check-button"
          id="check-button"
          variant="text"
          disabled={!validateEmail(email)}
          onClick={this.onNext}
          className={classes.button}
        >
          Next
        </Button>
      </Grid>
    );
  }
}
export default withStyles(styles)(EmailAuth);
