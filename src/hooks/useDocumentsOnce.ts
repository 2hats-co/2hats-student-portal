import { useEffect, useReducer } from 'react';
import { getDoc } from 'utilities/firestore';

type DocDataState<T> = { [id: string]: T };
type DocDataAction<T> = { id: string; data: T };
// Wrap the reducer function around a creator function to keep it typesafe
const createDocDataReducer = <T extends {}>() => (
  state: DocDataState<T>,
  action: DocDataAction<T>
): DocDataState<T> => {
  if (!!action.id) return { ...state, [action.id]: action.data };

  return state;
};

type DocLoadingState = { [id: string]: boolean };
type DocLoadingAction = { id: string; isLoading: boolean };
const docLoadingReducer = (
  state: DocLoadingState,
  action: DocLoadingAction
) => {
  if (!!action.id) return { ...state, [action.id]: action.isLoading };
  return state;
};

/**
 * A hook that gets a set of documents and returns a loading state.
 * Does not set listeners for the documents.
 * @param path The collection path from which to query the documents
 * @param docIds A list of document IDs
 * @returns [docData, loading]
 */
const useDocumentsOnce = <T extends {}>(
  path: string,
  docIds: string[]
): [DocDataState<T>, boolean] => {
  // Store the data for each asseessment document here, to get the approx time
  const [docData, docDataDispatch] = useReducer(createDocDataReducer<T>(), {});

  // Store each doc’s loading state
  const [docLoading, docLoadingDispatch] = useReducer(docLoadingReducer, {});

  // Get document data
  useEffect(() => {
    docIds.forEach(id => {
      // Default each ID to false
      if (!(id in docLoading)) docLoadingDispatch({ id, isLoading: false });

      // Only make a call if the doc is non-existent and the doc isn't loading
      if (!docData[id] && !docLoading[id]) {
        docLoadingDispatch({ id, isLoading: true });

        // Get the doc, save the data, and set loading to false
        getDoc(path, id)
          .then(docData => {
            docDataDispatch({ id, data: docData });
            docLoadingDispatch({ id, isLoading: false });
          })
          .catch(error => {
            docLoadingDispatch({ id, isLoading: false });
            console.error(`Failed to download ${path}/${id}`, error);
          });
      }
    });
  }, [docIds]);

  // Reduce loading to one value: true if at least one of the docs are loading
  const loading = Object.values(docLoading).reduce(
    (prev, curr) => curr || prev,
    false
  );

  return [docData, loading];
};

export default useDocumentsOnce;
