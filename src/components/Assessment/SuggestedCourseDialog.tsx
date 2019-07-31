import React from 'react';

import { makeStyles, createStyles, Grid, Button } from '@material-ui/core';

import DialogPrompt from '@bit/twohats.common.components.dialog-prompt';
import TextWithGraphic from '@bit/twohats.common.components.text-with-graphic';
import SuggestedCourseGraphic from 'assets/images/graphics/SuggestedCourse.svg';
import GoIcon from '@bit/twohats.common.icons.go';

import { DocWithId, CoursesDoc } from '@bit/twohats.common.db-types';
import { COURSE_REDIRECT } from 'constants/routes';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      padding: theme.spacing(3, 5, 5),
      maxWidth: 600,
      [theme.breakpoints.down('xs')]: { padding: theme.spacing(2, 3, 3) },
    },

    dialogPaper: {
      [theme.breakpoints.up('sm')]: {
        width: '100%',
        maxWidth: 800,
        alignItems: 'center',
      },
    },

    graphic: { margin: theme.spacing(3, 0) },

    buttons: { marginTop: theme.spacing(2) },
  })
);

interface ISuggestedCourseDialogProps {
  /** The related course to link to */
  relatedCourse: DocWithId<CoursesDoc>;
}

/**
 * Suggests a course when the user attempts to leave or change route.
 *
 * ## Important
 *
 * This component will always do this behaviour. Make sure you
 * **conditionally render** this component. This is done to reduce the amount
 * of elements that are rendered in the DOM.
 */
const SuggestedCourseDialog: React.FunctionComponent<
  ISuggestedCourseDialogProps
> = ({ relatedCourse }) => {
  const classes = useStyles();

  return (
    <DialogPrompt classes={{ dialogPaper: classes.dialogPaper }}>
      {dialogCustomProps => (
        <div className={classes.root}>
          <TextWithGraphic
            header="Feeling stuck with an assessment? Here’s a helping hand!"
            message="Get help from bite-sized courses designed to give you the guidance and support to complete this assessment."
            graphic={SuggestedCourseGraphic}
            graphicWidth={111}
            graphicHeight={137}
            classes={{ graphic: classes.graphic }}
          />

          <Grid
            container
            spacing={1}
            className={classes.buttons}
            direction="row-reverse"
          >
            <Grid item xs={12} sm={6}>
              <Button
                color="primary"
                size="large"
                fullWidth
                variant="contained"
                onClick={() => {
                  if (dialogCustomProps.redirect)
                    dialogCustomProps.redirect(
                      `${COURSE_REDIRECT}/?id=${relatedCourse.id}`
                    );
                }}
              >
                Go to Course
                <GoIcon />
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                color="primary"
                size="large"
                fullWidth
                variant="outlined"
                onClick={dialogCustomProps.resume}
              >
                I’ll Check Later
              </Button>
            </Grid>
          </Grid>
        </div>
      )}
    </DialogPrompt>
  );
};

export default SuggestedCourseDialog;
