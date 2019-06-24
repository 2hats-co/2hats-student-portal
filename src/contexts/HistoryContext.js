/* eslint-disable react-hooks/exhaustive-deps */
import React, { useReducer, createContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import equals from 'ramda/es/equals';

export const HistoryContext = createContext();

const historyReducer = (prevState, action) => {
  switch (action.action) {
    case 'PUSH':
      return [...prevState, action.location];

    case 'POP':
      if (
        prevState.length >= 2 &&
        equals(prevState[prevState.length - 2], action.location)
      ) {
        const newState = [...prevState];
        newState.pop();
        return newState;
      } else return [...prevState, action.location];

    default:
      return prevState;
  }
};

export const HistoryProvider = withRouter(({ history, location, children }) => {
  const [stack, stackDispatch] = useReducer(historyReducer, [location]);

  useEffect(() => {
    history.listen((location, action) => stackDispatch({ action, location }));
  }, []);

  return (
    <HistoryContext.Provider value={stack}>{children}</HistoryContext.Provider>
  );
});

HistoryProvider.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};
