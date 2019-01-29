import React from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import IndustryIcon from '@material-ui/icons/BusinessRounded';
import TimeIcon from '@material-ui/icons/AccessTimeRounded';

import SkillItem from '../SkillItem';
import { getAssessmentCategoryLabel } from '@bit/sidney2hats.2hats.global.common-constants';

const styles = theme => ({
  industryWrapper: { marginTop: theme.spacing.unit },
  timeWrapper: { marginTop: theme.spacing.unit / 2 },
  icon: {
    marginLeft: theme.spacing.unit * 1.5,
    marginRight: theme.spacing.unit * 2.5,
    opacity: 0.67,
  },
});

const AssessmentMetadata = props => {
  const { classes, className, data } = props;

  return (
    <div className={className}>
      <SkillItem value={data.skillAssociated} />
      <Grid container alignItems="flex-end" className={classes.industryWrapper}>
        <IndustryIcon className={classes.icon} />
        <Typography variant="body1">
          {getAssessmentCategoryLabel(data.category)}
        </Typography>
      </Grid>
      <Grid container alignItems="flex-end" className={classes.timeWrapper}>
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
