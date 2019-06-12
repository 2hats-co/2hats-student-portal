Handles routing and provides contexts.

### Routes

| Route             | Container                                           |
| ----------------- | --------------------------------------------------- |
| `SIGN_UP`         | [AuthenticationContainer](#authenticationcontainer) |
| `LOG_OUT`         | [AuthenticationContainer](#authenticationcontainer) |
| `SIGN_IN`         | [AuthenticationContainer](#authenticationcontainer) |
| `NO_PASSWORD`     | [AuthenticationContainer](#authenticationcontainer) |
| `CREATE_PASSWORD` | [AuthenticationContainer](#authenticationcontainer) |
| `RESET_PASSWORD`  | [AuthenticationContainer](#authenticationcontainer) |
| `VALIDATE_EMAIL`  | [AuthenticationContainer](#authenticationcontainer) |
| `SPEEDY_SIGN_UP`  | [SpeedySignupContainer](#speedysignupcontainer)     |
| `SMART_LINK`      | [SmartLinkContainer](#smartlinkcontainer)           |
| `DASHBOARD`       | [DashboardContainer](#dashboardcontainer)           |
| `PROFILE`         | [ProfileContainer](#profilecontainer)               |
| `JOBS`            | [JobsContainer](#jobscontainer)                     |
| `JOB`             | [DetailedViewContainer](#detailedviewcontainer)     |
| `ASSESSMENTS`     | [AssessmentsContainer](#assessmentscontainer)       |
| `ASSESSMENT`      | [DetailedViewContainer](#detailedviewcontainer)     |
| `COURSES`         | [CoursesContainer](#coursescontainer)               |
| `COURSE_REDIRECT` | [CourseRedirectContainer](#courseredirectcontainer) |
| `SCHEDULER`       | [SchedulerContainer](#schedulercontainer)           |
| `/`               | [Landing](#landing)                                 |
| `/linkedin`       | `LinkedInPopUp` 3rd-party component (DEPRECATED)    |

### `UserContext`

Default: `{ user: user, setUser: user => setUser(user) }` from

```
const [user, setUser] = useState(null);
```

### `MuiThemeProvider`

Takes theme from `src/Theme.js`

### Deprecated

LinkedIn sign in with `LinkedInPopUp` from the `/linkedin` route

### TODO

Remove `withAuthentication` HOC – see new Business Portal auth code
