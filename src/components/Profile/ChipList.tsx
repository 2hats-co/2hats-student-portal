import React from 'react';

import { makeStyles, createStyles } from '@material-ui/core';

import HeadingCaps from '@bit/twohats.common.components.heading-caps';
import SkillChip from '@bit/twohats.common.components.skill-chip';

import {
  DocWithId,
  AssessmentsDoc,
  UsersAssessmentsDoc,
  CoursesDoc,
  UsersCoursesDoc,
} from '@bit/twohats.common.db-types';

const useStyles = makeStyles(theme =>
  createStyles({
    list: {
      margin: 0,
      padding: 0,

      '& li': { listStyleType: 'none' },
    },
  })
);

interface IChipListProps {
  /** Title text shown above the chip list */
  title: string;
  /** A list of all the documents the user has completed/achieved */
  achieved: DocWithId<
    AssessmentsDoc | UsersAssessmentsDoc | CoursesDoc | UsersCoursesDoc
  >[];
  /** A list of all the documents (used to get count) */
  allDocs:
    | DocWithId<
        AssessmentsDoc | UsersAssessmentsDoc | CoursesDoc | UsersCoursesDoc
      >[]
    | null;
  /** A function to get the route of the clickable chip */
  routeFormatter: (id: string) => string;
}

/**
 * Displays a list of [`SkillChip`s](#skillchip), showing achieved chips
 * first and highlighting them
 */
const ChipList: React.FunctionComponent<IChipListProps> = ({
  title,
  achieved,
  allDocs,
  routeFormatter,
}) => {
  const classes = useStyles();

  const achievedIds = achieved.map(x => x.id);

  return (
    <div>
      <HeadingCaps color={achieved.length > 0 ? 'primary' : 'textSecondary'}>
        {title}: {achieved.length}
        {Array.isArray(allDocs) && ` / ${allDocs.length}`}
      </HeadingCaps>

      <ul className={classes.list}>
        {achieved.map(item => (
          <li key={item.id}>
            <SkillChip
              id={item.id}
              title={item.title}
              achieved
              clickable
              route={routeFormatter(item.id)}
            />
          </li>
        ))}
        {allDocs &&
          allDocs
            .filter(x => !achievedIds.includes(x.id))
            .map(item => (
              <li key={item.id}>
                <SkillChip
                  id={item.id}
                  title={item.title}
                  clickable
                  route={routeFormatter(item.id)}
                />
              </li>
            ))}
      </ul>
    </div>
  );
};

export default ChipList;
