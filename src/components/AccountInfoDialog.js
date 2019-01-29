import React from 'react';
import PropTypes from 'prop-types';

import Form from './Form';

import accountInfoFields from '../constants/forms/accountInfo';
import { COLLECTIONS } from '@bit/sidney2hats.2hats.global.common-constants';
import { updateDoc } from '../utilities/firestore';

const AccountInfoDialog = props => {
  const { open, closeHandler, user } = props;

  return (
    <Form
      action="update"
      actions={{
        update: data => {
          updateDoc(COLLECTIONS.users, user.id, data);
          closeHandler();
        },
        close: () => {
          closeHandler();
        },
      }}
      open={open}
      data={accountInfoFields(user)}
      formTitle="Account Information"
    />
  );
};

AccountInfoDialog.propTypes = {
  open: PropTypes.bool,
  closeHandler: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default AccountInfoDialog;
