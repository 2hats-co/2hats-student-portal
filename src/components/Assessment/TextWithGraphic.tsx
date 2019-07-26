import React from 'react';
import { Link } from 'react-router-dom';

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
  /** Message to display */
  message?: React.ReactNode;
  /** Link to which the CTA button points */
  buttonRoute?: string;
  /** CTA button label */
  buttonLabel?: React.ReactNode;
  /** Optionally, override the icon */
  buttonIcon?: React.ReactNode;
}

const TextWithGraphic: React.FunctionComponent<ITextWithGraphicProps> = ({
  graphic,
  graphicWidth,
  graphicHeight,
  message,
  buttonRoute,
  buttonLabel,
  buttonIcon,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img
        src={graphic}
        alt="2hats graphic"
        className={classes.graphic}
        width={graphicWidth}
        height={graphicHeight}
      />
      <Typography variant="h6" color="textSecondary">
        {message}
      </Typography>
      {buttonRoute && buttonLabel && (
        <Button
          color="primary"
          variant="contained"
          size="large"
          className={classes.button}
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
