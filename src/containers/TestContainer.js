import React, { useState, useEffect } from 'react';
import authedFetch from '../utilities/authAPI/authedFetch';
/**
 * Used for testing out authentication
 */
function TestContainer(props) {
  const [response, setResponse] = useState('');

  useEffect(() => {
    authedFetch('http://localhost:8000/students', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(r => console.log(r))
      .catch(r => console.log(r));
  }, []);

  return (
    <>
      <p> This is a test container</p>
    </>
  );
}
export default TestContainer;
