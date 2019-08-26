import React from 'react';

import {
  makeStyles,
  createStyles,
  Grid,
  Typography,
  Button,
} from '@material-ui/core';
import HeadingCaps, {
  IHeadingCapsProps,
} from '@bit/twohats.common.components.heading-caps';
import GoIcon from '@bit/twohats.common.icons.go';

const useStyles = makeStyles(theme =>
  createStyles({
    button: { marginRight: theme.spacing(-1) },
  })
);

interface IRightButtonLayoutProps {
  className?: string;
  title: React.ReactNode;
  buttonLabel: React.ReactNode;
  description?: React.ReactNode;

  HeadingCapsProps?: Partial<IHeadingCapsProps>;
  ButtonProps?: Partial<typeof Button>;
}

const RightButtonLayout: React.FunctionComponent<IRightButtonLayoutProps> = ({
  className,
  title,
  buttonLabel,
  description,
  HeadingCapsProps,
  ButtonProps,
}) => {
  const classes = useStyles();

  return (
    <>
      <Grid
        container
        justify="space-between"
        alignItems="baseline"
        className={className}
      >
        <HeadingCaps {...HeadingCapsProps}>{title}</HeadingCaps>

        <Button color="primary" className={classes.button} {...ButtonProps}>
          {buttonLabel}
          <GoIcon />
        </Button>
      </Grid>

      {description && (
        <Typography variant="body1" color="textSecondary" gutterBottom>
          {description}
        </Typography>
      )}
    </>
  );
};

export default RightButtonLayout;
