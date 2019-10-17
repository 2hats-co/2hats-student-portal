import React from 'react';
import clsx from 'clsx';

import { makeStyles, createStyles, Typography } from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';

import PassIcon from '@material-ui/icons/CheckCircle';
import FailIcon from '@material-ui/icons/Error';

import { AssessmentFeedback } from '@bit/twohats.common.db-types';
import { useRenderedHtmlStyles } from '@bit/twohats.common.styles';

const useStyles = makeStyles(theme =>
  createStyles({
    root: { marginTop: theme.spacing(2) },

    icon: {
      display: 'inline-block',
      marginLeft: theme.spacing(-4),
      marginTop: theme.spacing(0.25),
      float: 'left',
    },

    feedbackTitle: { fontWeight: 500 },
  })
);

interface IAssessmentFeedbackItemProps {
  feedbackData: AssessmentFeedback;
}

/**
 * Component for each assessment feedback item to show a standard icon
 * and styling
 */
const AssessmentFeedbackItem: React.FunctionComponent<
  IAssessmentFeedbackItemProps
> = ({ feedbackData }) => {
  const classes = { ...useStyles(), ...useRenderedHtmlStyles({}) };

  return (
    <li className={classes.root}>
      {feedbackData.id &&
        (feedbackData.outcome === 'pass' ? (
          <PassIcon className={classes.icon} htmlColor={green[500]} />
        ) : (
          <FailIcon className={classes.icon} htmlColor={red[500]} />
        ))}
      {feedbackData.id && (
        <Typography
          variant="subtitle1"
          component="h3"
          className={classes.feedbackTitle}
        >
          {feedbackData.title}
        </Typography>
      )}
      <div
        className={classes.renderedHtml}
        dangerouslySetInnerHTML={{ __html: feedbackData.message }}
      />
    </li>
  );
};

export default AssessmentFeedbackItem;
