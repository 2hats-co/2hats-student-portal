HOC: wraps component with a standard left navigation bar.

REMOVED: Uses `withAuthorisation` HOC to ensure authentication.
If not, redirects user to sign in, adding a deep link to the current route as a
URL parameter.

Also has its own `ErrorBoundary` so nav is visible even when wrapped components
crash.

### Back-end calls

- **`src/firebase/index.js`:** `auth`

### TODO

Convert to functional component with hooks.  
Need to modify `App.js`. See Business Portal code.
