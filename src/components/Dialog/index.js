import React from 'react'
import WebForm from './WebForm'
import MobileForm from './MobileForm'
import PropTypes from 'prop-types';

function Dialog(props){
    const {activity,title,addHandler,isOpen,isMobile,children,disabled,cancelHandler} = props
    if(isMobile){return(
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
    isOpen:PropTypes.boolean,
    isMobile:PropTypes.boolean,
    activity: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }
export default Dialog