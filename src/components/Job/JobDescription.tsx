import * as React from 'react';

import { makeStyles, createStyles, Typography } from '@material-ui/core';

import { DocWithId, JobsDoc, UsersJobsDoc } from '@bit/twohats.common.db-types';
import { RenderedHtmlStyles } from '@bit/twohats.common.styles';

const useStyles = makeStyles(theme =>
  createStyles({
    ...RenderedHtmlStyles(theme),

    section: { marginBottom: theme.spacing(4) },
  })
);

interface IJobDescriptionProps {
  jobData: DocWithId<JobsDoc> | DocWithId<UsersJobsDoc>;
}

/**
 * Pure display component to show company and job description
 */
const JobDescription: React.FunctionComponent<IJobDescriptionProps> = ({
  jobData,
}) => {
  const classes = useStyles();

  return (
    <>
      <section className={classes.section}>
        <Typography
          variant="overline"
          color="textSecondary"
          component="h2"
          gutterBottom
        >
          About the company
        </Typography>

        <div
          className={classes.renderedHtml}
          dangerouslySetInnerHTML={{ __html: jobData.companyDescription }}
        />
      </section>

      <section className={classes.section}>
        <Typography
          variant="overline"
          color="textSecondary"
          component="h2"
          gutterBottom
        >
          Job Description
        </Typography>

        <div
          className={classes.renderedHtml}
          dangerouslySetInnerHTML={{ __html: jobData.jobDescription }}
        />
      </section>
    </>
  );
};

export default JobDescription;
