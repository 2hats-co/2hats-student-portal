import { useEffect, useContext } from 'react';
import queryString from 'query-string';

import { COLLECTIONS } from '../constants/firestore';
import useDocument from './useDocument';
import UserContext from '../contexts/UserContext';

const useDocumentFromUrl = (location, path) => {
  const [docState, docDispatch] = useDocument();

  const userContext = useContext(UserContext);

  useEffect(
    () => {
      if (location.search) {
        const parsedQuery = queryString.parse(location.search);

        if (parsedQuery.id && parsedQuery.id.length > 0) {
          if (parsedQuery.yours && parsedQuery.yours === 'true')
            docDispatch({
              path: `${COLLECTIONS.users}/${userContext.user.id}/${path}/${
                parsedQuery.id
              }`,
            });
          else docDispatch({ path: `${path}/${parsedQuery.id}` });
        } else {
          if (docState.unsubscribe) docState.unsubscribe();
        }

        return () => {
          if (docState.unsubscribe) docState.unsubscribe();
        };
      }
    },
    [location.search]
  );

  return [docState, docDispatch];
};

export default useDocumentFromUrl;
