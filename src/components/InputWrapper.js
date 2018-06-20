//props: title?, child/childern, hint?, characterCounter?

import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Grid ,Typography} from '@material-ui/core/styles';


const styles = theme => ({
  root: theme.mixins.gutters({

  }),
});

function InputWrapper(props) {
  const { classes,characterCounter,title,hint } = props;
  const titleLabel = (title&&
  <Typography variant='title'>
      {title}
  </Typography>
      ) 
  const hintLabel = (<Typography>
    {hint}
    </Typography>)
    const characterCounterLabel = (characterCounter&&
    <Typography>
        {characterCounter}
    </Typography>
        )
    const footer = {characterCounter ? <Grid container direction='row'>
    <Grid item> 
    {hintLabel}
    </Grid>
    <Grid item> 

    </Grid>
    </Grid>:{hintLabel}}
  return (
    <Grid
    container
    >

        
    </Grid>
  );
}

InputWrapper.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InputWrapper);