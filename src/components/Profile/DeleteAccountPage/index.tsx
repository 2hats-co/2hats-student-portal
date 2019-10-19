import React, { useEffect } from 'react';

import { makeStyles, createStyles, Container } from '@material-ui/core';
import { fade } from '@material-ui/core/styles';

import RightButtonLayout from '../RightButtonLayout';

import { useUser } from 'contexts/UserContext';
import { requestUserDelete } from 'utilities/profile';

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

const SettingsPage: React.FunctionComponent = () => {
  const classes = useStyles();
  const { UID } = useUser();

  useEffect(() => {
    document.title = 'Delete Your Account – 2hats';
  }, []);

  return (
    <Container maxWidth="sm" component="main" className={classes.root}>
      <section>
        <RightButtonLayout
          title="Delete Your Account"
          buttonLabel="Confirm"
          ButtonProps={{
            color: 'default',
            classes: { root: classes.deleteButton },
            onClick: () => {
              requestUserDelete(UID!);
            },
          }}
          description={
            <>
              You may choose to delete your account. However, it is impossible
              to revert this decision. We will remove your personal information,
              résumé, and portfolio information from our database. We will also
              anonymise your assessment submissions and progress. You will no
              longer be shortlisted by possible employers or receive emails from
              us.
              <br />
              <br />
              After you confirm with us that you want to delete your account,
              there will be a 2-week grace period in which you can cancel this
              request.
            </>
          }
        />
      </section>
    </Container>
  );
};

export default SettingsPage;
