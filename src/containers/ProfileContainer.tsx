import React, { useEffect } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';

import {
  makeStyles,
  createStyles,
  Container,
  Typography,
} from '@material-ui/core';

import LoadingScreen from 'components/LoadingScreen';
import HeadingTitle from '@bit/twohats.common.components.heading-title';
import HeadingCaps from '@bit/twohats.common.components.heading-caps';
import RightButtonLayout from 'components/Profile/RightButtonLayout';

import ProfileHeader from 'components/Profile/ProfileHeader';
import ProfileForm from 'components/Profile/ProfileForm';
import PrioritisedIndustries from 'components/Profile/PrioritisedIndustries';
import ProfileAssessments from 'components/Profile/ProfileAssessments';
import ProfileCourses from 'components/Profile/ProfileCourses';

import { useUser } from 'contexts/UserContext';
import { DocWithId, ProfilesDoc } from '@bit/twohats.common.db-types';
import * as ROUTES from 'constants/routes';
import useScrollIntoView from 'hooks/useScrollIntoView';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      '& section': { marginBottom: theme.spacing(4) },
    },
  })
);

export interface ProfileComponentProps {
  profileData: DocWithId<ProfilesDoc>;
}

const ProfileContainer: React.FunctionComponent<RouteComponentProps> = ({
  location,
}) => {
  const classes = useStyles();

  const { profile } = useUser();

  useEffect(() => {
    document.title = 'Profile – 2hats';
  }, []);

  useScrollIntoView(ROUTES.PROFILE_PREFERRED_INDUSTRIES, location);
  useScrollIntoView(ROUTES.PROFILE_CURIOUS_THING, location);

  return (
    <Container maxWidth="sm" component="main" className={classes.root}>
      <ProfileHeader profileData={profile} />
      <ProfileForm profileData={profile} />

      <section>
        <HeadingTitle id={ROUTES.PROFILE_PREFERRED_INDUSTRIES}>
          My Application Profile
        </HeadingTitle>

        <section>
          <HeadingCaps>Areas of Interest</HeadingCaps>
          <Typography variant="body1" color="textSecondary" gutterBottom>
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

export default ProfileContainer;
