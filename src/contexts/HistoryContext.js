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
      } else {
        return [...prevState, action.location];
      }

    case 'REPLACE':
      const newState = [...prevState];
      newState.pop();
      return [...newState, action.location];

    default:
      return prevState;
  }
};

/**
 * Wrapper for `HistoryContext.Provider`. Sets listener for `history`: when
 * `location` changes, uses a reducer to PUSH, POP, or REPLACE in the stack.
 *
 * The stack is an array of `location` objects and is the value of the context.
 *
 * ### Caveat
 *
 * The stack can only store the history items in the current session. The
 * session is reset on refresh or if the user goes back too far and the current
 * instance of the React app is unloaded.
 *
 * This could be solved by storing the stack in Session Storage if this feature
 * is required in the future.
 */
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
  /** Everything inside, from `App` */
  children: PropTypes.node.isRequired,
};
