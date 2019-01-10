import React from 'react';
import PropTypes from 'prop-types';

import withNavigation from '../components/withNavigation';
import LoadingScreen from '../components/LoadingScreen';
import ContainerHeader from '../components/ContainerHeader';

const ProfileContainer = props => {
  const { user } = props;

  if (user)
    return (
      <ContainerHeader
        title={`${user.firstName} ${user.lastName}`}
        subtitle="Edit your profile here"
      />
    );
  else return <LoadingScreen />;
};

ProfileContainer.propTypes = {
  user: PropTypes.object,
};

export default withNavigation(ProfileContainer);
