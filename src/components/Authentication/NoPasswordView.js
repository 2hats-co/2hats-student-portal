import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { CLOUD_FUNCTIONS, cloudFunction } from '../../utilities/CloudFunctions';

import GoIcon from '@material-ui/icons/ArrowForward';

import BackBar from './BackBar';
import Header from './Header';

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

        <div>
          <Typography variant="body2" gutterBottom>
            We’ve sent you a confirmation email. Please check your inbox.
          </Typography>
          <Typography variant="body2">
            Don’t forget to check your spam or junk folder.
          </Typography>
        </div>

        <Divider style={{ width: '100%', margin: '16px 0' }} />
        <Typography variant="body2" gutterBottom color="textSecondary">
          Didn’t receive the email?
        </Typography>

        <Button variant="outlined" color="primary" onClick={this.resendEmail}>
          Resend Email
          <GoIcon />
        </Button>
      </React.Fragment>
    );
  }
}

export default NoPasswordView;
