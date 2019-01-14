import React from 'react';
import PropTypes from 'prop-types';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

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
          id={data.label.split(' ')[0]}
          href={data.href}
          target="_blank"
          rel="noopener noreferrer"
          classes={{ root: classes.listItemRoot }}
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
          id={data.label.replace(/ /g, '').toLowerCase()}
          onClick={
            data.onClick
              ? data.onClick
              : () => {
                  goTo(data.route);
                }
          }
          classes={{ root: classes.listItemRoot }}
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
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  selected: PropTypes.bool,
  goTo: PropTypes.func,
};

export default NavItem;
