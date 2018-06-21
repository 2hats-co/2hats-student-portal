// title? hint? list! 
import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputWrapper from './InputWrapper';
import { TextField } from '@material-ui/core';

const styles = theme => ({
    root: {
  
    },
});


class AutoCompleteField extends React.Component {  
    
    render() {
        const { classes,title,hint} = this.props;
        return (
         <InputWrapper title={title} hint={hint}>
            <TextField/>
         </InputWrapper>

        );
    } 
}
AutoCompleteField.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AutoCompleteField);