import React from 'react';
import clsx from 'clsx';

import { makeStyles, createStyles, Grid, Typography } from '@material-ui/core';
import HeadingCaps from '@bit/twohats.common.components.heading-caps';

import { getIntermediateColor } from 'utilities';

type useStylesProps = {
  min: number;
  max: number;
  average: number;
  score: number;
};

const COLOR_MIN = '#9b2323';
const COLOR_AVG = '#ecda17';
const COLOR_MAX = '#2ccc7e';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      marginBottom: theme.spacing(5),
      cursor: 'default',
    },
    heading: { marginBottom: theme.spacing(3) },
    percentileLabel: { color: theme.palette.text.primary },

    bar: {
      backgroundColor:
        theme.palette.grey[theme.palette.type !== 'dark' ? 300 : 800],
      height: 10,
      borderRadius: 5,

      position: 'relative',
    },

    minToMean: {
      backgroundImage: 'linear-gradient(to right, #9b2323, #ecda17)',
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,

      position: 'absolute',
      top: 0,

      width: ({ average, min }: useStylesProps) =>
        `${Math.round((average - min) * 100)}%`,
      left: ({ min }: useStylesProps) => `${Math.round(min * 100)}%`,
    },
    meanToMax: {
      backgroundImage: 'linear-gradient(to right, #ecda17, #2ccc7e)',
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,

      position: 'absolute',
      top: 0,

      width: ({ max, average }: useStylesProps) =>
        `${Math.round((max - average) * 100)}%`,
      left: ({ average }: useStylesProps) => `${Math.round(average * 100)}%`,
    },

    meanLabel: {
      textTransform: 'none',
      position: 'absolute',
      top: -28,
      // Centre around the mean line
      transform: 'translateX(-50%)',
      left: ({ average }: useStylesProps) => `${Math.round(average * 100)}%`,
    },
    meanLine: {
      width: 1,
      height: 24,
      backgroundColor: theme.palette.text.secondary,

      position: 'absolute',
      top: -6,
      left: ({ average }: useStylesProps) => `${Math.round(average * 100)}%`,
    },

    score: {
      width: 28,
      height: 28,
      borderRadius: '50%',
      border: `4px solid ${
        theme.palette.grey[theme.palette.type !== 'dark' ? 300 : 800]
      }`,
      backgroundColor: ({ average, score, min, max }: useStylesProps) =>
        score === average
          ? COLOR_AVG
          : getIntermediateColor(
              score > average ? COLOR_AVG : COLOR_MIN,
              score > average ? COLOR_MAX : COLOR_AVG,
              Math.abs(score - (score > average ? average : min)) /
                (score > average ? max - average : average - min)
            ),

      position: 'absolute',
      top: -9,
      left: ({ score }: useStylesProps) => `${Math.round(score * 100)}%`,
      // Centre the circle
      transform: 'translateX(-50%)',
    },
  })
);

interface ICTPerformanceBarProps {
  result: {
    percentile_interview_level: number;
    confidence: string;
    attribute_name: string;
    min: number;
    max: number;
    average: number;
    percentile_interview_level_phrase: string;
    benchmark: number;
    comments: string;
    score: number;
    percentile_phrase?: string;
  };
}

const CTPerformanceBar: React.FunctionComponent<ICTPerformanceBarProps> = ({
  result,
}) => {
  const classes = useStyles({
    average: result.average,
    min: result.min,
    max: result.max,
    score: result.score,
  });

  return (
    <div className={classes.root}>
      <HeadingCaps className={classes.heading}>
        {result.attribute_name}:{' '}
        <span className={classes.percentileLabel}>
          {result.percentile_interview_level_phrase}
        </span>
      </HeadingCaps>

      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <div className={classes.bar}>
            <div className={clsx(classes.bar, classes.minToMean)} />
            <div className={clsx(classes.bar, classes.meanToMax)} />

            <Typography
              variant="overline"
              color="textSecondary"
              className={classes.meanLabel}
            >
              Average
            </Typography>
            <div className={classes.meanLine} />

            <div className={classes.score} />
          </div>
        </Grid>

        <Grid item>
          <Typography variant="overline" color="textSecondary">
            {Math.round(result.score * 100)}%
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default CTPerformanceBar;
