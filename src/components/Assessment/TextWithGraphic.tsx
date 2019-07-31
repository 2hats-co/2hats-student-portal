import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import {
  makeStyles,
  createStyles,
  Typography,
  Button,
} from '@material-ui/core';
import GoIcon from '../../assets/icons/Go';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      textAlign: 'center',
      padding: theme.spacing(2),
      userSelect: 'none',
    },

    graphic: {
      userSelect: 'none',
      userDrag: 'none',
      marginBottom: theme.spacing(1),
    },

    button: { margin: theme.spacing(4) },
  })
);

interface ITextWithGraphicProps {
  /** URL of the graphic to show */
  graphic?: string;
  /** Optionally, specify the width of the graphic */
  graphicWidth?: number | string;
  /** Optionally, specify the height of the graphic */
  graphicHeight?: number | string;
  /** Header to display above the graphic */
  header?: React.ReactNode;
  /** Message to display */
  message?: React.ReactNode;
  /** Link to which the CTA button points */
  buttonRoute?: string;
  /** CTA button label */
  buttonLabel?: React.ReactNode;
  /** Optionally, override the icon */
  buttonIcon?: React.ReactNode;
  /** Optional classes overrides */
  classes?: {
    root?: string;
    graphic?: string;
    button?: string;
  };
}

const TextWithGraphic: React.FunctionComponent<ITextWithGraphicProps> = ({
  graphic,
  graphicWidth,
  graphicHeight,
  header,
  message,
  buttonRoute,
  buttonLabel,
  buttonIcon,
  classes = {},
}) => {
  const defaultClasses = useStyles();

  return (
    <div className={clsx(defaultClasses.root, classes.root)}>
      <Typography variant="h6" component="h1" color="primary" gutterBottom>
        {header}
      </Typography>
      <img
        src={graphic}
        alt="2hats graphic"
        className={clsx(defaultClasses.graphic, classes.graphic)}
        width={graphicWidth}
        height={graphicHeight}
      />
      <Typography variant="h6" component="p" color="textSecondary">
        {message}
      </Typography>
      {buttonRoute && buttonLabel && (
        <Button
          color="primary"
          variant="contained"
          size="large"
          className={clsx(defaultClasses.button, classes.button)}
          component={Link}
          to={buttonRoute}
        >
          {buttonLabel}
          {buttonIcon || <GoIcon />}
        </Button>
      )}
    </div>
  );
};

export default TextWithGraphic;
