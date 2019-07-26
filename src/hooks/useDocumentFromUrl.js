import { useEffect, useContext } from 'react';
import queryString from 'query-string';

import { COLLECTIONS } from '@bit/twohats.common.constants';
import useDocument from './useDocument';
import UserContext from '../contexts/UserContext';

const useDocumentFromUrl = (location, match, path) => {
  const [docState, docDispatch] = useDocument();

  const userContext = useContext(UserContext);

  useEffect(() => {
    if (match.params && match.params.id) {
      const docPath = `${COLLECTIONS.users}/${userContext.user.id}/${path}/${
        match.params.id
      }`;

      if (docPath !== docState.path) {
        const parsedQuery = queryString.parse(location.search);

        if (parsedQuery.yours && parsedQuery.yours === 'true')
          docDispatch({ path: docPath, valid: true, loading: true });
        else docDispatch({ path: `${path}/${match.params.id}`, valid: true });
      }
    } else {
      docDispatch({ doc: null, path: null, prevPath: null });
      if (docState.unsubscribe) docState.unsubscribe();
    }
  }, [match.params]);

  useEffect(
    () => () => {
      if (docState.unsubscribe) docState.unsubscribe();
    },
    [docState]
  );

  return [docState, docDispatch];
};

export default useDocumentFromUrl;
