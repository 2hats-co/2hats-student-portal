Handles both [desktop navigation](#desktopnavigation) and
[mobile navigation](#mobilenavigation). Also has its own `ErrorBoundary` so nav
is visible even when wrapped components crash.

Mobile navigation is used on
[breakpoint `sm`](https://material-ui.com/customization/breakpoints/#breakpoints)
and down (< 960px).

### HOC -> Functional component

`Navigation` is now a standard functional component with hooks. This, along with
using the `render` prop in `<Route>` **prevents it from being remounted** every
time a new route is loaded.

### Removed `withAuthorisation`

`Navigation` is now primarily a display component that can also change routes
(using `Link` components). It does not ensure the user is authenticated.
Use [`ProtectedRoute`](#protectedroute) instead.

### Ensures `user !== null`

If `user` document has not been loaded in `UserContext`, will show
[`LoadingScreen`](#loadingscreen) until it does. No need to check if `user` doc
loaded in wrapped containers.

### Styling

On mount, sets background to white (`theme.palette.background.paper`).

If mobile, pushes FB Messenger bubble up using a CSS class in `index.html`.

### Animation

On `location.pathname` change, animates wrapped component by setting CSS classes
with `useLayoutEffect`. Also scrolls the new page to the top.
