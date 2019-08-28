import React, { useEffect, useState } from 'react';

import { makeStyles, createStyles, Container } from '@material-ui/core';
import { fade } from '@material-ui/core/styles';

import RightButtonLayout from 'components/Profile/RightButtonLayout';
import ChangePasswordDialog from 'components/Profile/ChangePasswordDialog';

import { useUser } from 'contexts/UserContext';
import { cloudFn, CLOUD_FUNCTIONS } from 'utilities/CloudFunctions';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      '& section': { marginBottom: theme.spacing(4) },
    },

    deleteButton: {
      color: theme.palette.error.dark,
      '&:hover': { backgroundColor: fade(theme.palette.error.dark, 0.1) },
    },
  })
);

const ProfileSettingsContainer: React.FunctionComponent = () => {
  const classes = useStyles();
  const { user } = useUser();

  useEffect(() => {
    document.title = 'Settings – 2hats';
  }, []);

  const [openDialog, setOpenDialog] = useState<boolean | string>(false);
  const handleCloseDialog = () => setOpenDialog(false);
  const [loading, setLoading] = useState(false);

  const handleChangePassword = () => {
    setLoading(true);
    setOpenDialog(true);

    cloudFn(CLOUD_FUNCTIONS.RESET_PASSWORD, { email: user.email.toLowerCase() })
      .then(result => {
        setLoading(false);
        console.log('Sent user reset password email', result);
      })
      .catch(error => {
        setLoading(false);
        setOpenDialog(error.message);
        console.error('Failed to send user reset password email', error);
      });
  };

  return (
    <Container maxWidth="sm" component="main" className={classes.root}>
      <section>
        <RightButtonLayout
          title="Terms & Conditions"
          buttonLabel="Read More"
          ButtonProps={{
            component: 'a',
            href: 'https://2hats.com.au/terms',
            target: '_blank',
            referrer: 'noopener noreferrer',
          }}
          description="The terms & conditions provide a guideline to clarify the obligations and responsibilities between 2hats and you. By signing up, you have agreed to these terms."
        />
      </section>

      <section>
        <RightButtonLayout
          title="Privacy Policy"
          buttonLabel="Read More"
          ButtonProps={{
            component: 'a',
            href: 'https://2hats.com.au/privacy',
            target: '_blank',
            referrer: 'noopener noreferrer',
          }}
          description="The privacy policy provides a guideline to clarify how we gather, use, disclose, and manage your data. By signing up, you have agreed to this policy."
        />
      </section>

      <section>
        <RightButtonLayout
          title="Your Password"
          buttonLabel="Change Password"
          ButtonProps={{
            onClick: handleChangePassword,
          }}
          description="You can change the password you use when signing in with email."
        />

        <ChangePasswordDialog
          open={!!openDialog}
          handleClose={handleCloseDialog}
          loading={loading}
          errorMessage={typeof openDialog === 'string' ? openDialog : ''}
        />
      </section>

      <section>
        <RightButtonLayout
          title="Delete Your Account"
          buttonLabel="Delete Account"
          ButtonProps={{
            component: 'a',
            href: `mailto:info@2hats.com.au?subject=Account%20deletion%20request&body=I%20request%20to%20delete%20my%20account%20from%20the%202hats%20database.%0A%0AUID%3A%20${
              user.id
            }%0AEmail%3A%20${user.email}`,
            target: '_blank',
            referrer: 'noopener noreferrer',
            color: 'default',
            classes: { root: classes.deleteButton },
          }}
          description="You may choose to delete your account. However, it is impossible to revert this decision. This removes your assessments, progress, and personal information from our database. You will no longer be shortlisted by possible employers by making this decision."
        />
      </section>
    </Container>
  );
};

export default ProfileSettingsContainer;
