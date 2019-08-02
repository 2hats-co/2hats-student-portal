Smart component to get data for each part of assessment detail page.

Will display assessment doc data using `AssessmentHeader`, `AssessmentBriefing`,
`AssessmentSubmission`, `AssessmentQuestion`.

Will also show related courses, jobs, and assessments through
`AssessmentRelated`.

### Assessments related to job

If the user visited this page from a job page, it will show a progress bar with
all the other skills the user needs to complete to apply for the job. This is
stored in the location state (React Router). It must have `previousRoute`,
`skillsRequired`, `title`, and `companyName`.

This is displayed by the [`JobProgress`](#jobprogress) component.

### Stages

Assessments has four different stages:

1. **Default/initial** — user hasn’t made a submission

   - Shows expanded briefing
   - Shows instructions preview only

2. **Submission start** - user hasn’t submitted yet

   - `submitted == false`
   - Shows expanded briefing
   - Shows user submission UI (questions, submit button, etc.)

3. **Submission completed** - user hasn’t been feedbacked yet

   - `submitted == true`
   - `screened == false`
   - Shows user delight screen
   - Shows collapsed briefing, submission UI
   - Hides related course

4. **Submission feedbacked**

   - `submitted == true`
   - `screened == true`
   - Shows collapsed briefing, submission UI
   - Hides related course **if pass**
