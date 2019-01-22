import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import withStyles from '@material-ui/core/styles/withStyles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import GoIcon from '@material-ui/icons/ArrowForwardRounded';
import ActivityIcon from './ActivityIcon';

import moment from 'moment';

const styles = theme => ({
  listItemRoot: {
    alignItems: 'flex-start',
    cursor: 'default',
    marginBottom: theme.spacing.unit,
  },
  listItemRootCentred: { alignItems: 'center' },

  listItemTextRoot: { paddingRight: 0 },
  activityTitle: {
    lineHeight: '1.25',
    marginBottom: theme.spacing.unit / 2,
  },
  timestamp: {
    color: theme.palette.text.secondary,
  },
  listItemSecondary: {
    lineClamp: 2,
    display: 'box',
    boxOrient: 'vertical',
    overflow: 'hidden',
  },

  unread: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,
  },

  ctaButton: {
    marginTop: theme.spacing.unit / 2,
    marginLeft: -theme.spacing.unit * 2,
    '& svg': {
      margin: 0,
      marginLeft: theme.spacing.unit / 2,
      marginRight: -theme.spacing.unit / 2,
    },
  },
});

const ActivityItem = props => {
  const { classes, data, handleClick } = props;

  return (
    <ListItem
      classes={{
        root: classNames(
          classes.listItemRoot,
          !data.body && !data.cta && classes.listItemRootCentred
        ),
      }}
    >
      <Avatar>
        <ActivityIcon type={data.type} />
      </Avatar>
      <ListItemText
        primary={
          <Grid container justify="space-between" alignItems="baseline">
            <Grid item xs>
              <Typography variant="subtitle1" className={classes.activityTitle}>
                {data.title}
              </Typography>
            </Grid>
            <Grid>
              <Typography variant="body2" className={classes.timestamp}>
                {moment.unix(data.createdAt.seconds).fromNow()}
              </Typography>
            </Grid>
          </Grid>
        }
        secondary={
          data.body || data.cta ? (
            <>
              <Typography>{data.body}</Typography>
              {data.cta && data.cta.label && data.cta.route && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    handleClick(data.cta.route);
                  }}
                  className={classes.ctaButton}
                >
                  {data.cta.label}
                  <GoIcon />
                </Button>
              )}
            </>
          ) : null
        }
        classes={{
          root: classes.listItemTextRoot,
          secondary: classes.listItemSecondary,
        }}
        disableTypography
      />
    </ListItem>
  );
};

ActivityItem.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  handleClick: PropTypes.func,
};

export default withStyles(styles)(ActivityItem);
