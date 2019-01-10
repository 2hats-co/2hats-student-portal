import React from 'react';
import WebForm from './WebForm';
import MobileForm from './MobileForm';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  root: {},
});

function Dialog(props) {
  const {
    isLoading,
    activity,
    title,
    unChanged,
    addHandler,
    open,
    theme,
    children,
    disabled,
    cancelHandler,
    width,
  } = props;

  if (theme.responsive.isMobile) {
    return (
      <MobileForm
        isLoading={isLoading}
        activity={activity}
        title={title}
        open={open}
        addHandler={addHandler}
        disabled={disabled}
        cancelHandler={cancelHandler}
      >
        {children}
      </MobileForm>
    );
  } else {
    return (
      <WebForm
        isLoading={isLoading}
        activity={activity}
        unChanged={unChanged}
        title={title}
        open={open}
        addHandler={addHandler}
        disabled={disabled}
        cancelHandler={cancelHandler}
        width={width}
        hideActivityFromTitle={props.hideActivityFromTitle}
      >
        {children}
      </WebForm>
    );
  }
}
Dialog.protoTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  open: PropTypes.boolean,
  activity: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
export default withStyles(styles, { withTheme: true })(Dialog);
