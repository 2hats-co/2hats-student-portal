import mergeDeepRight from 'ramda/es/mergeDeepRight';
import { Options as ReactLottieOptions } from 'react-lottie';

import { DASHBOARD, ONBOARDING } from 'constants/routes';

export const ONBOARDING_STAGES = ['A1', 'A2', 'B1', 'B2'];

export const getOnboardingStageIndex = (stage: string) =>
  ONBOARDING_STAGES.indexOf(stage);

export const getNextStageRoute = (stage: string) => {
  const currentIndex = getOnboardingStageIndex(stage);
  if (currentIndex >= ONBOARDING_STAGES.length - 1) return DASHBOARD;
  return ONBOARDING + '/' + ONBOARDING_STAGES[currentIndex + 1];
};

export const getLottieOptions = (overrides: ReactLottieOptions) =>
  mergeDeepRight(
    {
      loop: true,
      autoplay: true,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid meet',
      },
    },
    overrides
  );

export const hasFinishedOnboarding = (stage: string) =>
  getOnboardingStageIndex(stage) >= ONBOARDING_STAGES.length - 1;
