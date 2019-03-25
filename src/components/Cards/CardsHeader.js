import React from 'react';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit,

    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2,
    },
  },
  clickable: {
    cursor: 'pointer',

    '&:hover $title': { color: theme.palette.primary.main },
    '&:hover $icon': { color: theme.palette.primary.main },
  },

  icon: {
    fontSize: 32,
    opacity: 0.87,

    marginRight: theme.spacing.unit * 1.5,
    verticalAlign: 'bottom',

    transition: theme.transitions.create(['color', 'background-color'], {
      duration: theme.transitions.duration.short,
    }),
  },
  title: {
    cursor: 'default',
    fontWeight: 500,

    '$clickable &': {
      cursor: 'pointer',
      transition: theme.transitions.create('color', {
        duration: theme.transitions.duration.short,
      }),
    },
  },

  viewAllButton: { marginRight: -theme.spacing.unit / 4 },
});

const CardsHeader = props => {
  const { classes, history, title, route, Icon, usedYourBackup } = props;

  return (
    <Grid
      container
      wrap="nowrap"
      alignItems="center"
      className={classNames(classes.root, route && classes.clickable)}
      onClick={
        route
          ? () => {
              history.push(route);
            }
          : null
      }
    >
      {Icon && (
        <Grid item>
          <Icon className={classes.icon} />
        </Grid>
      )}

      <Grid item xs>
        <Typography variant="h5" className={classes.title}>
          {usedYourBackup && 'Your '}
          {title}
        </Typography>
      </Grid>

      {route && (
        <Grid item>
          <Button
            variant="outlined"
            color="primary"
            className={classes.viewAllButton}
          >
            View all
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

export default withRouter(withStyles(styles)(CardsHeader));
