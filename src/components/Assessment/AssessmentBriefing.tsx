import React, { useLayoutEffect, useRef } from 'react';
import clsx from 'clsx';

import { makeStyles, createStyles, Grid } from '@material-ui/core';
import { fade } from '@material-ui/core/styles';

import HeadingCaps from '@bit/twohats.common.components.heading-caps';
import HelpPopup from '@bit/twohats.common.components.help-popup';

import {
  DocWithId,
  AssessmentsDoc,
  UsersAssessmentsDoc,
} from '@bit/twohats.common.db-types';

import { RenderedHtmlStyles } from '@bit/twohats.common.styles';

const useStyles = makeStyles(theme =>
  createStyles({
    ...RenderedHtmlStyles(theme),

    section: { marginBottom: theme.spacing(4) },

    maskedSection: {
      maxHeight: 240,
      overflow: 'hidden',
      userSelect: 'none',

      position: 'relative',
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        content: '""',

        backgroundImage: `linear-gradient(to bottom, ${fade(
          theme.palette.background.default,
          0
        )} 50%, ${theme.palette.background.default})`,
      },
    },
    // Prettier instruction styles
    instructionList: {
      'ol&': {
        counterReset: 'list-instructions',
        listStyleType: 'none',
        padding: 0,

        // Margin and font style for all li
        '& li': {
          ...theme.typography.subtitle2,
          color: theme.palette.text.secondary,
          // Align with rest of instruction point
          marginLeft: 48,
        },

        // Only top-level li elements (no .ql-indent-* class)
        '& li:not([class])': {
          display: 'flex',
          alignItems: 'flex-start',
          padding: 0,
          marginTop: theme.spacing(4),
          marginLeft: 0,
          '&:first-of-type': { marginTop: theme.spacing(2) },

          '& > span': {
            minHeight: 48,
            display: 'flex',
            alignItems: 'center',
          },

          '&::before': {
            counterIncrement: 'list-instructions',
            content: 'counter(list-instructions, decimal)',

            whiteSpace: 'nowrap',
            display: 'flex',
            width: 48,
            height: 48,
            flexBasis: 48,
            flexShrink: 0,
            alignItems: 'center',
            justifyContent: 'center',

            marginLeft: 0,
            marginRight: theme.spacing(2),

            ...theme.typography.h5,

            backgroundColor: fade(theme.palette.primary.main, 0.5),
            color: theme.palette.primary.contrastText,
            borderRadius: '50%',
          },
        },
      },
    },
  })
);

interface IAssessmentBriefingProps {
  assessmentData: DocWithId<AssessmentsDoc> | DocWithId<UsersAssessmentsDoc>;
  /** Flag to show only part of instructions if true */
  previewInstructionsOnly?: boolean;
}

/**
 * Pure display component to show assessment briefing and instructions,
 * which can be masked with the previewInstructionsOnly prop
 */
const AssessmentBriefing: React.FunctionComponent<IAssessmentBriefingProps> = ({
  assessmentData,
  previewInstructionsOnly = false,
}) => {
  const classes = useStyles();

  const instructionsRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (
      !previewInstructionsOnly &&
      instructionsRef &&
      instructionsRef.current
    ) {
      console.log('scroll into view', instructionsRef.current);
      instructionsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [previewInstructionsOnly, instructionsRef]);

  /**
   * Returns either the assessment briefing or
   * companyDescription + jobDescription, separated by line break
   */
  let briefing = '';
  if ('briefing' in assessmentData) briefing = assessmentData.briefing;
  if (!briefing) {
    let output = [];
    if ('companyDescription' in assessmentData)
      output.push(assessmentData.companyDescription);
    if ('jobDescription' in assessmentData)
      output.push(assessmentData.jobDescription);
    briefing = output.join('<br />');
  }

  // Get task instructions
  let taskInstructions = assessmentData.taskInstructions;
  if (taskInstructions && taskInstructions.startsWith('<ol'))
    taskInstructions = taskInstructions
      // Add instructionList class to the first <ol> tag
      .replace('<ol', `<ol class="${classes.instructionList}"`)
      // Wrap contents of <li> in span for the flexbox <li>
      .replace(/<li>/gm, '<li><span>')
      .replace(/<\/li>/gm, '</span></li>');

  return (
    <>
      <section className={classes.section}>
        <Grid container alignItems="center">
          <HeadingCaps>Scenario: The Company</HeadingCaps>
          <HelpPopup
            variant="besideHeadingCaps"
            message="Use the following scenario as guidance on how to approach this assessment."
          />
        </Grid>

        <div
          className={classes.renderedHtml}
          dangerouslySetInnerHTML={{ __html: briefing }}
        />
      </section>

      <section
        className={clsx(
          classes.section,
          previewInstructionsOnly && classes.maskedSection
        )}
        ref={instructionsRef}
      >
        <HeadingCaps>
          Instructions{previewInstructionsOnly && ': ‘Begin’ to See More'}
        </HeadingCaps>

        <div
          className={classes.renderedHtml}
          dangerouslySetInnerHTML={{
            __html: taskInstructions,
          }}
        />
      </section>
    </>
  );
};

export default AssessmentBriefing;
