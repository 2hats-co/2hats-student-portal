import React from 'react';

import { makeStyles, createStyles, Container } from '@material-ui/core';

import JobHeader from './JobHeader';
import RequiredSkills from './RequiredSkills';
import ApplyButton from './ApplyButton';
import JobDescription from './JobDescription';
import JobRelated from './JobRelated';

import { DocWithId, JobsDoc, UsersJobsDoc } from '@bit/twohats.common.db-types';

interface IJobProps {
  jobData: DocWithId<JobsDoc> | DocWithId<UsersJobsDoc>;
}

const Job: React.FunctionComponent<IJobProps> = ({ jobData }) => {
  return (
    <main>
      <Container maxWidth="sm" component="article">
        <JobHeader jobData={jobData} />
        <RequiredSkills
          skillsRequired={jobData.skillsRequired}
          routeState={{
            title: jobData.title,
            companyName: jobData.companyName,
            skillsRequired: jobData.skillsRequired,
          }}
        />
        <ApplyButton jobData={jobData} />
        <JobDescription jobData={jobData} />
        <ApplyButton jobData={jobData} />
      </Container>

      <JobRelated jobData={jobData} />
    </main>
  );
};

export default Job;
