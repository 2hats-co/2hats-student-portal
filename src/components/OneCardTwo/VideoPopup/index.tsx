import React, { useState, useEffect } from 'react';

import {
  makeStyles,
  createStyles,
  ButtonBase,
  Dialog,
  Slide,
} from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';

import PlayIcon from '@material-ui/icons/PlayCircleFilled';

import { MEDIA_HEIGHT } from 'constants/cards';
import PopupContents from './PopupContents';

const useStyles = makeStyles(theme =>
  createStyles({
    preview: {
      width: '100%',
      height: MEDIA_HEIGHT,
      position: 'relative',

      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',

      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',

      // Dark theme
      opacity: theme.palette.type === 'dark' ? 0.75 : 1,

      '&::before': {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,

        backgroundColor: 'rgba(0, 0, 0, 0.25)',

        content: '""',
        display: 'block',
      },
    },
    playButton: {
      color: theme.palette.common.white,
      fontSize: theme.spacing(8),
      zIndex: 0,
    },

    backdrop: {
      backgroundColor: 'rgba(0, 0, 0, 0.67)',
      '-webkit-backdrop-filter': 'saturate(180%) blur(20px)',
      backdropFilter: 'saturate(180%) blur(20px)',
    },
    paper: {
      color: theme.palette.common.white,

      maxWidth: `${theme.breakpoints.values.sm}px !important`,
      width: '100%',

      margin: 0,
      padding: theme.spacing(1),
      boxSizing: 'border-box',

      userSelect: 'none',
    },
  })
);

const Transition = React.forwardRef<unknown, TransitionProps>(
  function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  }
);

export interface VideoPopupProps {
  /** Video embed URL */
  src: string;
  /** Used by `PopupContents` */
  title: React.ReactNode;
  /** Used by `PopupContents` */
  route: string;
  /** Used by `PopupContents` */
  action: React.ReactNode;
}

/**
 * Displays preview image using video thumbnail. Similar behaviour as
 * `CardImage`. Will get thumbnail URL by manipulating YouTube embed URL or
 * querying Vimeo API.
 *
 * Uses MUI [`Dialog`](https://material-ui.com/components/dialogs/) to display
 * and play only one video at a time. It will also not load the video embed
 * until the user has clicked on a preview image.
 */
const VideoPopup: React.FC<VideoPopupProps> = props => {
  const { src } = props;

  const [modalOpen, setModalOpen] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const classes = useStyles();

  const getThumbnail = async () => {
    if (src.indexOf('youtube') > -1) {
      setThumbnailUrl(
        `https://img.youtube.com/vi/${src.replace(
          'https://www.youtube.com/embed/',
          ''
        )}/maxresdefault.jpg`
      );
    } else if (src.indexOf('vimeo') > -1) {
      const response = await fetch(
        `https://vimeo.com/api/v2/video/${src.replace(
          'https://player.vimeo.com/video/',
          ''
        )}.json`
      );
      const result = await response.json();
      setThumbnailUrl(result[0].thumbnail_large);
    }
  };

  useEffect(() => {
    if (!thumbnailUrl) getThumbnail();
  });

  return (
    <>
      <ButtonBase
        className={classes.preview}
        onClick={() => setModalOpen(true)}
        style={{ backgroundImage: `url(${thumbnailUrl})` }}
        aria-label="Play preview video"
      >
        <PlayIcon className={classes.playButton} />
      </ButtonBase>

      {/* Use Dialog to show video */}
      <Dialog
        open={modalOpen}
        TransitionComponent={Transition}
        onClose={() => setModalOpen(false)}
        //PaperComponent="div"
        classes={{ paper: classes.paper }}
        BackdropProps={{ classes: { root: classes.backdrop } }}
        scroll="body"
        transitionDuration={{ enter: 800, exit: 600 }}
      >
        <PopupContents {...props} setModalOpen={setModalOpen} />
      </Dialog>
    </>
  );
};

export default VideoPopup;
