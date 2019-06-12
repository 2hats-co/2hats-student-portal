Handles speedy signups.

Displays a variant of `LogoInCard`.

### Routing

If `authUser` exists, the container will show the success view, which will have
a button to go to the Dashboard. So the user must logout before the form will
be shown again. See [`ProtectedRoute`](#protectedroute) for the reason why.

### Back-end calls

- CloudFunctions
- **`src/firebase`:** `auth.signInWithCustomToken`

### TODO

Convert to functional component with hooks.
