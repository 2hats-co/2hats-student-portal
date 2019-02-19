import React from 'react';
import Typography from '@material-ui/core/Typography';
import { CLOUD_FUNCTIONS, cloudFunction } from '../../utilities/CloudFunctions';

import BackBar from './BackBar';
import Header from './Header';
import { Link } from '@material-ui/core';

class NoPasswordView extends React.Component {
  constructor() {
    super();
    this.resendEmail = this.resendEmail.bind(this);
  }
  resendEmail() {
    const { email, changeHandler } = this.props;
    const request = { email: email.toLowerCase() };
    cloudFunction(
      CLOUD_FUNCTIONS.CREATE_PASSWORD,
      request,
      changeHandler('snackBar', {
        variant: 'success',
        message: 'You should receive the email shortly',
      }),
      e => {
        changeHandler('snackBar', {
          variant: 'error',
          message: 'An error has occured. Please try again in a moment',
        });
        console.log(e);
      }
    );
  }
  render() {
    const { isLoading, email, backHandler, firstName } = this.props;

    return (
      <React.Fragment>
        <BackBar
          isLoading={isLoading}
          email={email}
          backHandler={backHandler}
        />
        <Header greeting="Welcome back" name={firstName} />
        <Typography variant="body2">
          We’ve sent you a confirmation email, please check your mailbox.
        </Typography>

        <Typography variant="body2" style={{ marginTop: 8 }}>
          Didn’t receive the email? You can request a resend&nbsp;
          <Link
            variant="body2"
            component="button"
            onClick={this.resendEmail}
            style={{
              textDecoration: 'underline',
              verticalAlign: 'baseline',
            }}
          >
            here
          </Link>
          . Don’t forget to check your junk or spam folder.
        </Typography>
      </React.Fragment>
    );
  }
}

export default NoPasswordView;
