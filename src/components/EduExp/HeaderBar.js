import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
const styles = theme => {
  return {
    header: {
      paddingTop: 8,
      paddingBottom: 6,
      paddingLeft: 30,
      paddingRight: 10,
      width: '82%',
      height: 35,
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.grey[100],
      color: theme.palette.primary.light,
      marginBottom: -25,
      boxShadow: theme.shadows[2],
      zIndex: 10,
    },
    add: {
      width: 40,
      height: 40,
      marginTop: -4,
      padding: 0,
    },
  };
};
function HeaderBar(props) {
  const { classes, title, handler, disabled } = props;
  return (
    <div className={classes.header}>
      <Grid
        container
        direction="row"
        justify="space-between"
        onClick={() => {
          if (!disabled) {
            handler();
          }
        }}
      >
        <Typography variant="h6" color="primary">
          {title}
        </Typography>
        {!disabled && (
          <IconButton
            className={classes.add}
            onClick={() => {
              handler();
            }}
            color="inherit"
            aria-label="add"
          >
            <AddIcon style={{ fontSize: 32 }} />
          </IconButton>
        )}
      </Grid>
    </div>
  );
}
HeaderBar.propTypes = {
  title: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(HeaderBar);
