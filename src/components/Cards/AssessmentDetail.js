import React from 'react';
import classNames from 'classnames';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import TimeIcon from '@material-ui/icons/AccessTimeOutlined';

import IndustryLabel from './IndustryLabel';
import { STYLES } from '@bit/sidney2hats.2hats.global.common-constants';

const styles = theme => ({
  ...STYLES.RENDERED_HTML(theme),

  timeWrapper: {
    marginTop: -theme.spacing.unit,
    marginBottom: theme.spacing.unit * 1.5,
    width: 'auto',
  },
  timeIcon: {
    marginRight: theme.spacing.unit / 2,
    color: theme.palette.text.secondary,
  },

  description: {
    ...theme.typography.body2,

    lineClamp: 4,
    display: 'box',
    boxOrient: 'vertical',
    overflow: 'hidden',

    color: theme.palette.text.secondary,
  },
});

const AssessmentDetail = ({ classes, data }) => (
  <>
    <IndustryLabel value={data.category} />

    <Grid container alignItems="flex-end" className={classes.timeWrapper}>
      <TimeIcon className={classes.timeIcon} />
      <Typography variant="body1">{data.duration}</Typography>
    </Grid>

    <div
      className={classNames(classes.renderedHtml, classes.description)}
      dangerouslySetInnerHTML={{
        __html: `${data.jobDescription.substr(0, 140)}${
          data.jobDescription.length > 140 ? '…' : ''
        }`,
      }}
    />
  </>
);

export default withStyles(styles)(AssessmentDetail);
