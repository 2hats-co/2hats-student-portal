import React from 'react';
import ReactApexChart from 'react-apexcharts';

import {
  makeStyles,
  createStyles,
  useTheme,
  useMediaQuery,
  Typography,
} from '@material-ui/core';
import HeadingCaps from '@bit/twohats.common.components.heading-caps';
import CTPerformanceBar from './CTPerformanceBar';
import CTPoweredBy from './CTPoweredBy';

import { useUser } from 'contexts/UserContext';

const useStyles = makeStyles(theme =>
  createStyles({
    section: {
      'section&&': { marginBottom: theme.spacing(2) },
    },

    chartWrapper: {
      'section&&': { marginBottom: '0' },
      '& .apexcharts-canvas': { background: 'transparent' },
    },
  })
);

interface ICTResultProps {
  resultData: {
    timestamp: string;
    candidate_info: {
      current_company?: string | null;
      family_name: string;
      email: string;
      current_job_title?: string | null;
      given_name: string;
    };
    result: {
      topic: string;
      text: string;
    }[];
    analytics: {
      key_performance_score: {
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
      }[];
      personality: {
        important_values: {
          category: string;
          trait_id: string;
          name: string;
          percentile: number;
          raw_score: number;
          significant: boolean;
        }[];
        big_five_normalised: {
          [attribute: string]: { percentile: number };
        };
        important_needs: {
          category: string;
          trait_id: string;
          name: string;
          percentile: number;
          raw_score: number;
          significant: boolean;
        }[];
      };
    };
    shareWithEmployers?: boolean;
  };
}

const CTResult: React.FunctionComponent<ICTResultProps> = ({ resultData }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('xs'));

  const { user } = useUser();

  return (
    <>
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

      <CTPoweredBy />
    </>
  );
};

export default CTResult;
