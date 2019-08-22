import React, { useEffect } from 'react';
import { withRouter, RouteComponentProps, Redirect } from 'react-router-dom';
import queryString from 'query-string';

import { Container, Divider } from '@material-ui/core';

import JobHeader from './JobHeader';
import RequiredSkills from './RequiredSkills';
import ApplyButton from './ApplyButton';
import JobDescription from './JobDescription';
import JobRelated from './JobRelated';
import ApplicationDelight from './ApplicationDelight';
import JobApplication from './JobApplication';

import NakedExpansionPanel from '@bit/twohats.common.components.naked-expansion-panel';

import { DocWithId, JobsDoc, UsersJobsDoc } from '@bit/twohats.common.db-types';
import { getCanApply, getHasApplied } from 'utilities/jobs';
import { useUser } from 'contexts/UserContext';
import { JOB_APPLICATION } from 'constants/routes';
import { COLLECTIONS } from '@bit/twohats.common.constants';
import { createDocWithId } from 'utilities/firestore';

interface IJobProps extends RouteComponentProps {
  jobData: DocWithId<JobsDoc> | DocWithId<UsersJobsDoc>;
}

const Job: React.FunctionComponent<IJobProps> = ({ jobData, location }) => {
  const { user } = useUser();

  useEffect(() => {
    // Check if there is a referrer in the URL
    const parsedQuery = queryString.parse(location.search);
    if (parsedQuery.referrer)
      createDocWithId(
        `${COLLECTIONS.users}/${user.id}/${COLLECTIONS.jobReferrers}`,
        jobData.id, // jobReferrers doc ID will have same ID as job doc
        { referrerId: parsedQuery.referrer }
      );
  }, [jobData]);

  const canApply = getCanApply(user, jobData);
  // If the user is on the /apply route, verify they can apply first
  // If not, redirect them
  if (!canApply && location.pathname.endsWith(JOB_APPLICATION))
    return (
      <Redirect
        to={{
          ...location,
          pathname: location.pathname.replace(JOB_APPLICATION, ''),
        }}
      />
    );

  // Show a user delight screen if they’ve applied
  const hasApplied = getHasApplied(user, jobData);
  if (hasApplied)
    return (
      <main>
        <Container maxWidth="sm" component="article">
          <JobHeader jobData={jobData} />
          <ApplicationDelight />

          <Divider />

          <NakedExpansionPanel header="Job Details">
            <JobDescription jobData={jobData} />
          </NakedExpansionPanel>
        </Container>

        <JobRelated jobData={jobData} />
      </main>
    );

  // Show the job application form if they’re on this route
  if (location.pathname.endsWith(JOB_APPLICATION))
    return (
      <main>
        <Container maxWidth="sm" component="article">
          <JobHeader jobData={jobData} />
          <JobApplication jobData={jobData} />
        </Container>
      </main>
    );

  // Default state: user has not applied
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

export default withRouter(Job);
