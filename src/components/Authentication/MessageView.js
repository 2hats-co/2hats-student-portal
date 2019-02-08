import React from 'react';
import DoneIcon from '@material-ui/icons/DoneOutlined';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Link from '@material-ui/core/Link';

const styles = theme => ({
  doneIcon: {
    fontSize: 120,
    color: '#00E676',
  },
  message: {
    textAlign: 'center',
    textTransform: 'none',
    marginTop: 10,
    marginBottom: 40,
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': { textDecoration: 'underline' },
  },
});

function MessageView(props) {
  const { classes, message, destination, destinationName } = props;

  return (
    <React.Fragment>
      <DoneIcon className={classes.doneIcon} />

      <Typography variant="h6" className={classes.message}>
        {message}
      </Typography>

      <Link href={destination} className={classes.link}>
        Go to {destinationName}
      </Link>
    </React.Fragment>
  );
}

export default withStyles(styles)(MessageView);
