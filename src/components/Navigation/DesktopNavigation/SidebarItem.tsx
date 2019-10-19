import React from 'react';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';

import {
  makeStyles,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { ListItemIconProps } from '@material-ui/core/ListItemIcon';
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

export interface ISidebarItemProps {
  /** Display either an internal route, external link, or divider */
  type?: undefined | 'link' | 'divider';
  /** External link, if `type` is `'link'` */
  href?: string;
  /** Internal route, if `type` is `undefined` */
  route?: string;
  /** Display label. Not required if `type` is `'divider` */
  label?: string;
  /** Icon displayed. Not required if `type` is `'divider` */
  icon?: ListItemIconProps['children'];
  /** Disable the route */
  disabled?: boolean;
}

/**
 * Renders an MUI `ListItem` that either links internally (`component={Link}`)
 * or externally (`component="a"`) or a `SidebarDivider`, depending on props.
 */
const SidebarItem: React.FunctionComponent<
  ISidebarItemProps & RouteComponentProps
> = ({ location, type, href, route, label, icon, disabled }) => {
  const classes = useStyles();

  if (type === 'divider') return <SidebarDivider />;

  // Had to convert to ternary operator for TS type checking
  let listItemProps =
    type === 'link'
      ? {
          component: 'a',
          href: href,
          target: '_blank',
          rel: 'noopener noreferrer',
        }
      : {
          component: Link,
          to: route,
          selected: getBaseRoute(location.pathname) === route,
        };

  return (
    <ListItem
      button
      id={label ? `sidebar-${label.replace(/ /g, '').toLowerCase()}` : ''}
      {...listItemProps}
      classes={{ root: classes.listItemRoot, selected: classes.selected }}
      disabled={disabled}
    >
      {icon && (
        <ListItemIcon classes={{ root: classes.listItemIconRoot }}>
          {icon}
        </ListItemIcon>
      )}
      <ListItemText
        primary={label}
        primaryTypographyProps={{
          variant: 'button',
          color: listItemProps.selected ? 'primary' : 'textSecondary',
        }}
      />
    </ListItem>
  );
};

export default withRouter(SidebarItem);
