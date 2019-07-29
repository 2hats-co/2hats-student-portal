Smart component to get data for each part of assessment detail page.

Will display assessment doc data using `AssessmentHeader`, `AssessmentBriefing`,
`AssessmentSubmission`, `AssessmentQuestion`.

Will also show related courses, jobs, and assessments through
`AssessmentRelated`.

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
