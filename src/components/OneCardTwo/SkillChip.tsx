import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { makeStyles, createStyles, Chip } from '@material-ui/core';

import { ASSESSMENT } from 'constants/routes';
import UserContext from 'contexts/UserContext';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      borderRadius: theme.shape.borderRadius,
      display: 'inline-flex',
      // 6px gap in between chips; need -3px margin around container
      margin: theme.spacing(0.375),

      cursor: 'inherit',

      ...theme.typography.body2,
    },
    label: {
      padding: theme.spacing(0, 1.5),
    },

    // default color is disabled
    outlined: {
      color: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
    },

    // used for skills the user has
    outlinedPrimary: {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
    },
  })
);

export interface SkillChipProps {
  /** Assessment/skill ID */
  id: string;
  /** Assessment/skill title to prevent querying for this information */
  title: string;
  /** If `true`, will use
   * [`Link`](https://reacttraining.com/react-router/web/api/Link) component
   * from React Router. */
  clickable: boolean;
}

/**
 * Displays a specific skill/assessment.
 *
 * **Strictly presentational:** If `clickable`, it will link to the
 * assessment detail page, which is responsible for redirecting to the user’s
 * latest submission for that assessment, if any.
 */
const SkillChip: React.FC<SkillChipProps> = ({ id, title, clickable }) => {
  const classes = useStyles();
  const { user } = useContext(UserContext);

  const achieved =
    user.skills && (user.skills.includes(title) || user.skills.includes(id));

  return (
    <Chip
      label={title}
      component={clickable ? Link : 'div'}
      clickable={clickable}
      to={`${ASSESSMENT}?id=${id}`}
      variant="outlined"
      size="small"
      classes={classes}
      color={achieved ? 'primary' : 'default'}
    />
  );
};

export default SkillChip;
