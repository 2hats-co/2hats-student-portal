import React from 'react';

import HeadingCaps from '@bit/twohats.common.components.heading-caps';
import CTPrompt from './CTPrompt';
import CTResult from './CTResult';

import { ProfileComponentProps } from 'containers/ProfileContainer';
import { PROFILE_CURIOUS_THING } from 'constants/routes';

import sampleData from './sampleData.json';

interface ICuriousThingProps extends ProfileComponentProps {}

const CuriousThing: React.FunctionComponent<ICuriousThingProps> = ({
  profileData,
}) => {
  // let contents = <CTPrompt />;
  let contents = <CTResult resultData={sampleData} />;

  return (
    <section id={PROFILE_CURIOUS_THING}>
      <HeadingCaps>My Workplace Vibe</HeadingCaps>

      {contents}
    </section>
  );
};

export default CuriousThing;
