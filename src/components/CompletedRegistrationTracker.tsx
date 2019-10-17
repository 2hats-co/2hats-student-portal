import React, { useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import queryString from 'query-string';
import ReactPixel from 'react-facebook-pixel';

/**
 * Mounts a dummy DOM component that doesn’t do anything. But if it sees
 * completedRegistration=true in the URL, it will trigger the FB pixel event.
 */
const CompletedRegistrationTracker: React.FC<RouteComponentProps> = ({
  location,
}) => {
  useEffect(() => {
    const parsedQuery = queryString.parse(location.search);
    if (parsedQuery.completedRegistration === 'true') {
      ReactPixel.trackCustom('CompleteRegistration');
      console.log('FB PIXEL: COMPLETED REGISTRATION');
    }
  }, [location]);

  return <div id="completed-registration-tracker" />;
};

export default withRouter(CompletedRegistrationTracker);
