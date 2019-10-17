import React from 'react';
import ReactApexChart from 'react-apexcharts';
import moment from 'moment';

import {
  makeStyles,
  createStyles,
  useTheme,
  useMediaQuery,
  Typography,
  Grid,
  Button,
  FormControlLabel,
  Switch,
} from '@material-ui/core';
import { lighten, fade } from '@material-ui/core/styles';
import ExternalIcon from '@material-ui/icons/OpenInNew';

import HeadingCaps from '@bit/twohats.common.components.heading-caps';
import CTPerformanceBar from './CTPerformanceBar';
import CTPoweredBy from './CTPoweredBy';

import { useUser } from 'contexts/UserContext';

import { CURIOUS_PURPLE, externalLinkProps } from 'constants/curiousThing';
import { updateCuriousThingSharing } from 'utilities/curiousThing';
import { CuriousThingResultData } from '@bit/twohats.common.constants';
import { MOMENT_FORMATS } from '@bit/twohats.common.constants';

const useStyles = makeStyles(theme =>
  createStyles({
    section: {
      'section&&': { marginBottom: theme.spacing(2) },
    },

    switchLabel: {
      justifyContent: 'space-between',
      marginLeft: theme.spacing(-1),
      marginBottom: theme.spacing(3),
      display: 'flex',
    },

    chartWrapper: {
      'section&&': { marginBottom: '0' },
      '& .apexcharts-canvas': { background: 'transparent' },
    },

    button: {
      color:
        theme.palette.type === 'dark'
          ? lighten(CURIOUS_PURPLE, 0.5)
          : CURIOUS_PURPLE,

      '&:hover': {
        backgroundColor: fade(
          theme.palette.type === 'dark'
            ? lighten(CURIOUS_PURPLE, 0.5)
            : CURIOUS_PURPLE,
          theme.palette.action.hoverOpacity
        ),
      },
    },
  })
);

interface ICTResultProps {
  /** Whether or not this is a sample result to hide the Switch */
  sample?: boolean;
  resultData: CuriousThingResultData & {
    shareWithEmployers?: boolean;
  };
}

/**
 * Displays:
 * - a subset of the interview result
 *
 * If not `sample`, also displays:
 * - Timestamp
 * - Share With Employers setting
 * - View Full Report and Try Again buttons
 */
const CTResult: React.FunctionComponent<ICTResultProps> = ({
  sample = false,
  resultData,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('xs'));

  const { user, UID } = useUser();

  return (
    <>
      {!sample && (
        <>
          <section className={classes.section}>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              These are your results from your Curious Thing interview{' '}
              <abbr
                title={moment(resultData.timestamp.toDate()).format(
                  MOMENT_FORMATS.dateTime
                )}
              >
                {moment(resultData.timestamp.toDate()).fromNow()}
              </abbr>
              .
            </Typography>

            <Typography variant="body2" color="textSecondary">
              You may choose to not share it with potential employers below.
            </Typography>
          </section>

          <FormControlLabel
            control={
              <Switch
                color="primary"
                defaultChecked={resultData.shareWithEmployers}
                onChange={updateCuriousThingSharing(UID, resultData)}
              />
            }
            label={
              <Typography variant="overline">Share With Employers</Typography>
            }
            labelPlacement="start"
            className={classes.switchLabel}
          />
        </>
      )}

      <section className={classes.section}>
        {resultData.analytics.key_performance_score.map(x => (
          <CTPerformanceBar key={x.attribute_name} result={x} />
        ))}
      </section>

      <section className={classes.chartWrapper}>
        <ReactApexChart
          options={{
            labels: Object.keys(
              resultData.analytics.personality.big_five_normalised
            ).sort(),
            markers: { size: 5 },
            yaxis: {
              tickAmount: 2,
              min: 0,
              max: 100,
              labels: {
                style: { color: theme.palette.text.secondary },
              },
            },
            chart: {
              fontFamily: 'inherit',
              toolbar: { show: false },
            },
            dataLabels: {
              style: {
                fontSize: isXs ? '0.75rem' : '0.875rem',
                colors: [theme.palette.text.primary],
              },
            },
            theme: {
              mode: theme.palette.type,
              palette: 'palette2',
            },
            plotOptions: {
              radar: {
                size: isXs ? 80 : 120,
                polygons: {
                  strokeColors: theme.palette.divider,
                  connectorColors: theme.palette.divider,
                  fill: { colors: ['transparent'] },
                },
              },
            },
            tooltip: {
              style: {
                fontSize: '0.875rem',
              },
            },
          }}
          height={isXs ? '220' : '300'}
          series={[
            {
              name: 'Score',
              data: Object.keys(
                resultData.analytics.personality.big_five_normalised
              )
                .sort()
                .map(
                  key =>
                    resultData.analytics.personality.big_five_normalised[key]
                      .percentile * 100
                ),
            },
          ]}
          type="radar"
        />
      </section>

      <section className={classes.section}>
        <HeadingCaps component="h3">Needs</HeadingCaps>
        <Typography variant="body2" color="textSecondary">
          {resultData.analytics.personality.important_needs
            .map(x => x.name)
            .join(', ')}
        </Typography>
      </section>

      <section className={classes.section}>
        <HeadingCaps component="h3">Values</HeadingCaps>
        <Typography variant="body2" color="textSecondary">
          {resultData.analytics.personality.important_values
            .map(x => x.name)
            .join(', ')}
        </Typography>
      </section>

      <section className={classes.section}>
        <HeadingCaps component="h3">Personality</HeadingCaps>
        <Typography variant="body2" color="textSecondary">
          {resultData.result
            .filter(x => x.topic === 'personality_analysis')[0]
            .text.replace(/{{firstName}}/g, user.firstName)}
        </Typography>
      </section>

      <section className={classes.section}>
        <HeadingCaps component="h3">Career Suggestion</HeadingCaps>
        <Typography variant="body2" color="textSecondary">
          {resultData.result
            .filter(x => x.topic === 'career_suggestion')[0]
            .text.replace(/{{firstName}}/g, user.firstName)}
        </Typography>
      </section>

      {!sample && (
        <Grid
          container
          justify="center"
          spacing={3}
          component="section"
          className={classes.section}
        >
          <Grid item>
            <Button
              {...externalLinkProps}
              href={resultData.reportUrl}
              className={classes.button}
              endIcon={<ExternalIcon />}
            >
              View Full Report
            </Button>
          </Grid>

          <Grid item>
            <Button
              {...externalLinkProps}
              className={classes.button}
              endIcon={<ExternalIcon />}
            >
              Try Again
            </Button>
          </Grid>
        </Grid>
      )}

      <CTPoweredBy />
    </>
  );
};

export default CTResult;
