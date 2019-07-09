import { DASHBOARD, ONBOARDING } from 'constants/routes';

export const ONBOARDING_STAGES = ['A1', 'A2', 'B1', 'B2'];

export const getOnboardingStageIndex = stage =>
  ONBOARDING_STAGES.indexOf(stage);

export const getNextStageRoute = stage => {
  const currentIndex = getOnboardingStageIndex(stage);
  if (currentIndex >= ONBOARDING_STAGES.length - 1) return DASHBOARD;
  return ONBOARDING + '/' + ONBOARDING_STAGES[currentIndex + 1];
};
