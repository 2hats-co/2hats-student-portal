import { updateDoc, createDocWithId } from './firestore';
import { COLLECTIONS } from '@bit/twohats.common.constants';

/**
 * Converts a key-boolean object of prioritised industries into an array
 * of deprioritised industries (as strings)
 *
 * @param prioritised A key-boolean object of prioritised industries
 * @returns {string[]} A list of deprioritised industries
 */
export const getDeprioritisedIndustries = (prioritised: {
  [industry: string]: boolean;
}) =>
  Object.keys(prioritised).reduce((acc: string[], cur: string) => {
    // If false, i.e. not prioritised, add to the list
    if (!prioritised[cur]) return [...acc, cur];
    return acc;
  }, []);

/**
 * Saves the user’s deprioritised industries
 * (using `getDeprioritisedIndustries` function) to their user document
 * @param UID
 * @param deprioritisedIndustries
 */
export const saveDeprioritisedIndustries = (
  UID: string,
  deprioritisedIndustries: string[]
) => updateDoc(COLLECTIONS.users, UID, { deprioritisedIndustries });

/**
 * Requests the user be deleted from the database.
 * Sets `deleteRequested: true` in the user document
 * and creates a userDeleteRequests document with `status: 'pending'`.
 * @param UID
 */
export const requestUserDelete = (UID: string) => {
  const updateDocPromise = updateDoc(COLLECTIONS.users, UID, {
    deleteRequested: true,
  });
  const createDocPromise = createDocWithId(
    COLLECTIONS.userDeleteRequests,
    UID,
    {
      UID,
      status: 'pending',
      requestedAt: new Date(),
    }
  );

  return Promise.all([updateDocPromise, createDocPromise]);
};

/**
 * Cancel the user’s delete request.
 * Sets `deleteRequested: false` in the user document
 * and updates the userDeleteRequests document with `status: 'cancelled'`.
 * @param UID
 */
export const cancelUserDelete = (UID: string) => {
  const updateDocPromise = updateDoc(COLLECTIONS.users, UID, {
    deleteRequested: false,
  });
  const createDocPromise = updateDoc(COLLECTIONS.userDeleteRequests, UID, {
    status: 'cancelled',
  });

  return Promise.all([updateDocPromise, createDocPromise]);
};
