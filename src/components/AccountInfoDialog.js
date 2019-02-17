import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Form from './Form';

import accountInfoFields from '../constants/forms/accountInfo';
import { COLLECTIONS } from '@bit/sidney2hats.2hats.global.common-constants';
import useDocument from '../hooks/useDocument';
import { updateDoc } from '../utilities/firestore';
import isEmpty from 'ramda/es/isEmpty';

const AccountInfoDialog = props => {
  const { setShowDialog, user } = props;

  const [profileState] = useDocument({
    path: `${COLLECTIONS.profiles}/${user.id}`,
  });
  const profile = profileState.doc;

  const [open, setOpen] = useState(true);

  const closeHandler = () => {
    setOpen(false);
    setTimeout(() => {
      setShowDialog(false);
    }, 400);
  };

  if (!profile || isEmpty(profile)) return null;

  return (
    <Form
      action="update"
      actions={{
        update: data => {
          const sanitisedData = {
            ...data,
            firstName: data.firstName.trim(),
            lastName: data.lastName.trim(),
            currentDegree: data.currentDegree.trim(),
          };

          updateDoc(COLLECTIONS.profiles, user.id, sanitisedData);
          if (
            data.firstName !== user.firstName ||
            data.lastName !== user.lastName
          )
            updateDoc(COLLECTIONS.users, user.id, {
              firstName: data.firstName.trim(),
              lastName: data.lastName.trim(),
            });
          closeHandler();
        },
        close: closeHandler,
      }}
      open={open}
      data={accountInfoFields(profile)}
      formTitle="Account Information"
    />
  );
};

AccountInfoDialog.propTypes = {
  setShowDialog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default AccountInfoDialog;
