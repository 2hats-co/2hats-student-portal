import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import LoadingScreen from 'components/LoadingScreen';
import OnboardingCard from 'components/Onboarding/OnboardingCard';

import OnboardingA1 from 'components/Onboarding/OnboardingA1';
import OnboardingB1 from 'components/Onboarding/OnboardingB1';
import OnboardingB2 from 'components/Onboarding/OnboardingB2';

import UserContext from 'contexts/UserContext';
import * as ROUTES from 'constants/routes';
import { ONBOARDING_STAGES } from 'utilities/onboarding';

const OnboardingContainer = ({ match }) => {
  const { user } = useContext(UserContext);
  // We can't guarantee user doc has been downloaded yet
  // This will guarantee the user doc exists for all onboarding stages
  if (!user) return <LoadingScreen />;

  // If we just get /welcome, redirect to user’s last onboarding stage
  // or the first stage
  if (!match.params || !match.params.stage) {
    const stage = user.onboardingStage || ONBOARDING_STAGES[0];
    return <Redirect to={ROUTES.ONBOARDING + '/' + stage} />;
  }

  const OnboardingCardProps = {
    children: null,
    progressValue: 0,
    fullScreen: false,
  };
  switch (match.params.stage) {
    case 'A1':
      OnboardingCardProps.children = <OnboardingA1 />;
      OnboardingCardProps.progressValue = 25;
      break;

    case 'A2':
      OnboardingCardProps.children = 'A2';
      OnboardingCardProps.progressValue = 50;
      break;

    case 'B1':
      OnboardingCardProps.children = <OnboardingB1 />;
      OnboardingCardProps.progressValue = 75;
      OnboardingCardProps.fullScreen = true;
      break;

    case 'B2':
      OnboardingCardProps.children = <OnboardingB2 />;
      OnboardingCardProps.progressValue = 100;
      OnboardingCardProps.fullScreen = true;
      break;

    default:
      break;
  }

  return <OnboardingCard {...OnboardingCardProps} />;
};

OnboardingContainer.propTypes = {
  /** From React Router. Uses /:stage to show specific onboarding stage */
  match: PropTypes.object.isRequired,
};

export default OnboardingContainer;
