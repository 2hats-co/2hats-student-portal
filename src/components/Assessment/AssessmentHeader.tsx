import * as React from 'react';

import { makeStyles, createStyles, Grid, Typography } from '@material-ui/core';

import CardImage from 'components/OneCardTwo/CardImage';
import CardIcon from 'components/OneCardTwo/CardIcon';
import StatusChip from 'components/OneCardTwo/StatusChip';
import HelpPopup from './HelpPopup';

import { generateAssessmentCard, getIndustry } from 'utilities/cards';
import {
  DocWithId,
  AssessmentsDoc,
  UsersAssessmentsDoc,
} from '@bit/twohats.common.db-types';

const useStyles = makeStyles(theme =>
  createStyles({
    coverImage: {
      borderRadius: theme.shape.borderRadius,
      overflow: 'hidden',
      marginBottom: theme.spacing(3),
    },

    section: { marginBottom: theme.spacing(3) },

    industryIcon: {
      margin: theme.spacing(-1.5),
      marginRight: theme.spacing(0),
      marginTop: theme.spacing(-1.75),
    },
  })
);

interface IAssessmentHeaderProps {
  assessmentData: DocWithId<AssessmentsDoc> | DocWithId<UsersAssessmentsDoc>;
}

/**
 * Pure display component to show assessment image, title,
 * industry, approx time, and status.
 */
const AssessmentHeader: React.FunctionComponent<IAssessmentHeaderProps> = ({
  assessmentData,
}) => {
  const classes = useStyles();
  const cardData = generateAssessmentCard(assessmentData);

  return (
    <>
      {assessmentData.image && (
        <CardImage
          className={classes.coverImage}
          src={assessmentData.image.url}
          industry={assessmentData.category}
        />
      )}

      <Typography variant="h5" component="h1">
        {assessmentData.title}
      </Typography>

      <Grid
        container
        alignItems="center"
        className={classes.section}
        component="section"
      >
        <CardIcon
          className={classes.industryIcon}
          industry={assessmentData.category}
          icon="industry"
        />
        <Typography variant="overline" color="textSecondary">
          {getIndustry(assessmentData.category)}
        </Typography>
      </Grid>

      <section className={classes.section}>
        <Grid container alignItems="center" spacing={3}>
          <Grid item xs={12} sm={8}>
            <Typography variant="h5">{assessmentData.duration}</Typography>

            <Grid container alignItems="center">
              <Typography variant="overline" color="textSecondary">
                Approx. time
              </Typography>
              <HelpPopup
                variant="besideOverline"
                message="This is only an approximation; you have unlimited time to complete this assessment."
              />
            </Grid>
          </Grid>
          {cardData.status && cardData.status.label && (
            <Grid item xs={12} sm={4}>
              <Typography variant="h5">
                <StatusChip {...cardData.status} />
              </Typography>

              <Typography
                variant="overline"
                color="textSecondary"
                component="div"
              >
                Status
              </Typography>
            </Grid>
          )}
        </Grid>
      </section>
    </>
  );
};

export default AssessmentHeader;
