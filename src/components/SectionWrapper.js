import React from 'react';
import PropTypes from 'prop-types';
import Tween from 'rc-tween-one';

function SectionWrapper(props) {
  const {height } = props;
  return (
    <Tween
      animation={{ minHeight:height}}
    >
   <div>
   {props.children}
  </div>
  </Tween>
  );
}

SectionWrapper.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number,
  children: PropTypes.any.isRequired,
};

export default SectionWrapper;