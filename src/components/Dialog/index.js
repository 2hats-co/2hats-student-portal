import React from 'react'
import WebForm from './WebForm'
import MobileForm from './MobileForm'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {

    },
  });
  
function Dialog(props){
    const {activity,title,addHandler,isOpen,theme,children,disabled,cancelHandler} = props
    
    if(theme.responsive.isMobile){return(
        <MobileForm activity={activity} 
        title={title} isOpen={isOpen} 
        addHandler={addHandler} 
        disabled={disabled} 
        cancelHandler={cancelHandler}>
        {children}
          </MobileForm>
    )}else{
        return(
            <WebForm activity={activity} 
            title={title} isOpen={isOpen} 
            addHandler={addHandler} 
            disabled={disabled} 
            cancelHandler={cancelHandler}>
            {children}
              </WebForm>
        )
    }
}
Dialog.protoTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    isOpen:PropTypes.boolean,
    activity: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }
export default withStyles(styles,{ withTheme: true })(Dialog)