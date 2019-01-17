import React from 'react';
import PropTypes from 'prop-types';

import StripeCheckout from 'react-stripe-checkout';
import { STRIPE_KEY } from '../config/stripe';

import Button from '@material-ui/core/Button';
import PaymentIcon from '@material-ui/icons/PaymentRounded';

import { CLOUD_FUNCTIONS, cloudFunction } from '../utilities/CloudFunctions';

const Stripe = props => {
  const { user, description, amount } = props;

  const onToken = token => {
    console.log({ stripeToken: token, UID: user.id, amount });
    cloudFunction(
      CLOUD_FUNCTIONS.CHARGE_STRIPE_TOKEN,
      { stripeToken: token, UID: user.id, amount },
      o => console.log('Stripe charge successful', o),
      o => console.log('Stripe charge fail', o)
    );
  };

  return user ? (
    <StripeCheckout
      token={onToken}
      stripeKey={STRIPE_KEY}
      email={user.email}
      amount={amount}
      name="2hats"
      description={description || 'Course'}
      image="https://firebasestorage.googleapis.com/v0/b/production2hats.appspot.com/o/assets%2FStripe.jpg?alt=media&token=b1dc6129-6524-4ff6-b8f1-42c3ec81c519"
      currency="AUD"
      locale="en"
    >
      <Button variant="contained" color="primary">
        <PaymentIcon />
        Checkout
      </Button>
    </StripeCheckout>
  ) : null;
};

Stripe.propTypes = {
  user: PropTypes.object.isRequired,
  description: PropTypes.string,
  amount: PropTypes.number.isRequired,
};

export default Stripe;
