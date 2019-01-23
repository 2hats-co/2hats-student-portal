import { useState, useEffect } from 'react';
import useCollection from './useCollection';

const useMore = (intialCollection, initialNum, filterIds) => {
  const [collectionState, collectionDispatch] = useCollection({
    limit: initialNum,
    ...intialCollection,
  });
  const [filteredDocs, setFilteredDocs] = useState([]);
  const [num, setNum] = useState(initialNum);
  const [noMore, setNoMore] = useState(false);

  const getMore = toAdd => {
    if (toAdd > 0) setNum(num + toAdd);
  };

  useEffect(
    () => {
      if (
        filteredDocs.length > 0 &&
        filteredDocs.length < num &&
        num > initialNum
      ) {
        collectionDispatch({ type: 'more' });
      }
    },
    [num]
  );

  useEffect(
    () => {
      if (collectionState.documents) {
        if (filterIds)
          setFilteredDocs(
            collectionState.documents.filter(x => !filterIds.includes(x.id))
          );
        else setFilteredDocs(collectionState.documents);
      }
    },
    [num, collectionState.documents]
  );

  useEffect(
    () => {
      setNoMore(
        collectionState.documents.length < collectionState.limit &&
          filteredDocs.length < num
      );
    },
    [collectionState.documents.length]
  );

  return [filteredDocs.slice(0, num), getMore, noMore];
};

export default useMore;
