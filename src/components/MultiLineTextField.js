// nlines? hintText? defaultText? char limit?
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: theme.mixins.gutters({
      
      backgroundColor:'#EDEDED',
      border: '1px solid #fff',
      outline: 'none',
      resize: 'none',
      overflow: 'auto',
      borderRadius:'5px',
      color: '#9B9B9B',
      fontFamily: "Helvetica Neue",
      fontSize: '16px',
      lineHeight: '18px'
        }),
    
  });


function MultiLineTextField(props) {
    const { classes} = props;

    return(
      <textarea className={classes.root}rows="4" cols="50">
      
      E.g.:Hard-working student (80 WAM) with 3 months experience of UI design internship.
      </textarea>
    )

}
MultiLineTextField.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MultiLineTextField);