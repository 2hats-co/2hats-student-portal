import React from 'react';
import Lottie from 'react-lottie';

import animationB1 from 'assets/animations/onboardingB1.json';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationB1,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid meet',
  },
};

const OnboardingB1 = props => {
  return (
    <div style={{ background: 'grey' }}>
      <Lottie options={defaultOptions} width={400} height={400} />

      <div
        style={{
          position: 'absolute',
          left: '50%',
          right: 'auto',
          top: 0,
          bottom: 0,
          width: 1,
          backgroundColor: 'red',
        }}
      />
    </div>
  );
};

export default OnboardingB1;
