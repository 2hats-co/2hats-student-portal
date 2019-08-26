import * as React from 'react';

import HeadingCaps from '@bit/twohats.common.components.heading-caps';
import TextWithGraphic from '@bit/twohats.common.components.text-with-graphic';
import RibbonGraphic from 'assets/images/graphics/ribbon.svg';

import { DASHBOARD } from 'constants/routes';

const CompletionDelight: React.FunctionComponent = () => (
  <>
    <HeadingCaps>You’re going places!</HeadingCaps>
    <TextWithGraphic
      graphic={RibbonGraphic}
      graphicWidth={109}
      graphicHeight={120}
      message={
        <>
          We knew it. This was a piece of cake for you!
          <br />
          <br />
          Now is the time to take a little break and relax. It generally takes
          us around 2 weeks to assess your task and provide you with insightful
          feedback.
          <br />
          <br />
          Have we mentioned, doing multiple tasks in your field increases your
          chances of scoring an interview?
        </>
      }
      buttonRoute={DASHBOARD}
      buttonLabel="Go to Dashboard"
    />
  </>
);

export default CompletionDelight;
