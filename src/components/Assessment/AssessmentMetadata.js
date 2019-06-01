import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import IndustryIcon from '@material-ui/icons/BusinessOutlined';
import TimeIcon from '@material-ui/icons/AccessTimeOutlined';

import { getAssessmentCategoryLabel } from '@bit/sidney2hats.2hats.global.common-constants';

const styles = theme => ({
  root: { textAlign: 'center' },

  metaWrapper: {
    display: 'inline-flex',
    width: 'auto',
    '& + &': { marginLeft: theme.spacing(2) },
  },
  icon: {
    marginRight: theme.spacing(1),
    opacity: 0.67,
  },
});

const AssessmentMetadata = props => {
  const { classes, className, data } = props;

  return (
    <div className={classNames(classes.root, className)}>
      <Grid container alignItems="flex-end" className={classes.metaWrapper}>
        <IndustryIcon className={classes.icon} />
        <Typography variant="body1">
          {getAssessmentCategoryLabel(data.category)}
        </Typography>
      </Grid>

      <Grid container alignItems="flex-end" className={classes.metaWrapper}>
        <TimeIcon className={classes.icon} />
        <Typography variant="body1">{data.duration}</Typography>
      </Grid>
    </div>
  );
};

AssessmentMetadata.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  data: PropTypes.object.isRequired,
};

export default withStyles(styles)(AssessmentMetadata);
