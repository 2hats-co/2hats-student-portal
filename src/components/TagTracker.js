import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { CLOUD_FUNCTIONS, cloudFunction } from '../utilities/CloudFunctions';
function TagTracker(props) {
  useEffect(
    () => {
      const { location } = props.history;
      const tracker = location.hash;
      if (tracker) {
        cloudFunction(
          CLOUD_FUNCTIONS.TAG_TRACKER,
          { type: 'link', name: tracker.replace('#', '') },
          o => {
            console.log(o);
          },
          e => {
            console.log(e);
          }
        );
      }
    },
    [props.history.location]
  );

  return <div />;
}
export default withRouter(TagTracker);
