import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import ReactPixel from 'react-facebook-pixel';

const CompletedRegistrationTracker = ({ location }) => {
  useEffect(
    () => {
      const parsedQuery = queryString.parse(location.search);
      if (parsedQuery.completedRegistration === 'true') {
        ReactPixel.trackCustom('CompleteRegistration');
        console.log('FB PIXEL: COMPLETED REGISTRATION');
      }
    },
    [location]
  );

  return <div id="completed-registration-tracker" />;
};

export default withRouter(CompletedRegistrationTracker);
