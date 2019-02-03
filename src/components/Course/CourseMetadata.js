import React from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import TimeIcon from '@material-ui/icons/AccessTimeOutlined';

import SkillItem from '../SkillItem';

const styles = theme => ({
  skill: { marginLeft: '0 !important' },

  timeWrapper: { marginTop: theme.spacing.unit * 1.5 },
  icon: {
    marginRight: theme.spacing.unit,
    opacity: 0.67,
  },
});

const AssessmentMetadata = props => {
  const { classes, className, style, data } = props;

  return (
    <div className={className} style={style}>
      {data.skillsAssociated.map(x => (
        <SkillItem key={x} value={x} small className={classes.skill} />
      ))}
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
  style: PropTypes.object,
  data: PropTypes.object.isRequired,
};

export default withStyles(styles)(AssessmentMetadata);
