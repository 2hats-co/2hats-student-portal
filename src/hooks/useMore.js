import { useState, useEffect } from 'react';
import useCollection from './useCollection';

const useMore = (intialCollection, initialNum, initialFilterIds) => {
  const [collectionState, collectionDispatch] = useCollection({
    limit: initialNum,
    ...intialCollection,
  });
  const [filteredDocs, setFilteredDocs] = useState([]);
  const [num, setNum] = useState(initialNum);
  const [filterIds, setFilterIds] = useState(initialFilterIds);

  const getMore = toAdd => {
    if (toAdd > 0) setNum(num + toAdd);
  };

  useEffect(
    () => {
      if (filteredDocs.length < num) collectionDispatch({ type: 'more' });
    },
    [num]
  );

  useEffect(
    () => {
      if (collectionState.documents) {
        if (Array.isArray(filterIds))
          setFilteredDocs(
            collectionState.documents.filter(x => !filterIds.includes(x.id))
          );
        else setFilteredDocs(collectionState.documents);
      }
    },
    [num, collectionState.documents]
  );

  return [
    filteredDocs.slice(0, num),
    getMore,
    setFilterIds,
    collectionState,
    collectionDispatch,
  ];
};

export default useMore;
