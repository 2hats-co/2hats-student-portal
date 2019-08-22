import React, { useContext } from 'react';

import { makeStyles, createStyles, Typography } from '@material-ui/core';

import { useUser } from 'contexts/UserContext';
import SkillChip from '@bit/twohats.common.components.skill-chip';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      marginTop: theme.spacing(2),
      height: ({ maxSkills }: any) => (maxSkills <= 1 ? 58 : 88),
      overflow: 'hidden',
    },

    header: {
      color: theme.palette.text.disabled,
    },

    skillsList: {
      margin: theme.spacing(-0.375),
      marginTop: 0,
      padding: 0,
      listStyleType: 'none',

      '& li': { display: 'inline-block' },
    },
  })
);

export type SkillsProp = {
  id: string;
  title: string;
};
export interface SkillsListProps {
  /** Use an empty array [] to still show the correct spacing */
  skills: SkillsProp[];
  /** String appended to [`SkillsList`](#skillslist) header */
  skillsHeader: React.ReactNode;
  /** Show single-height SkillsList with `maxSkills={1}` */
  maxSkills?: number;
}

/**
 * Displays a list of [`SkillChip`s](#skillchip) with a header.
 *
 * Fixed height: 58 (1 row), 88 (2 rows)
 */
const SkillsList: React.FC<SkillsListProps> = ({
  skills,
  skillsHeader,
  maxSkills,
}) => {
  const classes = useStyles({ maxSkills });
  const { user } = useUser();

  if (skills.length === 0) return <div className={classes.root} />;

  return (
    <div className={classes.root}>
      <Typography variant="overline" className={classes.header}>
        Skills {skillsHeader}
      </Typography>

      <ul className={classes.skillsList}>
        {skills.map(x => (
          <li key={x.id}>
            <SkillChip {...x} clickable={false} user={user} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillsList;
