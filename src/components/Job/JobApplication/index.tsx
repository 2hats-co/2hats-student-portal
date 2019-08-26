import React, { useState } from 'react';

import { Typography, FormControlLabel, Checkbox } from '@material-ui/core';

import HeadingCaps from '@bit/twohats.common.components.heading-caps';
import ApplicationForm from './ApplicationForm';

import { DocWithId, JobsDoc, UsersJobsDoc } from '@bit/twohats.common.db-types';
import { convertToEnDash } from 'utilities';

interface IJobApplicationProps {
  jobData: DocWithId<JobsDoc> | DocWithId<UsersJobsDoc>;
}

/**
 * Wrapper component to hide `ApplicationForm` before user confirms their
 * availability and TFN/ABN. This prevents requesting the user’s Profile
 * document before it’s necessary.
 */
const JobApplication: React.FunctionComponent<IJobApplicationProps> = ({
  jobData,
}) => {
  const [confirmCommitment, setConfirmCommitment] = useState(false);
  const [confirmTfn, setConfirmTfn] = useState(false);

  return (
    <>
      <section>
        <HeadingCaps>We’re almost there</HeadingCaps>

        <Typography variant="body1" gutterBottom>
          We would like you to answer some questions about your application.
          These answers are <strong>application-specific</strong> and do not
          apply to your future applications.
        </Typography>
      </section>

      <section>
        <FormControlLabel
          control={
            <Checkbox
              checked={confirmCommitment}
              onChange={e => setConfirmCommitment(e.target.checked)}
              value="confirmCommitment"
              color="primary"
            />
          }
          label={`I can commit to ${convertToEnDash(jobData.commitment)} ${
            jobData.commitmentUnits
          } as stated above.`}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={confirmTfn}
              onChange={e => setConfirmTfn(e.target.checked)}
              value="confirmTfn"
              color="primary"
            />
          }
          label="I have a TFN / ABN at the moment."
        />
      </section>

      {confirmCommitment && confirmTfn && <ApplicationForm jobData={jobData} />}
    </>
  );
};

export default JobApplication;
