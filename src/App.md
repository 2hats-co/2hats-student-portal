Handles routing and provides contexts.

### Context: `UserContext`

Has two properties, `authUser` and `user`:

#### `authUser`

Stores whether a user is signed in or not. Can be one of three values:

- `undefined`: Firebase auth hasn’t loaded yet. Show loading state.
- `null`: No user is signed in.
- [`User`](https://firebase.google.com/docs/reference/js/firebase.User.html):
  Current user info from `auth.onAuthStateChanged`

#### `user`

A snapshot of the user’s document from the `user` collection. It is attached via
listener, so updates when user doc changes.

**This will cause all components to re-render.** The remount issue has been
fixed by using `<Route>`’s `render` prop instead of `component`, which created a
new clone of the element passed every single time.

If `null`, then no user is signed in or document hasn’t finished loading yet.

**Do not use this to check if there is a user signed in; use `authUser`.**

### Context: `HistoryContext`

Stores a recreation of the history stack when `history.listen` is called. See
[`HistoryProvider`](#historycontext) for more details.

### Routing

Routing is handled by `react-router-dom`. Routes that require user
authentication are protected with [`ProtectedRoute`](#protectedroute), which is
a drop-in replacement for `<Route>`.

`<Route>` and `<ProtectedRoute>` pass down `match`, `history`, and `location` as
props to its rendered components.

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
| `ONBOARDING`      | [OnboardingContainer](#onboardingcontainer)         | [x]       |
| `/`               | [Landing](#landing)                                 |           |
| anything else     | [FourOhFour](#fourohfour)                           |           |

### `ThemeProvider`

Takes MUI theme generated from `src/Theme.js`

### Component responsibilities

`App` will state whether a route is public or a
[`ProtectedRoute`](#protectedroute). It will also state if a route has
[`Navigation`](#section-navigation).

[`Navigation`](#section-navigation) is responsible for showing the links to
different routes and showing the currently active route. It will also do page
transitions.

Each individual container is responsible for setting the tab title with
`document.title`.
