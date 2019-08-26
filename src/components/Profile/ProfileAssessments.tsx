import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles, createStyles, LinearProgress } from '@material-ui/core';
import RightButtonLayout from './RightButtonLayout';
import TextWithGraphic from '@bit/twohats.common.components.text-with-graphic';

import LightbulbBrain from 'assets/images/graphics/LightbulbBrain.svg';

import * as ROUTES from 'constants/routes';
import { useUser } from 'contexts/UserContext';
import { COLLECTIONS } from '@bit/twohats.common.constants';
import useCollection from 'hooks/useCollection';
import { getDocsFromQuery } from 'utilities/firestore';

const useStyles = makeStyles(theme =>
  createStyles({
    root: { marginBottom: theme.spacing(1) },
  })
);

interface IProfileAssessmentsProps {}

const ProfileAssessments: React.FunctionComponent<
  IProfileAssessmentsProps
> = props => {
  const classes = useStyles();
  const { user } = useUser();

  const noSkills =
    !user.skills || !Array.isArray(user.skills) || user.skills.length === 0;

  const [skillsState] = useCollection(
    noSkills
      ? {}
      : {
          path: `${COLLECTIONS.users}/${user.id}/${COLLECTIONS.assessments}`,
          filters: [
            { field: 'submitted', operator: '==', value: true },
            { field: 'screened', operator: '==', value: true },
            { field: 'outcome', operator: '==', value: 'pass' },
          ],
        }
  );

  if (noSkills)
    return (
      <section className={classes.root}>
        <RightButtonLayout
          title={`My Skills ${
            Array.isArray(user.skills) && user.skills.length > 0
              ? `(${user.skills.length})`
              : ''
          }`}
          buttonLabel="Assessments"
          ButtonProps={{ component: Link, to: ROUTES.ASSESSMENTS }}
        />
        <TextWithGraphic
          graphic={LightbulbBrain}
          graphicWidth={100}
          message="Show off your super skills by completing assessments and shine like an enabled Apply button."
        />
      </section>
    );

  let contents = <LinearProgress />;

  return (
    <section className={classes.root}>
      <RightButtonLayout
        title={`My Skills ${
          Array.isArray(user.skills) && user.skills.length > 0
            ? `(${user.skills.length})`
            : ''
        }`}
        buttonLabel="Assessments"
        ButtonProps={{ component: Link, to: ROUTES.ASSESSMENTS }}
        description="Show off your super skills by completing assessments and shine like an enabled Apply button."
      />
      {contents}
    </section>
  );
};

export default ProfileAssessments;
