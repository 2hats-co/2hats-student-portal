import * as React from 'react';

import HeadingCaps from '@bit/twohats.common.components.heading-caps';
import TextWithGraphic from '@bit/twohats.common.components.text-with-graphic';
import TargetGraphic from 'assets/images/graphics/Target.svg';

import { DASHBOARD } from 'constants/routes';

const ApplicationDelight: React.FunctionComponent = () => (
  <>
    <HeadingCaps>Yay, fingers crossed!</HeadingCaps>
    <TextWithGraphic
      graphic={TargetGraphic}
      graphicWidth={109}
      graphicHeight={120}
      message={
        <>
          Congrats on making it this far! You might be wondering what’s next.
          <br />
          <br />
          It usually takes a week after the deadline for you to receive a
          result. We may contact you via email or call you around that time. We
          provide feedback for all applications.
          <br />
          <br />
          See you soon, hopefully with good news!
        </>
      }
      buttonRoute={DASHBOARD}
      buttonLabel="Go to Dashboard"
    />
  </>
);

export default ApplicationDelight;
