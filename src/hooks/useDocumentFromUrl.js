import { useEffect } from 'react';
import useDocument from './useDocument';

const useDocumentFromUrl = (location, path) => {
  const [docState, docDispatch] = useDocument();

  useEffect(
    () => {
      if (
        location.search &&
        location.search.indexOf('?id=') > -1 &&
        location.search.length > 4
      ) {
        const id = location.search.replace('?id=', '');
        docDispatch({ path: `${path}/${id}` });
      } else {
        if (docState.unsubscribe) docState.unsubscribe();
      }

      return () => {
        if (docState.unsubscribe) docState.unsubscribe();
      };
    },
    [location.search]
  );

  return [docState, docDispatch];
};

export default useDocumentFromUrl;
