Built with React 16.8, [Material-UI](https://material-ui.com) 4, and Firebase.

Documentation started with version 3.1 in June 2019.

## Changelog

### 3.1 – June 2019

- Overhauled base app infrastructure for routing; removed `withAuthentication`
  and `withAuthorisation` HOCs for hooks and composed components
  `<ProtectedRoute>` and `<Navigation>`.

  - Solved issue of **all** components re-mounting when the `UserContext`
    updates with a new version of the user document.

- Upgraded to Material-UI v4.

- Theme upgrades to latest Material Design guidelines.

- Switched to `clsx` from `classnames` for performance improvements. See
  https://github.com/lukeed/clsx/tree/af19571baaf00d73c8e7600cc0f0ede163b45bca/bench

- Added TypeScript support — old JS components still work; new ones should be
  written in TS

- Added support for twohats/common bit collection

### 3.0 – February 2019

Released during UNSW O Week 2019.

### 2.0 – September 2018

### 1.0 – Early 2018
