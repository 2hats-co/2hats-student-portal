import React from 'react';
import PropTypes from 'prop-types';

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
import { ACTIVITY_LOG_LABELS } from '@bit/sidney2hats.2hats.global.common-constants';

const styles = theme => ({
  listItemRoot: {
    alignItems: 'flex-start',
    cursor: 'default',
    marginBottom: theme.spacing.unit,
  },

  listItemTextRoot: { paddingRight: 0 },
  activityTitle: {
    lineHeight: '1.25',
    marginBottom: theme.spacing.unit / 2,
  },
  timestamp: {
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 1.5,
  },
  activityLogLabel: { color: theme.palette.text.secondary },

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
    <ListItem classes={{ root: classes.listItemRoot }}>
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
          <>
            <Typography className={classes.activityLogLabel}>
              {data.body || ACTIVITY_LOG_LABELS[data.type]}
            </Typography>
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
        }
        classes={{ root: classes.listItemTextRoot }}
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
