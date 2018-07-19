import React from 'react';
import PropTypes from 'prop-types';
import Tween from 'rc-tween-one';

function SectionWrapper(props) {
  const {width,height, child } = props;
  return (
    <Tween
      animation={{ minHeight:height}}
    >
   <div style= {{margin:0,marginTop:30,width:width}}>
     {child}
  </div>
  </Tween>
  );
}

SectionWrapper.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number,
  child: PropTypes.element.isRequired,
  classes: PropTypes.object.isRequired,
};

export default SectionWrapper;