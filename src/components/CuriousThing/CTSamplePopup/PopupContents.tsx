import React, { useRef, useState, useEffect } from 'react';

import {
  makeStyles,
  createStyles,
  useScrollTrigger,
  Slide,
  Grid,
  DialogTitle,
  IconButton,
  DialogContent,
  Button,
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import DownIcon from '@material-ui/icons/ExpandMore';

import CTResult from '../CTResult';
import sampleData from './sampleData.json';
import { useUser } from 'contexts/UserContext';

const useStyles = makeStyles(theme =>
  createStyles({
    dialogTitleGrid: {
      paddingRight: theme.spacing(1),
    },

    dialogContent: { padding: theme.spacing(3) },

    scrollIndicatorContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,

      width: '100%',
      padding: theme.spacing(3, 0),

      background: `linear-gradient(to top, ${
        theme.palette.background.paper
      } 25%, transparent)`,
    },
    scrollIndicatorButton: { padding: theme.spacing(0.5, 2) },
  })
);

interface IPopupContentsProps {
  /** Closes the dialog */
  handleClose: () => void;
}

/**
 * The contents of the popup modal. Separated from main component for
 * [https://v4-3-3.material-ui.com/components/modal/#performance](performance).
 *
 * Displays a scroll indicator button to get the user to scroll down for more.
 *
 * Also, fixes `useScrollTrigger` and `scrollable` not updating for new window
 * dimensions when they change, because this entire component gets
 * unmounted and remounted.
 */
const PopupContents: React.FunctionComponent<IPopupContentsProps> = ({
  handleClose,
}) => {
  const classes = useStyles();
  // Get a firebase timestamp from the user document
  const { user } = useUser();
  // Get the DOM node of the `DialogContent` elem
  const dialogContentRef = useRef<HTMLDivElement>(null);

  // Store scrolled down once state here
  const [scrolledDownOnce, setScrolledDownOnce] = useState(false);
  // MUI Hook to see if user scrolled down
  const triggerScrolledDown = useScrollTrigger({
    disableHysteresis: true,
    threshold: 24,
    target: dialogContentRef.current || undefined,
  });
  if (triggerScrolledDown && !scrolledDownOnce) setScrolledDownOnce(true);

  // Check if the dialog contents are scrollable so we can show/hide
  // the scroll indicator if not necessary
  const [scrollable, setScrollable] = useState(false);
  useEffect(() => {
    if (!dialogContentRef.current) return;
    const el = dialogContentRef.current;
    setScrollable(el.scrollTop !== el.scrollHeight - el.offsetHeight);
  }, [dialogContentRef.current]);

  // Click handler for scroll indicator button
  const clickScrollDown = () => {
    if (dialogContentRef && dialogContentRef.current)
      dialogContentRef.current.scroll({
        top: 300,
        left: 0,
        behavior: 'smooth',
      });
  };

  return (
    <>
      <Grid container alignItems="center" className={classes.dialogTitleGrid}>
        <Grid item xs>
          <DialogTitle id="simple-dialog-title">
            Here’s how your results will look
          </DialogTitle>
        </Grid>

        <Grid item>
          <IconButton aria-label="Close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Grid>
      </Grid>

      <DialogContent
        className={classes.dialogContent}
        ref={dialogContentRef}
        dividers={triggerScrolledDown}
      >
        <CTResult
          sample
          resultData={{
            ...sampleData,
            reportUrl: '',
            timestamp: user!.createdAt, // Use this as sample firebase timestamp
          }}
        />
      </DialogContent>

      <Slide
        in={scrollable && !scrolledDownOnce}
        direction="up"
        mountOnEnter
        unmountOnExit
      >
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.scrollIndicatorContainer}
        >
          <Button
            size="small"
            color="primary"
            variant="contained"
            className={classes.scrollIndicatorButton}
            onClick={clickScrollDown}
            endIcon={<DownIcon />}
          >
            Scroll for more
          </Button>
        </Grid>
      </Slide>
    </>
  );
};

export default PopupContents;
