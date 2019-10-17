import * as React from 'react';

import { makeStyles, createStyles } from '@material-ui/core';

import HeadingCaps from '@bit/twohats.common.components.heading-caps';
import { DocWithId, JobsDoc, UsersJobsDoc } from '@bit/twohats.common.db-types';
import { useRenderedHtmlStyles } from '@bit/twohats.common.styles';

const useStyles = makeStyles(theme =>
  createStyles({
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
  const classes = { ...useRenderedHtmlStyles({}), ...useStyles() };

  return (
    <>
      <section className={classes.section}>
        <HeadingCaps>About the company</HeadingCaps>

        <div
          className={classes.renderedHtml}
          dangerouslySetInnerHTML={{ __html: jobData.companyDescription }}
        />
      </section>

      <section className={classes.section}>
        <HeadingCaps>Job Description</HeadingCaps>

        <div
          className={classes.renderedHtml}
          dangerouslySetInnerHTML={{ __html: jobData.jobDescription }}
        />
      </section>
    </>
  );
};

export default JobDescription;
