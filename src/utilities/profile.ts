import { updateDoc } from './firestore';
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
