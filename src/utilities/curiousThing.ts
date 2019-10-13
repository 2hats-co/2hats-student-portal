import React from 'react';

import { updateDoc } from './firestore';
import {
  COLLECTIONS,
  CuriousThingResultData,
} from '@bit/twohats.common.constants';

/**
 * Updates the `curiousThingResult` field in the user’s profile document
 * with their “share with employers” preference
 * @param UID
 * @param resultData The curiousThingResult object to merge
 */
export const updateCuriousThingSharing = (
  UID: string,
  resultData: CuriousThingResultData & {
    shareWithEmployers?: boolean;
  }
) => (e: React.ChangeEvent<HTMLInputElement>) =>
  updateDoc(COLLECTIONS.profiles, UID, {
    curiousThingResult: { ...resultData, shareWithEmployers: e.target.checked },
  });
