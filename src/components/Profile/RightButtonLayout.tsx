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
    button: {
      marginTop: theme.spacing(-0.5),
      marginRight: theme.spacing(-1),
    },
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
      <Grid container alignItems="center" className={className} spacing={1}>
        <Grid item xs>
          <HeadingCaps {...HeadingCapsProps}>{title}</HeadingCaps>
        </Grid>

        <Grid item>
          <Button
            color="primary"
            className={classes.button}
            endIcon={<GoIcon />}
            {...ButtonProps}
          >
            {buttonLabel}
          </Button>
        </Grid>
      </Grid>

      {description && (
        <Typography variant="body1" color="textSecondary" paragraph>
          {description}
        </Typography>
      )}
    </>
  );
};

export default RightButtonLayout;
