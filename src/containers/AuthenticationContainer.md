Handles authentication with many different views listed in `src/constants/views`.

### Routing

If `authUser` exists and the app is currently in the sign in or sign up route
**only**, the container will redirect to the dashboard or the route in the URL
parameter. See [`ProtectedRoute`](#protectedroute) for the reason why.

### Back-end calls

- CloudFunctions
- `src/utilities/Authentication/warmUp.js`
- `src/utilities/Authentication/authWithPassword.js`
- `src/firebase/index.js`

### TODO

Convert to functional component with hooks.
Document props with propTypes.
