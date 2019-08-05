import { firestore } from '../firebase';
import { useEffect, useReducer } from 'react';
import equals from 'ramda/es/equals';
const CAP = 50;
export const INITIAL_LIMIT = 30;

const collectionReducer = (prevState, newProps) => {
  if (newProps.type) {
    switch (newProps.type) {
      case 'more':
        if (prevState.limit < prevState.cap)
          // documents count hardcap
          return { ...prevState, limit: prevState.limit + 10 };
        else return { ...prevState };
      default:
        break;
    }
  } else {
    return { ...prevState, ...newProps };
  }
};
const collectionIntialState = {
  documents: [],
  prevFilters: null,
  prevPath: null,
  path: null,
  filters: [],
  // sort: [], // needs to be disabled
  prevLimit: 0,
  limit: INITIAL_LIMIT,
  loading: true,
  cap: CAP,
};

const useCollection = intialOverrides => {
  const [collectionState, collectionDispatch] = useReducer(collectionReducer, {
    ...collectionIntialState,
    ...intialOverrides,
  });
  const getDocuments = (filters, limit, sort) => {
    //unsubscribe from old path
    if (
      collectionState.prevPath &&
      collectionState.path !== collectionState.prevPath
    ) {
      collectionState.unsubscribe();
    }
    //updates prev values
    collectionDispatch({
      prevFilters: filters,
      prevLimit: limit,
      prevPath: collectionState.path,
      loading: true,
    });
    let query = firestore.collection(collectionState.path);

    filters.forEach(filter => {
      query = query.where(filter.field, filter.operator, filter.value);
    });
    if (sort) {
      if (Array.isArray(sort)) {
        sort.forEach(order => {
          query = query.orderBy(order.field, order.direction);
        });
      } else {
        query = query.orderBy(sort.field, sort.direction);
      }
    }

    const unsubscribe = query.limit(limit).onSnapshot(snapshot => {
      if (snapshot.docs.length > 0) {
        const documents = snapshot.docs.map(doc => {
          const data = doc.data();
          const id = doc.id;
          return { ...data, id };
        });
        collectionDispatch({
          documents,
          loading: false,
        });
      } else {
        collectionDispatch({
          documents: [],
          loading: false,
        });
      }
    });

    // collectionDispatch({ unsubscribe: Symbol.for(unsubscribe) });
    return unsubscribe;
  };
  useEffect(() => {
    const {
      prevFilters,
      filters,
      prevLimit,
      limit,
      prevPath,
      path,
      sort,
      //unsubscribe,
    } = collectionState;

    let unsubscribe;
    if (
      !equals(prevFilters, filters) ||
      prevLimit !== limit ||
      prevPath !== path
    ) {
      if (path) unsubscribe = getDocuments(filters, limit, sort);
    }
    return () => {
      // console.log('unsubscribe', path);
      if (unsubscribe) unsubscribe();
    };
  }, [collectionState.filters, collectionState.limit, collectionState.path]);
  return [collectionState, collectionDispatch];
};

export default useCollection;
