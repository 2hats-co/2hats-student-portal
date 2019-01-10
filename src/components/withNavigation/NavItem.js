import React from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  divider: {
    margin: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  listItemTextRoot: {
    padding: 0,
  },
  selected: {
    color: theme.palette.primary.main,
    boxShadow: `-4px 0 0 ${theme.palette.primary.main} inset`,
    '& *': { color: theme.palette.primary.main },
  },
});

function NavItem(props) {
  const { classes, data, selected, goTo } = props;

  switch (data.type) {
    case 'divider':
      return <Divider className={classes.divider} />;
    case 'link':
      return (
        <ListItem
          button
          component="a"
          href={data.href}
          target="_blank"
          rel="noopener noreferrer"
          className={selected ? classes.selected : ''}
        >
          <ListItemIcon>{data.icon}</ListItemIcon>
          <ListItemText
            primary={data.label}
            classes={{ root: classes.listItemTextRoot }}
          />
        </ListItem>
      );
    default:
      return (
        <ListItem
          button
          onClick={
            data.onClick
              ? data.onClick
              : () => {
                  goTo(data.route);
                }
          }
          className={selected ? classes.selected : ''}
        >
          <ListItemIcon>{data.icon}</ListItemIcon>
          <ListItemText
            primary={data.label}
            classes={{ root: classes.listItemTextRoot }}
          />
        </ListItem>
      );
  }
}

NavItem.propTypes = {
  classes: PropTypes.object,
  data: PropTypes.object.isRequired,
  selected: PropTypes.bool,
  goTo: PropTypes.func,
};

export default withStyles(styles)(NavItem);
