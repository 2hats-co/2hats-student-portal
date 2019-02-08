import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import React, { useState, useEffect } from 'react';
import ArrowForwardIcon from '@material-ui/icons/ArrowForwardOutlined';
import CheckIcon from '@material-ui/icons/CheckOutlined';
import classNames from 'classnames';
import {
  COLLECTIONS,
  STYLES,
} from '@bit/sidney2hats.2hats.global.common-constants';
const styles = theme => ({
  ...STYLES.DETAIL_VIEW(theme),
});
const ApplyButton = props => {
  const { skillsNotAchieved } = props;
  return (
    <Tooltip
      title={
        skillsNotAchieved.length > 0
          ? `You need ${skillsNotAchieved.length} more of the required skills
              to apply`
          : null
      }
    >
      <div className={classNames(classes.section, classes.applyBigWrapper)}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.applyBig}
          onClick={showApply}
          disabled={skillsNotAchieved.length > 0 || !!data.jobId || loading}
        >
          {loading && (
            <CircularProgress className={classes.loading} size={48} />
          )}
          {data.jobId ? (
            <>
              Applied
              <CheckIcon />
            </>
          ) : (
            <>
              Apply
              <ArrowForwardIcon />
            </>
          )}
        </Button>
      </div>
    </Tooltip>
  );
};

export default ApplyButton;
