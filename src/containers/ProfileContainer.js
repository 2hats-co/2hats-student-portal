import React from 'react';
import PropTypes from 'prop-types';

import Slide from '@material-ui/core/Slide';

import withNavigation from '../components/withNavigation';
import LoadingScreen from '../components/LoadingScreen';
import ContainerHeader from '../components/ContainerHeader';

const ProfileContainer = props => {
  const { user, isMobile } = props;

  if (user)
    return (
      <Slide direction="up" in>
        <ContainerHeader
          title={`${user.firstName} ${user.lastName}`}
          subtitle="Edit your profile here"
          isMobile={isMobile}
        />
      </Slide>
    );
  else return <LoadingScreen />;
};

ProfileContainer.propTypes = {
  user: PropTypes.object,
  isMobile: PropTypes.bool.isRequired,
};

export default withNavigation(ProfileContainer);
