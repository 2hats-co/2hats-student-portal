import Tween from 'rc-tween-one';
import React from 'react';


function AnimateIcon(props) {
  return (
    <Tween
      animation={[
        { opacity: 1, duration: 1000 },
        { opacity: 0, repeat: -1, duration: 1000, yoyo: true },
      ]}
      style={{ opacity: 0 }}
    >
      <div>{props.children}</div>
    </Tween>);
}
export default AnimateIcon