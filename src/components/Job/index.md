Smart component to get data for each part of job detail page. Will display job
doc data using all other components in the folder.

### Stages

Jobs have four different stages:

1. **Default/initial — user has not applied** — `/job/:id`

   - Show Apply button if user can apply. If not, show message
   - Show skills required
   - Show job description
   - Show related assessments + similar jobs

2. **User is currently applying** - `/job/:id/apply`

   - Show application form

3. **User has applied** - `/job/:id`

   - Shows user delight screen
   - Shows collapsed job description
   - Show related assessments + similar jobs
