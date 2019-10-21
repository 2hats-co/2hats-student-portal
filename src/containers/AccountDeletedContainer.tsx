import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import {
  makeStyles,
  createStyles,
  Container,
} from '@material-ui/core';

import RightButtonLayout from 'components/Profile/RightButtonLayout';
import GoIcon from '@bit/twohats.common.icons.go';

import { IS_MOBILE_QUERY } from 'constants/layout';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      paddingTop: theme.spacing(4),
      [IS_MOBILE_QUERY]: { paddingTop: 0 },

      '& section': { marginBottom: theme.spacing(8) },
    },

    nobr: { whiteSpace: 'nowrap' },
  })
);


const AccountDeletedContainer: React.FunctionComponent<RouteComponentProps> = ({
  history,
}) => {
  const classes = useStyles();


  return (
    <Container maxWidth="sm" component="main" className={classes.root}>
      <section>
        <RightButtonLayout
          title={
            <>
              Sorry to See You Go <span className={classes.nobr}>:(</span>
            </>
          }
          buttonLabel="Save My Account"
          ButtonProps={{
            endIcon: <GoIcon animated />,
          }}
          description={
            <>
              We are in the process of removing your personal information,
              résumé, and portfolio from our database.
              <br />
              <br />
              You <Countdown userDeleteRequestDoc={userDeleteRequestDoc} />{' '}
              cancel your account deletion request by clicking “Save My Account”
              above.
              <br />
              <br />
              We hope to see you again and wish you luck!
            </>
          }
        />
      </section>
    </Container>
  );
};

export default withRouter(AccountDeletedContainer);
