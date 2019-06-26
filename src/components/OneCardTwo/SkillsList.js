import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';

import SkillChip from './SkillChip';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
    height: ({ maxSkills }) => (maxSkills <= 1 ? 58 : 88),
    overflow: 'hidden',
  },

  header: {
    color: theme.palette.text.disabled,
  },

  skillsList: {
    margin: theme.spacing(-0.375),
    padding: 0,
    listStyleType: 'none',

    '& li': { display: 'inline-block' },
  },
}));

/**
 * Displays a list of [`SkillChip`s](#skillchip) with a header.
 *
 * Fixed height: 58 (1 row), 88 (2 rows)
 */
const SkillsList = ({ skills, skillsHeader, maxSkills }) => {
  const classes = useStyles({ maxSkills });

  if (skills.length === 0) return <div className={classes.root} />;

  return (
    <div className={classes.root}>
      <Typography variant="overline" className={classes.header}>
        Skills {skillsHeader}
      </Typography>

      <ul className={classes.skillsList}>
        {skills.map(x => (
          <li key={x.id}>
            <SkillChip {...x} clickable={false} />
          </li>
        ))}
      </ul>
    </div>
  );
};

SkillsList.propTypes = {
  /** Use an empty array [] to still show the correct spacing */
  skills: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ),
  /** String appended to [`SkillsList`](#skillslist) header */
  skillsHeader: PropTypes.node,
  /** Show single-height SkillsList with `maxSkills={1}` */
  maxSkills: PropTypes.number,
};

export default SkillsList;
