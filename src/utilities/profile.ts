import { updateDoc } from '@bit/twohats.common.utilities.firestore';
import { COLLECTIONS } from '@bit/twohats.common.constants';

export const saveDeprioritisedIndustries = (
  UID: string,
  deprioritisedIndustries: string[]
) => updateDoc(COLLECTIONS.users, UID, { deprioritisedIndustries });
