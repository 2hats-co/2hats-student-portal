import mergeDeepRight from 'ramda/es/mergeDeepRight';
import { Options as ReactLottieOptions } from 'react-lottie';

import { LANDING, ONBOARDING } from 'constants/routes';

export const ONBOARDING_STAGES = ['A1', 'A2', 'B1', 'B2'];

export const getOnboardingStageIndex = (stage: string) =>
  ONBOARDING_STAGES.indexOf(stage);

/**
 * Gets the route to the next stage in onboarding. If onboarding has finished,
 * routes to the landing page, which will handle redirects.
 * @param stage From URL match
 * @param urlQuery From location.search
 */
export const getNextStageRoute = (stage: string) => {
  const currentIndex = getOnboardingStageIndex(stage);
  // If we're at the last onboarding stage, then go to landing
  if (currentIndex >= ONBOARDING_STAGES.length - 1) return LANDING;
  // Otherwise, go to next stage in the array
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
