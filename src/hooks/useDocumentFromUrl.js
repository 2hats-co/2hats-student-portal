import { useEffect, useContext, useState } from 'react';
import queryString from 'query-string';

import { COLLECTIONS } from '@bit/twohats.common.constants';
import useDocument from './useDocument';
import UserContext from '../contexts/UserContext';

/** CURRENTLY UNUSED */
const useDocumentFromUrl = (location, match, path) => {
  const [docState, docDispatch] = useDocument();
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (match.params && match.params.id) {
      const parsedQuery = queryString.parse(location.search);
      const isYours = parsedQuery.yours && parsedQuery.yours === 'true';

      const docPath = isYours
        ? `${COLLECTIONS.users}/${user.id}/${path}/${match.params.id}`
        : `${path}/${match.params.id}`;

      console.log(docPath, docPath !== docState.path);

      if (docPath !== docState.path) {
        docDispatch({ path: docPath, valid: true, loading: true });
        setLoading(true);
      }
    } else {
      docDispatch({ doc: null, path: null, loading: false });
      if (docState.unsubscribe) docState.unsubscribe();
    }
  }, [match.params]);

  useEffect(() => {
    setLoading(docState.loading);
  }, [docState]);

  useEffect(
    () => () => {
      if (docState.unsubscribe) docState.unsubscribe();
    },
    [docState]
  );

  return [docState, docDispatch, loading];
};

export default useDocumentFromUrl;
