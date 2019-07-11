import React, { useContext, useEffect } from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';

import LoadingScreen from 'components/LoadingScreen';
import OnboardingCard, {
  OnboardingCardProps,
} from 'components/Onboarding/OnboardingCard';

import OnboardingA1 from 'components/Onboarding/OnboardingA1';
import OnboardingA2 from 'components/Onboarding/OnboardingA2';
import OnboardingB1 from 'components/Onboarding/OnboardingB1';
import OnboardingB2 from 'components/Onboarding/OnboardingB2';

import UserContext from 'contexts/UserContext';
import * as ROUTES from 'constants/routes';
import { ONBOARDING_STAGES } from 'utilities/onboarding';
import { updateDoc } from 'utilities/firestore';
import { COLLECTIONS } from '@bit/twohats.common.constants';

export interface OnboardingCtaProps
  extends RouteComponentProps<{ stage?: string }> {}

const OnboardingContainer: React.FC<OnboardingCtaProps> = ({ match }) => {
  // Scroll to top and change title
  useEffect(() => {
    document.title = 'Welcome – 2hats';
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [match.params]);

  const { user } = useContext(UserContext);

  // Update the user doc’s onboardingStage
  useEffect(() => {
    if (
      user &&
      match.params.stage &&
      user.onboardingStage !== match.params.stage
    )
      updateDoc(COLLECTIONS.users, user.id, {
        onboardingStage: match.params.stage,
      });
  }, [user, match.params]);

  // We can't guarantee user doc has been downloaded yet
  // This will guarantee the user doc exists for all onboarding stages
  if (!user) return <LoadingScreen />;

  // If we just get /welcome, redirect to user’s last onboarding stage
  // or the first stage
  if (!match.params || !match.params.stage) {
    let stage = user.onboardingStage || ONBOARDING_STAGES[0];
    if (stage === ONBOARDING_STAGES[ONBOARDING_STAGES.length - 1])
      stage = ONBOARDING_STAGES[0];
    return <Redirect to={ROUTES.ONBOARDING + '/' + stage} />;
  }

  const passedProps: OnboardingCardProps = {
    children: null,
    progressValue: 0,
    fullScreen: false,
  };
  switch (match.params.stage) {
    case 'A1':
      passedProps.children = <OnboardingA1 />;
      passedProps.progressValue = 25;
      break;

    case 'A2':
      passedProps.children = <OnboardingA2 />;
      passedProps.progressValue = 50;
      break;

    case 'B1':
      passedProps.children = <OnboardingB1 />;
      passedProps.progressValue = 75;
      passedProps.fullScreen = true;
      break;

    case 'B2':
      passedProps.children = <OnboardingB2 />;
      passedProps.progressValue = 100;
      passedProps.fullScreen = true;
      break;

    default:
      break;
  }

  return <OnboardingCard {...passedProps} />;
};

export default OnboardingContainer;
