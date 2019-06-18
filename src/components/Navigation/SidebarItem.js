import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/styles';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

import SidebarDivider from './SidebarDivider';

const useStyles = makeStyles(theme => ({
  listItemRoot: {
    transition: theme.transitions.create(['background-color', 'color']),
    borderRadius: '0 100px 100px 0',

    margin: theme.spacing(0.5, 0),
    marginRight: theme.spacing(1),
    width: 'auto',

    '&$selected': {
      color: theme.palette.primary.darkText,
      backgroundColor: theme.palette.primary.light,

      '&:hover': { backgroundColor: theme.palette.primary.light },
      '& *': { color: theme.palette.primary.main },
    },
  },
  listItemIconRoot: { minWidth: theme.spacing(3 + 2) },

  selected: {},
}));

const isActiveItem = route => (match, location) => {
  if (match) return true;

  if (route === '/courses' && location.pathname === '/courseRedirect')
    return true;

  return route === location.pathname + 's';
};

const SidebarItem = ({ data }) => {
  const classes = useStyles();

  if (data.type === 'divider') return <SidebarDivider />;

  let listItemProps = {};

  if (data.type === 'link')
    listItemProps = {
      component: 'a',
      href: data.href,
      target: '_blank',
      rel: 'noopener noreferrer',
    };
  else
    listItemProps = {
      component: NavLink,
      to: data.route,
      activeClassName: classes.selected,
      isActive: isActiveItem(data.route),
    };

  return (
    <ListItem
      button
      id={data.label.replace(/ /g, '').toLowerCase()}
      {...listItemProps}
      classes={{ root: classes.listItemRoot, selected: classes.selected }}
      disabled={data.disabled}
    >
      <ListItemIcon classes={{ root: classes.listItemIconRoot }}>
        {data.icon}
      </ListItemIcon>
      <ListItemText
        primary={data.label}
        primaryTypographyProps={{
          variant: 'button',
          color: 'textSecondary',
        }}
      />
    </ListItem>
  );
};

SidebarItem.propTypes = {
  data: PropTypes.object.isRequired,
};

export default SidebarItem;
