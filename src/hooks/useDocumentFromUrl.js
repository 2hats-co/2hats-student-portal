import { useEffect, useContext } from 'react';
import queryString from 'query-string';

import { COLLECTIONS } from '@bit/sidney2hats.2hats.global.common-constants';
import useDocument from './useDocument';
import UserContext from '../contexts/UserContext';

const useDocumentFromUrl = (location, match, path) => {
  const [docState, docDispatch] = useDocument();

  const userContext = useContext(UserContext);

  useEffect(() => {
    if (match.params && match.params.id) {
      const parsedQuery = queryString.parse(location.search);

      if (parsedQuery.yours && parsedQuery.yours === 'true')
        docDispatch({
          path: `${COLLECTIONS.users}/${userContext.user.id}/${path}/${
            match.params.id
          }`,
          valid: true,
        });
      else docDispatch({ path: `${path}/${match.params.id}`, valid: true });
    } else {
      docDispatch({ doc: null, path: null, prevPath: null });
      if (docState.unsubscribe) docState.unsubscribe();
    }
  }, [match.params]);

  useEffect(
    () => () => {
      if (docState.unsubscribe) docState.unsubscribe();
    },
    []
  );

  return [docState, docDispatch];
};

export default useDocumentFromUrl;
