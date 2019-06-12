Handles routing and provides contexts.

### Routes

| Route             | Container                                           | Protected |
| ----------------- | --------------------------------------------------- | --------- |
| `SIGN_UP`         | [AuthenticationContainer](#authenticationcontainer) |           |
| `LOG_OUT`         | [AuthenticationContainer](#authenticationcontainer) |           |
| `SIGN_IN`         | [AuthenticationContainer](#authenticationcontainer) |           |
| `NO_PASSWORD`     | [AuthenticationContainer](#authenticationcontainer) | [x]       |
| `CREATE_PASSWORD` | [AuthenticationContainer](#authenticationcontainer) | [x]       |
| `RESET_PASSWORD`  | [AuthenticationContainer](#authenticationcontainer) | [x]       |
| `VALIDATE_EMAIL`  | [AuthenticationContainer](#authenticationcontainer) |           |
| `SPEEDY_SIGN_UP`  | [SpeedySignupContainer](#speedysignupcontainer)     |           |
| `SMART_LINK`      | [SmartLinkContainer](#smartlinkcontainer)           |           |
| `DASHBOARD`       | [DashboardContainer](#dashboardcontainer)           | [x]       |
| `PROFILE`         | [ProfileContainer](#profilecontainer)               | [x]       |
| `JOBS`            | [JobsContainer](#jobscontainer)                     | [x]       |
| `JOB`             | [DetailedViewContainer](#detailedviewcontainer)     | [x]       |
| `ASSESSMENTS`     | [AssessmentsContainer](#assessmentscontainer)       | [x]       |
| `ASSESSMENT`      | [DetailedViewContainer](#detailedviewcontainer)     | [x]       |
| `COURSES`         | [CoursesContainer](#coursescontainer)               | [x]       |
| `COURSE_REDIRECT` | [CourseRedirectContainer](#courseredirectcontainer) | [x]       |
| `SCHEDULER`       | [SchedulerContainer](#schedulercontainer)           | [x]       |
| `/`               | [Landing](#landing)                                 |           |

### `UserContext`

Has two properties: `authUser` and `user`.

#### `authUser`

Stores whether a user is signed in or not. Can be one of three values:

- `undefined`: Firebase auth hasn’t loaded yet. Show loading state.
- `null`: No user is signed in.
- [`User`](https://firebase.google.com/docs/reference/js/firebase.User.html): Current user info from `auth.onAuthStateChanged`

#### `user`

A snapshot of the user’s document from the `user` collection. It is attached via listener, so updates when user doc changes. **This will cause all components to be remounted.**

If `null`, then no user is signed in or document hasn’t finished loading yet.

**Do not use this to check if there is a user signed in; use `authUser`.**

### Routing

Routing is handled by `react-router-dom`. Routes that require user
authentication are protected with [`ProtectedRoute`](#protectedroute).

### `ThemeProvider`

Takes theme from `src/Theme.js`
