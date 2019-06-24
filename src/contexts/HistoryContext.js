/* eslint-disable react-hooks/exhaustive-deps */
import React, { useReducer, createContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import equals from 'ramda/es/equals';

import { ROUTES_PREVENT_BACK } from 'constants/routes';

export const HistoryContext = createContext();

const historyReducer = (prevState, action) => {
  const pushTo = stack => {
    // Don't push if the same
    if (stack.length > 0 && stack[stack.length - 1].key === action.location.key)
      return stack;
    // Don't push if auth route
    if (ROUTES_PREVENT_BACK.includes(action.location.pathname)) return stack;
    // Otherwise, push
    return [...stack, action.location];
  };

  const push = () => pushTo(prevState);

  const pop = () => {
    const newState = [...prevState];
    newState.pop();
    return newState;
  };

  switch (action.action) {
    case 'PUSH':
      return push();

    case 'POP':
      if (
        prevState.length >= 2 &&
        equals(prevState[prevState.length - 2], action.location)
      )
        return pop();
      return push();

    case 'REPLACE':
      const newStack = pop();
      return pushTo(newStack);

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
  const [stack, stackDispatch] = useReducer(historyReducer, []);

  useEffect(() => {
    // push current location on mount
    stackDispatch({ action: 'PUSH', location });
    history.listen((location, action) => stackDispatch({ action, location }));
  }, []);

  console.log(stack);

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
