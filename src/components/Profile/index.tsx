import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ScrollableAnchor from 'react-scrollable-anchor';

import {
  makeStyles,
  createStyles,
  Container,
  Typography,
} from '@material-ui/core';

import HeadingTitle from '@bit/twohats.common.components.heading-title';
import HeadingCaps from '@bit/twohats.common.components.heading-caps';
import RightButtonLayout from './RightButtonLayout';

import ProfileHeader from './ProfileHeader';
import ProfileForm from './ProfileForm';
import PrioritisedIndustries from './PrioritisedIndustries';
import ProfileAssessments from './ProfileAssessments';
import ProfileCourses from './ProfileCourses';

import { useUser } from 'contexts/UserContext';
import { DocWithId, ProfilesDoc } from '@bit/twohats.common.db-types';
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
        <ScrollableAnchor id={ROUTES.PROFILE_PREFERRED_INDUSTRIES}>
          <span>
            <HeadingTitle>My Application Profile</HeadingTitle>
          </span>
        </ScrollableAnchor>

        <section>
          <HeadingCaps>Areas of Interest</HeadingCaps>
          <Typography variant="body1" color="textSecondary" paragraph>
            Which of these sound like your future workplace? Pick at least one
            of the fields to view the jobs and tasks that relate to you!
          </Typography>
          <PrioritisedIndustries />
        </section>

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
      </section>
    </Container>
  );
};

export default Profile;
