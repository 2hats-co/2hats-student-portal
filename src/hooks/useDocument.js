import { firestore } from '../firebase';
import { useEffect, useReducer } from 'react';

const documentReducer = (prevState, newProps) => {
  return { ...prevState, ...newProps };
};
const documentIntialState = {
  path: null,
  prevPath: null,
  doc: null,
  loading: true,
};

const useDocument = intialOverrides => {
  const [documentState, documentDispatch] = useReducer(documentReducer, {
    ...documentIntialState,
    ...intialOverrides,
  });

  const setDocumentListner = () => {
    documentDispatch({ prevPath: documentState.path, loading: true });
    const unsubscribe = firestore
      .doc(documentState.path)
      .onSnapshot(snapshot => {
        if (snapshot.exists) {
          const data = snapshot.data();
          const id = snapshot.id;
          const doc = { ...data, id };
          documentDispatch({
            doc,
            loading: false,
          });
        } else documentDispatch({ loading: false });
      });
    documentDispatch({ unsubscribe });
  };

  useEffect(() => {
    const { path, prevPath, loading } = documentState;
    if (path && path !== prevPath) {
      setDocumentListner();
    }
    // Make sure documentState is set to loading: false if we are dispatched
    // the same path and prevPath from the component that calls useDocument
    else if (
      path &&
      path === prevPath &&
      documentState.doc &&
      path.includes(documentState.doc.id) &&
      loading
    ) {
      documentDispatch({ loading: false });
    }
  }, [documentState]);

  useEffect(
    () => () => {
      if (documentState.unsubscribe) documentState.unsubscribe();
    },
    [documentState.unsubscribe]
  );
  return [documentState, documentDispatch];
};

export default useDocument;
