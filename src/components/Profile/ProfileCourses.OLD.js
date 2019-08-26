import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import clsx from 'clsx';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import PaddedIcon from '../PaddedIcon';
import CourseIcon from '@material-ui/icons/SchoolOutlined';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import SkillItem from '../SkillItem';

import { profileStyles } from '../../containers/ProfileContainer';
import * as ROUTES from '../../constants/routes';

const styles = theme => ({
  ...profileStyles(theme),

  skillsWrapper: { marginLeft: -theme.spacing(1) },
});

const ProfileCourses = props => {
  const { classes, data, isMobile, history } = props;

  return (
    <Grid
      container
      direction={isMobile ? 'column' : 'row'}
      className={classes.root}
      spacing={isMobile ? 1 : 3}
    >
      <Grid item>
        <PaddedIcon className={classes.paddedIcon}>
          <CourseIcon />
        </PaddedIcon>
      </Grid>
      <Grid item xs>
        <Typography
          variant="h5"
          className={clsx(classes.title, classes.titleWrapper)}
        >
          Your Courses
        </Typography>
        {data.length === 0 && (
          <>
            <Typography variant="body1" color="textSecondary">
              Courses you complete will appear here.
            </Typography>
            <Button
              color="primary"
              className={classes.browseButton}
              onClick={() => {
                history.push(ROUTES.COURSES);
              }}
            >
              Browse Courses
              <ArrowForwardIcon />
            </Button>
          </>
        )}
        {data.map(x => (
          <Grid container key={x.id} className={classes.item}>
            <Grid item>
              <CourseIcon className={classes.itemIcon} />
            </Grid>
            <Grid item xs>
              <Typography variant="subtitle1" className={classes.itemTitle}>
                {x.title}
                <Button
                  color="primary"
                  size="small"
                  className={classes.itemButton}
                  onClick={() => {
                    history.push(`${ROUTES.COURSE_REDIRECT}?id=${x.id}`);
                  }}
                >
                  View
                  <ArrowForwardIcon />
                </Button>
              </Typography>
              <Typography variant="body2">Skills related</Typography>
              <div className={classes.skillsWrapper}>
                {x.skillsAssociated.map(x => (
                  <SkillItem key={x} value={x} />
                ))}
              </div>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

ProfileCourses.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array,
  isMobile: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(ProfileCourses));
