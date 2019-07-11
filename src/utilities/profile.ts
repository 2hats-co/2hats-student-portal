import { updateDoc } from './firestore';
import { COLLECTIONS } from '@bit/twohats.common.constants';

export const saveDeprioritisedIndustries = (
  UID: string,
  deprioritisedIndustries: string[]
) => updateDoc(COLLECTIONS.users, UID, { deprioritisedIndustries });
