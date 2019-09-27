import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

import {
  makeStyles,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { fade } from '@material-ui/core/styles';

import SidebarDivider from './SidebarDivider';
import { getBaseRoute } from 'utilities/routing';

const useStyles = makeStyles(theme => ({
  listItemRoot: {
    borderRadius: '0 100px 100px 0',

    margin: theme.spacing(0.5, 0),
    width: 'auto',

    paddingLeft: theme.spacing(2.5),

    '&$selected': {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.main, // Orange ripple colour
      '&:hover': { backgroundColor: theme.palette.primary.light },

      '& .nav-sidebar-avatar': {
        // Optical adjustment to stop initials-containing Avatar from
        // overpowering other icons since it’s larger than them
        backgroundColor: fade(theme.palette.primary.main, 0.87),
      },
      '& $listItemIconRoot': { color: theme.palette.primary.main },
    },
  },

  listItemIconRoot: { color: theme.palette.text.secondary },

  selected: {},
}));

/**
 * Renders an MUI `ListItem` that either links internally (`component={Link}`)
 * or externally (`component="a"`) or a `SidebarDivider`, depending on props.
 */
const SidebarItem = ({ location, data }) => {
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
      component: Link,
      to: data.route,
      selected: getBaseRoute(location.pathname) === data.route,
    };

  return (
    <ListItem
      button
      id={`sidebar-${data.label.replace(/ /g, '').toLowerCase()}`}
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
          color: listItemProps.selected ? 'primary' : 'textSecondary',
        }}
      />
    </ListItem>
  );
};

SidebarItem.propTypes = {
  /**
   * | Key      | Type                |
   * | -------- | ------------------- |
   * | type     | 'link' or 'divider' |
   * | href     | External URL        |
   * | route    | Internal route      |
   * | label    | string              |
   * | disabled | bool                |
   * | icon     | Node                |
   */
  data: PropTypes.object.isRequired,
  /** From withRouter */
  location: PropTypes.object.isRequired,
};

export default withRouter(SidebarItem);
