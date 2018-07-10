//props: title?, child/childern, hint?, characterCounter?

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';
import Tween from 'rc-tween-one';


const styles = theme => ({


});

function SectionWrapper(props) {
  const { classes, width,height, child } = props;
  return (
    <Tween
      animation={{ minHeight:height}}
    //  onChange={this.bbb}
     // style={{ opacity: 1, height: 100, display: 'inline-block' }}
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

export default withStyles(styles)(SectionWrapper);