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
        const { classes,title,hint,list} = this.props;
        return (
         <InputWrapper title={title} hint={hint}>
            <TextField/>
         </InputWrapper>

        );
    } 
}

AutoCompleteField.propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.string,  
    hint: PropTypes.string,  
    list: PropTypes.arrayOf(PropTypes.string).isRequired,  
};
export default withStyles(styles)(AutoCompleteField);