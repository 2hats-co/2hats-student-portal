import React, { useState } from 'react';

import Prompt from './Prompt';

import { useUser } from 'contexts/UserContext';

import useCollection from 'hooks/useCollection';
import { COLLECTIONS } from '@bit/twohats.common.constants';
import { DocWithId, UsersActivityLogDoc } from '@bit/twohats.common.db-types';

import { ASSESSMENT, PROFILE, PROFILE_LOCATION } from 'constants/routes';

import { getDocsFromQuery, updateDoc } from 'utilities/firestore';

/**
 * Displays Prompts to the user based off information on the database.
 *
 * First, checks if they have any submissions with unviewed feedback.
 *
 * If not, checks if the user has finished completing their profile
 * (currently, if they have their mobile number, résumé, and location).
 * Then, checks if they have been prompted to do so within the last 5 sign ins.
 *
 * If they have been prompted to complete their profile **but** have not
 * set their location, then prompt them to do that; but only if they have not
 * been prompted to do so within the last 5 sign ins.
 */
const UserPrompts: React.FunctionComponent = () => {
  const { UID, profile } = useUser();

  // Check for any unviewed feedback
  const [unviewedFeedbackState] = useCollection({
    path: `${COLLECTIONS.users}/${UID!}/${COLLECTIONS.assessments}`,
    filters: [
      { field: 'viewedFeedback', operator: '==', value: false },
      { field: 'screened', operator: '==', value: true },
    ],
    sort: { field: 'updatedAt', direction: 'desc' },
    limit: 1,
  });

  // Store the last 5 UsersActivityLogDocs that are sign ins here
  const [lastFiveSignIns, setLastFiveSignIns] = useState<
    DocWithId<UsersActivityLogDoc>[] | null
  >(null);

  // Display nothing until we’ve checked for any unviewed feedback
  if (unviewedFeedbackState.loading) return null;

  // Display prompt for unviewed feedback
  if (unviewedFeedbackState.documents.length > 0) {
    const submissionDoc = unviewedFeedbackState.documents[0];
    return (
      <Prompt
        message={`You have received feedback for ${submissionDoc.title}`}
        route={`${ASSESSMENT}/${submissionDoc.id}?yours=true`}
        routeLabel="See Feedback"
        elementId="assessments"
      />
    );
  }

  // Display nothing until we have the user’s profile
  if (!profile) return null;

  // Display nothing if the user has completed their profile:
  // Ensure résumé uploaded
  const isResumeUploaded =
    profile.resume && profile.resume.url && profile.resume.name;
  // Ensure mobileNumber exists
  const isMobileNumberSet =
    profile.mobileNumber && profile.mobileNumber.length > 0;
  // Ensure user’s home location exists
  const isLocationHomeSet =
    profile.locationHome &&
    profile.locationHome.city &&
    profile.locationHome.country;
  // Ensure user’s work location exists
  const isLocationWorkSet =
    profile.locationWork &&
    profile.locationWork.length > 0 &&
    profile.locationWork[0].city &&
    profile.locationWork[0].country;

  if (
    isResumeUploaded &&
    isMobileNumberSet &&
    isLocationHomeSet &&
    isLocationWorkSet
  )
    return null;

  // Query for the last five sign ins. Does a one-time query that will update
  // state. In the meantime, display nothing and wait until state updates.
  if (lastFiveSignIns === null) {
    getDocsFromQuery(
      `${COLLECTIONS.users}/${UID!}/${COLLECTIONS.activityLog}`,
      [{ field: 'type', operator: '==', value: 'user-signin' }],
      [{ field: 'createdAt', direction: 'desc' }],
      5
    ).then((documents: DocWithId<UsersActivityLogDoc>[]) =>
      setLastFiveSignIns(documents)
    );

    return null;
  }

  // Check if the user has been prompted within the last 5 sign ins
  const promptedCompleteProfile = lastFiveSignIns.reduce(
    (acc: boolean, cur: DocWithId<UsersActivityLogDoc>) => {
      if (acc) return true;
      if (cur.data && cur.data.promptedCompleteProfile) return true;
      return false;
    },
    false
  );

  // If they have not been prompted to complete their profile
  if (!promptedCompleteProfile) {
    // Mark the current sign in as having been prompted
    if (!!lastFiveSignIns[0])
      updateDoc(
        `${COLLECTIONS.users}/${UID!}/${COLLECTIONS.activityLog}`,
        lastFiveSignIns[0].id,
        { data: { promptedCompleteProfile: true } }
      );

    // Show the prompt to complete profile
    return (
      <Prompt
        message="Your profile needs some love. Fill in some info and shine bright… like your future!"
        route={PROFILE}
        routeLabel="Let’s Do It!"
        elementId="profile"
      />
    );
  }

  // At this point, the user does not have their location set.
  // Check if the user has been prompted to set location within the last 5 sign ins
  const promptedSetLocation = lastFiveSignIns.reduce(
    (acc: boolean, cur: DocWithId<UsersActivityLogDoc>) => {
      if (acc) return true;
      if (cur.data && cur.data.promptedSetLocation) return true;
      return false;
    },
    false
  );

  if (!promptedSetLocation && (!isLocationHomeSet || !isLocationWorkSet)) {
    // Mark the current sign in as having been prompted to set location
    if (!!lastFiveSignIns[0])
      updateDoc(
        `${COLLECTIONS.users}/${UID!}/${COLLECTIONS.activityLog}`,
        lastFiveSignIns[0].id,
        { data: { promptedSetLocation: true } }
      );

    // Show the prompt to set location
    return (
      <Prompt
        message="You’re going places! Update your work location preferences to get more relevant results."
        route={PROFILE + '#' + PROFILE_LOCATION}
        routeLabel="Let’s Do It!"
        elementId="profile"
      />
    );
  }

  // User has been prompted to set their location but the still have not
  return null;
};

export default UserPrompts;
