import React from 'react';
import clsx from 'clsx';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  root: {
    userSelect: 'none',
    width: '1em',
    height: '1em',
    display: 'inline-block',
    fill: 'currentColor',
    flexShrink: 0,
    fontSize: 24,
    transition: theme.transitions.create('fill', {
      duration: theme.transitions.duration.shorter,
    }),
  },
});

const Skill = props => (
  <svg
    className={clsx(props.classes.root, props.className)}
    focusable="false"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path fill="none" d="M0 0h24v24H0V0z" />
    <polygon points="23 12 20.56 9.22 20.9 5.54 17.29 4.72 15.4 1.54 12 3 8.6 1.54 6.71 4.72 3.1 5.53 3.44 9.21 1 12 3.44 14.78 3.1 18.47 6.71 19.29 8.6 22.47 12 21 15.4 22.46 17.29 19.28 20.9 18.46 20.56 14.78" />
  </svg>
);

export default withStyles(styles)(Skill);
