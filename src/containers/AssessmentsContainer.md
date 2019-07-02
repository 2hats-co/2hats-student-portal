Displays multiple `CardGrid`s if on the root route `/assessments`. If on a
specific sub-route, e.g. `/assessments/ongoing`, shows only that specific
`CardGrid`, but with all cards displaying (not just one or two rows).

### Ongoing Assessments: `/assessments/ongoing`

Prioritises assessments with unviewed feedback, then all others.

Hidden if empty.

### All Assessments: `/assessments/all`

Prioritises assessments by industry.

### Completed Assessments: `/assessments/completed`

Shows all the user’s completed and feedbacked assessments. May show a duplicate
in Ongoing Assessments if user has not viewed that feedback yet.

Shows an empty state prompting the user to start new assessments.
