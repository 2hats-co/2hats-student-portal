import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

import {
  makeStyles,
  createStyles,
  Typography,
  IconButton,
  Button,
} from '@material-ui/core';

import GoIcon from '@material-ui/icons/KeyboardArrowRight';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme =>
  createStyles({
    closeButton: {
      marginBottom: theme.spacing(1),
      display: 'block',
    },
    video: {
      width: '100%',
      height: 0,
      position: 'relative',
      paddingBottom: '56.25%',
      backgroundColor: theme.palette.common.black,
      marginBottom: theme.spacing(4),
    },
    iframe: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    },
    title: {
      marginBottom: theme.spacing(2),
    },
    actionButton: {
      marginBottom: theme.spacing(1),
      '& svg': { marginLeft: theme.spacing(0.25) },
    },
  })
);

export interface PopupContentsProps {
  src: string;
  title: React.ReactNode;
  route: LinkProps['to'];
  action: React.ReactNode;
  /** From `useState` call in `VideoPopup`. Used to close the modal. */
  setModalOpen: (state: boolean) => void;
}

/**
 * Contents of the video popup modal.
 *
 * Receives same props as [`VideoPopup`](#videopopup).
 * Broken out of `VideoPopup` for
 * [performance reasons](https://material-ui.com/components/modal/#performance).
 */
const PopupContents: React.FC<PopupContentsProps> = ({
  src,
  title,
  route,
  action,
  setModalOpen,
}) => {
  const classes = useStyles();

  return (
    <>
      <IconButton
        onClick={() => setModalOpen(false)}
        color="inherit"
        className={classes.closeButton}
      >
        <CloseIcon />
      </IconButton>

      <div className={classes.video}>
        <iframe
          src={src + '?autoplay=1'}
          className={classes.iframe}
          title={title + ' video'}
          frameBorder="none"
          allow="accelerometer; encrypted-media; picture-in-picture; autoplay"
          allowFullScreen
        />
      </div>

      <Typography variant="overline" color="inherit">
        2hats Course
      </Typography>
      <Typography variant="h4" color="inherit" className={classes.title}>
        {title}
      </Typography>

      <Button
        variant="contained"
        color="primary"
        component={Link}
        to={route}
        className={classes.actionButton}
        size="large"
      >
        {action}
        <GoIcon />
      </Button>
    </>
  );
};

export default PopupContents;
