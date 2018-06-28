//props: title?, child/childern, hint?, characterCounter?

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';



const styles = theme => ({

 
});

function SectionWrapper(props) {
  const { classes, width,height, child } = props;
 
     
  return (
   <div style= {{margin:0,marginTop:10,width:width,height:height}}>
     {child}
  </div>
  );
}

SectionWrapper.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  child: PropTypes.element.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SectionWrapper);