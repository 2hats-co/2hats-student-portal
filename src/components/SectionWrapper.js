import React from 'react';
import PropTypes from 'prop-types';
import Tween from 'rc-tween-one';

function SectionWrapper(props) {
  const {width,height,isMobile } = props;
  return (
    <Tween
      animation={{ minHeight:height}}
    >
   <div style= {{margin:0,marginLeft:isMobile?-30:0,marginTop:30,width:'90%',maxWidth:width}}>
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