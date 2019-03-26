import { useState, useEffect } from 'react';
import { CLOUD_FUNCTIONS, cloudFunction } from '../utilities/CloudFunctions';

function useAnalytics(query) {
  const [counter, setCounter] = useState('–');

  useEffect(() => {
    loadQuery(query);
  }, []);

  const loadQuery = query => {
    cloudFunction(
      CLOUD_FUNCTIONS.CACHED_STATS,
      { filters: query.filters, collection: query.collection },
      o => {
        setCounter(o.data.value);
      },
      e => console.log('fail', e)
    );
  };

  return counter;
}
export default useAnalytics;
