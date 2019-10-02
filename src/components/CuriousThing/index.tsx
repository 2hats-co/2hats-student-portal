import React from 'react';
import ScrollableAnchor from 'react-scrollable-anchor';

import HeadingCaps from '@bit/twohats.common.components.heading-caps';
import CTPrompt from './CTPrompt';
import CTResult from './CTResult';

import { ProfileComponentProps } from 'containers/ProfileContainer';
import { PROFILE_CURIOUS_THING } from 'constants/routes';

import sampleData from './CTSamplePopup/sampleData.json';

interface ICuriousThingProps extends ProfileComponentProps {}

/**
 * The component displayed on the Profile page to either display the user’s
 * Curious Thing results **or** show a prompt to go to Curious Thing
 *
 * Will show results if the `curiousThingResult` field is in the user’s profile
 * document
 */
const CuriousThing: React.FunctionComponent<ICuriousThingProps> = ({
  profileData,
}) => {
  // Show prompt by default
  let contents = <CTPrompt />;
  // Or show results if it exists in the user’s profile doc
  if ('curiousThingResult' in profileData && !!profileData.curiousThingResult)
    contents = <CTResult resultData={sampleData} />;

  return (
    <ScrollableAnchor id={PROFILE_CURIOUS_THING}>
      <section>
        {/* <Grid container alignItems="center"> */}
        <HeadingCaps>My Workplace Vibe</HeadingCaps>
        {/* </Grid> */}

        {contents}
      </section>
    </ScrollableAnchor>
  );
};

export default CuriousThing;
