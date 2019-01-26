import { COLLECTIONS } from '@bit/sidney2hats.2hats.global.common-constants';

export const LISTENER = (COLLECTION, UID) => {
  switch (COLLECTION) {
    case COLLECTIONS.profiles:
    case COLLECTIONS.users:
    case COLLECTIONS.submissions:
    case COLLECTIONS.smartLinks:
      return {
        collection: COLLECTION,
        doc: UID,
      };
    default:
      return { collection: COLLECTION };
  }
};
