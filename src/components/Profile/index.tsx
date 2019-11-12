import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { makeStyles, createStyles, Container } from '@material-ui/core';

import RightButtonLayout from './RightButtonLayout';

import ProfileHeader from './ProfileHeader';
import ProfileForm from './ProfileForm';
import ProfileAssessments from './ProfileAssessments';
import ProfileCourses from './ProfileCourses';

import { useUser } from 'contexts/UserContext';
import * as ROUTES from 'constants/routes';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      '& section': { marginBottom: theme.spacing(4) },
    },
  })
);

const Profile: React.FunctionComponent = () => {
  const classes = useStyles();

  const { profile } = useUser();

  useEffect(() => {
    document.title = 'Profile – 2hats';
  }, []);

  return (
    <Container maxWidth="sm" component="main" className={classes.root}>
      <ProfileHeader profileData={profile!} />
      <ProfileForm profileData={profile!} />

      <section>
        <ProfileAssessments />
      </section>
      <section>
        <ProfileCourses />
      </section>

      <RightButtonLayout
        title="Settings & Privacy"
        buttonLabel="Manage"
        ButtonProps={{ component: Link, to: ROUTES.PROFILE_SETTINGS }}
        description="This section includes terms and conditions, including your privacy settings. You may change your password and remove your account."
        // description="This section includes terms and conditions, including your privacy settings. You may change your password, remove your account, and set communication preferences."
      />
    </Container>
  );
};

export default Profile;
