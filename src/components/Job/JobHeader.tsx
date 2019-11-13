import React from 'react';
import moment from 'moment';

import { makeStyles, createStyles, Grid, Typography } from '@material-ui/core';

import CardIcon from 'components/OneCardTwo/CardIcon';
import StatusChip from 'components/OneCardTwo/StatusChip';

import { getIndustry } from 'utilities/cards';
import { getJobAvailability } from 'utilities/jobs';
import { DocWithId, JobsDoc, UsersJobsDoc } from '@bit/twohats.common.db-types';
import { convertToEnDash } from 'utilities';

const useStyles = makeStyles(theme =>
  createStyles({
    jobLogo: {
      width: 80,
      height: 80,
      marginRight: theme.spacing(4),

      [theme.breakpoints.down('xs')]: {
        width: 64,
        height: 64,
        marginRight: theme.spacing(2),
      },
    },
    jobTitle: { marginBottom: theme.spacing(1) },

    section: { marginBottom: theme.spacing(4) },

    industryIcon: {
      margin: theme.spacing(-1.5),
      marginRight: theme.spacing(0),
      marginTop: theme.spacing(-1.75),
    },

    overline: { marginTop: theme.spacing(0.5) },
  })
);

interface IJobHeaderProps {
  jobData: DocWithId<JobsDoc> | DocWithId<UsersJobsDoc>;
}

/**
 * Pure display component to show job logo, title,
 * industry, commitment, pay rate, and status.
 */
const JobHeader: React.FunctionComponent<IJobHeaderProps> = ({ jobData }) => {
  const classes = useStyles();

  // Get difference between today and closingDate
  const { jobClosed, diffDays } = getJobAvailability(jobData);

  // TODO: Remove this workaround when bit dbTypes are fixed
  const _jobData = jobData as { [key: string]: any };

  return (
    <>
      <Grid
        container
        alignItems="center"
        component="section"
        className={classes.section}
      >
        {jobData.image && (
          <Grid item>
            <CardIcon
              className={classes.jobLogo}
              icon={jobData.image.url}
              alt={jobData.companyName}
            />
          </Grid>
        )}

        <Grid item xs>
          <Typography variant="h5" component="h1" className={classes.jobTitle}>
            {jobData.title}
          </Typography>

          <Grid container alignItems="center">
            <CardIcon
              className={classes.industryIcon}
              industry={jobData.industry}
              icon="industry"
            />
            <Typography variant="overline" color="textSecondary">
              {getIndustry(jobData.industry)}&nbsp;•&nbsp;
              {moment(jobData.closingDate.toDate()).format('D MMM')}
              &nbsp;•&nbsp;
              {_jobData.location && _jobData.location.city}
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <section className={classes.section}>
        <Grid container alignItems="flex-end" spacing={3}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h5" component="div">
              {convertToEnDash(jobData.commitment)}
            </Typography>

            <Typography
              variant="overline"
              color="textSecondary"
              component="div"
              className={classes.overline}
            >
              {jobData.commitmentUnits}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="h5" component="div">
              ${convertToEnDash(jobData.payRate)}
            </Typography>

            <Typography
              variant="overline"
              color="textSecondary"
              component="div"
              className={classes.overline}
            >
              Pay ({jobData.payUnits})
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="h5" component="div">
              <StatusChip
                label={
                  jobClosed
                    ? 'Closed'
                    : diffDays === 0
                    ? 'Last day'
                    : `${diffDays} day${diffDays !== 1 ? 's' : ''}`
                }
                variant={jobClosed ? 'closed' : diffDays <= 3 ? 'fail' : 'new'}
              />
            </Typography>

            <Typography
              variant="overline"
              color="textSecondary"
              component="div"
              className={classes.overline}
            >
              {!jobClosed ? 'Left to apply' : '\u00A0'}
            </Typography>
          </Grid>
        </Grid>
      </section>
    </>
  );
};

export default JobHeader;
