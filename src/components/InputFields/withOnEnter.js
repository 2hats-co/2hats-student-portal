import React from 'react';
export const withOnEnter = WrappedComponent => {
  const WithOnEnter = props => {
    const handleKeyPress = e => {
      if (props.primaryAction) {
        if (e.key === 'Enter') {
          props.primaryAction();
        }
      }
    };

    return <WrappedComponent {...props} handleKeyPress={handleKeyPress} />;
  };
  return WithOnEnter;
};
